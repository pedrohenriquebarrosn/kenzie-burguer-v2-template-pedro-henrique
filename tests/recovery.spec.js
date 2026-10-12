import { test, expect } from '@playwright/test';

test('visitor uses fictitious catalog, search and cart in local demo', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Acessar demonstração' }).click();
  await expect(page.getByText(/Loja demonstrativa/)).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Burger Clássico (demo)' })).toBeVisible();

  await page.getByRole('searchbox', { name: 'Pesquisar produtos' }).fill('Batata');
  await expect(page.getByRole('heading', { name: 'Batata Frita (demo)' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Burger Clássico (demo)' })).toHaveCount(0);
  await page.getByRole('searchbox', { name: 'Pesquisar produtos' }).fill('');

  await page.getByRole('button', { name: 'Adicionar' }).first().click();
  await page.getByRole('button', { name: 'Abrir carrinho' }).click();
  await expect(page.getByRole('heading', { name: 'Carrinho de compras' })).toBeVisible();
  await expect(page.locator('.total')).toContainText('22,90');
  await page.screenshot({ path: 'test-results/kenzieburguer-demo.png', fullPage: true });
  await page.getByRole('button', { name: 'Remover todos' }).click();
  await expect(page.getByRole('heading', { name: 'Sua sacola está vazia' })).toBeVisible();

  await page.getByRole('button', { name: 'Fechar' }).click();
  await page.getByRole('button', { name: 'Sair' }).click();
  await expect(page.getByRole('button', { name: 'Acessar demonstração' })).toBeVisible();
});

test('visitor can open store demonstration on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Acessar demonstração' }).click();
  await expect(page.getByText(/Loja demonstrativa/)).toBeVisible();
});
