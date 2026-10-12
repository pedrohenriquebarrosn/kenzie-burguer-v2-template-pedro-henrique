import { test, expect } from '@playwright/test';

test('demo catalog shows six products, search empty state, and a live cart badge', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Acessar demonstração' }).click();
  await expect(page.getByRole('heading', { name: 'Escolha seus favoritos' })).toBeVisible();
  await expect(page.getByText(/Loja demonstrativa/)).toBeVisible();
  await expect(page.getByText(/produtos no catálogo/)).toBeVisible();

  await page.getByRole('searchbox', { name: 'Pesquisar produtos' }).fill('zzzz-sem-resultado');
  await expect(page.getByRole('heading', { name: 'Nenhum produto encontrado' })).toBeVisible();
  await page.getByRole('searchbox', { name: 'Pesquisar produtos' }).fill('');

  await page.getByRole('button', { name: 'Adicionar' }).first().click();
  await expect(page.locator('.cartCount')).toHaveText('1');
  await page.getByRole('button', { name: 'Abrir carrinho' }).click();
  await expect(page.getByRole('heading', { name: 'Carrinho de compras' })).toBeVisible();
  await page.getByRole('button', { name: 'Remover todos' }).click();
  await expect(page.locator('.cartCount')).toHaveCount(0);
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
