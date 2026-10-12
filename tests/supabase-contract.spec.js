import { test, expect } from '@playwright/test';

// Uses HTTP contract mocks so the full form -> Auth -> PostgREST -> cart path
// can run in CI without creating real accounts or consuming Supabase email quota.
const headers={'access-control-allow-origin':'*','content-type':'application/json'};
const user={id:'a23ccfb1-e61b-4c83-86e2-d81f5182cd77',email:'burger@example.invalid',
  user_metadata:{name:'Teste de Compras'}};
const products=[
  {id:1,name:'Burger Clássico',category:'Sanduíches',price:22.90,img:'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg"/>'},
  {id:2,name:'Batata Frita',category:'Acompanhamentos',price:13.90,img:'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg"/>'}
];
test('authenticated customer loads live API catalog, persists cart, removes and logs out',async({page})=>{
  const cart=new Set();
  let authRequests=0;
  await page.route(/\/auth\/v1\/token\?grant_type=password$/,route=>{
    authRequests++;
    return route.fulfill({status:200,headers,body:JSON.stringify({user,access_token:'mock-access-token',refresh_token:'mock-refresh-token'})});
  });
  await page.route(/\/auth\/v1\/user$/,route=>route.fulfill({status:200,headers,body:JSON.stringify(user)}));
  await page.route(/\/auth\/v1\/logout$/,route=>route.fulfill({status:204,headers,body:''}));
  await page.route(/\/rest\/v1\/kenzieburguer_products.*/,route=>route.fulfill({
    status:200,headers,body:JSON.stringify(products)
  }));
  await page.route(/\/rest\/v1\/kenzieburguer_cart_items.*/,route=>{
    const req=route.request(),method=req.method(),url=new URL(req.url());
    if(method==='POST'){
      for(const item of req.postDataJSON()) cart.add(item.product_id);
      return route.fulfill({status:201,headers,body:JSON.stringify([...cart].map(product_id=>({product_id})))});
    }
    if(method==='DELETE'){
      const id=url.searchParams.get('product_id');
      if(id) cart.delete(Number(id.replace('eq.','')));
      else cart.clear();
      return route.fulfill({status:200,headers,body:'[]'});
    }
    return route.fulfill({status:200,headers,body:JSON.stringify([...cart].map(product_id=>({product_id})))});
  });
  await page.goto('/');
  await page.getByLabel('Seu e-mail').fill('burger@example.invalid');
  await page.getByLabel('Sua senha').fill('VeryStrong#123');
  await page.getByRole('button',{name:'Entrar'}).click();
  await expect(page).toHaveURL(/\/shop$/);
  await expect(page.getByRole('heading',{name:'Burger Clássico'})).toBeVisible();
  await page.getByRole('button',{name:'Adicionar'}).first().click();
  await page.getByRole('button',{name:'Abrir carrinho'}).click();
  await expect(page.locator('.total')).toContainText('22,90');
  await page.reload();
  await page.getByRole('button',{name:'Abrir carrinho'}).click();
  await expect(page.locator('.total')).toContainText('22,90');
  expect(cart.has(1)).toBe(true);
  await page.getByRole('button',{name:'Remover todos'}).click();
  await expect(page.getByRole('heading',{name:'Sua sacola está vazia'})).toBeVisible();
  expect(cart.size).toBe(0);
  expect(authRequests).toBe(1);
  await page.getByRole('button',{name:'Fechar'}).click();
  await page.getByRole('button',{name:'Sair'}).click();
  await expect(page).toHaveURL(/\/$/);
});

test('registration does not claim success when Supabase refuses unapproved email',async({page})=>{
  await page.route(/\/auth\/v1\/signup$/,route=>route.fulfill({
    status:422,headers,body:JSON.stringify({msg:'Email address not authorized'})
  }));
  await page.goto('/register');
  await page.getByLabel('Nome').fill('Pessoa de Teste');
  await page.getByLabel('Email').fill('unapproved@example.invalid');
  await page.getByLabel('Senha').fill('Valid#123Ab');
  await page.getByRole('button',{name:'Cadastrar'}).click();
  await expect(page.getByText('Email address not authorized')).toBeVisible();
  await expect(page).toHaveURL(/\/register$/);
});
