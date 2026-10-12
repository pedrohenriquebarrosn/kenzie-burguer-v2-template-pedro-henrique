import { test, expect } from '@playwright/test';

// Confirmation flow is mocked at HTTP boundary. External SMTP remains pending.
test('Burguer handles confirmation redirect and restores protected store session',async({page})=>{
  const headers={'access-control-allow-origin':'*','content-type':'application/json'};
  await page.route(/\/auth\/v1\/user$/,route=>route.fulfill({
    status:200,headers,body:JSON.stringify({id:'ed014131-0104-471c-a79a-ec645335970d',email:'confirmed@example.invalid',user_metadata:{name:'Confirmado'}})
  }));
  await page.route(/\/rest\/v1\/kenzieburguer_products.*/,route=>route.fulfill({status:200,headers,body:'[]'}));
  await page.route(/\/rest\/v1\/kenzieburguer_cart_items.*/,route=>route.fulfill({status:200,headers,body:'[]'}));
  await page.goto('/#access_token=contract-access&refresh_token=contract-refresh&type=signup&token_type=bearer');
  await expect(page).toHaveURL(/\/shop$/);
  await expect(page.getByText(/Projeto educacional: catálogo/)).toBeVisible();
  const stored=await page.evaluate(()=>JSON.parse(localStorage.getItem('kenzie_burger_auth_v1')||'null'));
  expect(stored?.access_token).toBe('contract-access');
  expect(new URL(page.url()).hash).toBe('');
});
