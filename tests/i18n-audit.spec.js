import { test, expect } from "@playwright/test";
test("English deep link covers sign-in, catalog, cart and preserves counts",async({page})=>{
  await page.goto("/?lang=en");
  await expect(page.locator("html")).toHaveAttribute("lang","en");
  await expect(page.getByRole("heading",{name:"Sign in"})).toBeVisible();
  await page.getByRole("button",{name:"Explore demo"}).click();
  await expect(page.getByRole("heading",{name:"Pick your favorites"})).toBeVisible();
  await page.getByRole("button",{name:"Add",exact:true}).first().click();
  await page.getByRole("button",{name:"Open cart"}).click();
  await expect(page.getByRole("heading",{name:"Shopping cart"})).toBeVisible();
  await page.getByRole("button",{name:"Close"}).click();
  await page.getByRole("button",{name:"Português"}).click();
  await page.getByRole("button",{name:"Abrir carrinho"}).click();
  await expect(page.getByRole("heading",{name:"Carrinho de compras"})).toBeVisible();
  await expect(page.locator(".quantityControls output").first()).toHaveText("1");
});
