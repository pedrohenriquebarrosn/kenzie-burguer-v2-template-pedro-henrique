import { test, expect } from '@playwright/test';

test('demo catalog shows six products, search empty state, and a live cart badge', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Acessar demonstração' }).click();
  await expect(page.getByRole('heading', { name: 'Escolha seus favoritos' })).toBeVisible();
  await expect(page.getByText(/Loja demonstrativa/)).toBeVisible();
  await expect(page.getByText(/produtos no catálogo/)).toBeVisible();

  const search = page.getByRole('searchbox', { name: 'Pesquisar produtos' });
  const submitSearch = page.getByRole('button', { name: 'Pesquisar', exact: true });
  await search.fill('s');
  // Typing alone does not change the catalog.
  await expect(page.getByRole('heading', { name: 'Nuggets (demo)' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Adicionar' })).toHaveCount(6);
  await submitSearch.click();
  await expect(page.getByRole('heading', { name: 'Suco (demo)' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Nuggets (demo)' })).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Adicionar' })).toHaveCount(1);

  await search.fill('dupl');
  // The previous committed filter remains until a new click or Enter.
  await expect(page.getByRole('heading', { name: 'Suco (demo)' })).toBeVisible();
  await search.press('Enter');
  await expect(page.getByRole('heading', { name: 'Burger Duplo (demo)' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Burger Clássico (demo)' })).toHaveCount(0);

  await search.fill('');
  await expect(page.getByRole('heading', { name: 'Burger Clássico (demo)' })).toHaveCount(0);
  await submitSearch.click();
  await expect(page.getByRole('button', { name: 'Adicionar' })).toHaveCount(6);

  const coverImage = page.getByRole('img', { name: 'Burger Clássico (demo)' }).first();
  await expect(coverImage).toHaveAttribute('src', /images\.unsplash\.com\/photo-/);

  await search.fill('zzzz-sem-resultado');
  await expect(page.getByRole('button', { name: 'Adicionar' })).toHaveCount(6);
  await submitSearch.click();
  await expect(page.getByRole('heading', { name: 'Nenhum produto encontrado' })).toBeVisible();
  await search.fill('');
  await submitSearch.click();

  const addFirst = page.getByRole('button', { name: 'Adicionar' }).first();
  await addFirst.click();
  await addFirst.click();
  await addFirst.click();
  await expect(page.locator('.cartCount')).toHaveText('3');
  await expect(page.locator('.Toastify__toast').filter({ hasText: /Burger Clássico/ })).toHaveCount(1);
  await page.locator('.Toastify__toast').first().hover();
  await expect(page.locator('.Toastify__toast').filter({ hasText: /Burger Clássico/ })).toHaveCount(0, { timeout: 5500 });
  await page.getByRole('button', { name: 'Abrir carrinho' }).click();
  await expect(page.getByRole('heading', { name: 'Carrinho de compras' })).toBeVisible();
  await expect(page.getByText('R$ 22,90 / unidade')).toBeVisible();
  await expect(page.getByText('R$ 68,70')).toHaveCount(2); // product subtotal + overall total
  await page.getByRole('button', { name: /Diminuir quantidade de Burger Clássico/ }).click();
  await expect(page.locator('.cartCount')).toHaveText('2');
  await expect(page.getByText('R$ 45,80')).toHaveCount(2);
  await page.getByRole('button', { name: /Aumentar quantidade de Burger Clássico/ }).click();
  await expect(page.locator('.cartCount')).toHaveText('3');
  await page.getByRole('button', { name: 'Remover todos' }).click();
  await expect(page.locator('.cartCount')).toHaveCount(0);
  await expect(page.getByText('O item já está no carrinho!')).toHaveCount(0);
  await page.getByRole('button', { name: 'Fechar' }).click();

  await page.screenshot({ path: 'test-results/burger-polish-desktop.png', fullPage: true });
});

test('demo mobile catalog fits viewport and search remains available', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Acessar demonstração' }).click();
  await expect(page.getByRole('searchbox', { name: 'Pesquisar produtos' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Escolha seus favoritos' })).toBeVisible();
  await expect.poll(async () => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.screenshot({ path: 'test-results/burger-polish-mobile.png', fullPage: true });
});


test('cart feedback leaves desktop cart control available immediately', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Acessar demonstração' }).click();
  await page.getByRole('button', { name: 'Adicionar' }).first().click();
  await expect(page.locator('.Toastify__toast-container')).toHaveClass(/Toastify__toast-container--bottom-left/);
  await page.getByRole('button', { name: 'Abrir carrinho' }).click({ timeout: 3500 });
  await expect(page.getByRole('heading', { name: 'Carrinho de compras' })).toBeVisible();
});
