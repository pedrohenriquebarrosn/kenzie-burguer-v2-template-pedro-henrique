# KenzieBurguer 2.0 — React & TypeScript Storefront

An educational storefront developed as part of my Full Stack Web Development training. It demonstrates responsive React interfaces, a product catalog, search, and shopping-cart state management.

> **Current status (12 October 2026):** This recovery branch has passed its TypeScript/Vite build and 2 Playwright browser tests. It adds a clearly labeled **local guest demonstration**, not a real shop. The older deployed version does **not** include these fixes yet.

## What the demo does

- Enter the storefront through **Acessar demonstração**, without creating a real account.
- Browse six **fictitious** products with illustrative images and prices.
- Search the catalog by product name.
- Add products to the cart, remove individual items, and clear all items.
- View the dynamically calculated total in Brazilian reais.
- Log out and return to the entry page.

Guest mode is client-side only. There are **no real payments, orders, customers, inventory synchronization, or secure accounts** in this demonstration. The original app's registration and login screens remain, but the legacy backend has not been restored.

## Stack

React 18 · TypeScript · Vite · React Router · Axios · React Hook Form · Styled Components · Material UI · React Toastify

## Run locally

```bash
git clone https://github.com/pedrohenriquebarrosn/kenzie-burguer-v2-template-pedro-henrique.git
cd kenzie-burguer-v2-template-pedro-henrique
git checkout fix/recover-auth-cart-20261012
yarn install --frozen-lockfile
yarn dev
```

Open the local address displayed by Vite, then click **Acessar demonstração**.

## Validate

A GitHub Actions job on the recovery branch installs dependencies, builds the TypeScript/Vite project, and runs browser tests in Chromium.

- **[Passing build and browser test](https://github.com/pedrohenriquebarrosn/kenzie-burguer-v2-template-pedro-henrique/actions/runs/38261460891)** — 2/2 Playwright tests passed.
- The tests cover the guest catalog, search, cart, clearing items, logout, and a mobile viewport.
- Source: [`tests/recovery.spec.js`](tests/recovery.spec.js).

These checks do not validate real backend authentication, persistence, or payments.

## Backend integration (not yet restored)

The original frontend still defaults to the legacy endpoint `https://hamburgueria-kenzie-v2.herokuapp.com`. A compatible replacement can be configured at build time using `VITE_API_BASE_URL`.

Expected routes include `POST /users`, `POST /login` (returning `{ user, accessToken }`), `GET /users/:id` with a bearer token, and `GET /products` returning an array of product records. Real backend operation and CORS compatibility remain unverified.

See [recovery notes](docs/RECOVERY_2026-10-12.md) for the exact boundaries and outstanding work.

## Project context

Educational project; not a production commerce application. The recovery work is isolated in a pull request and has not been merged to `main` or deployed to the existing public site.

[LinkedIn](https://www.linkedin.com/in/pedro-henrique-barros-nascimento-2bb684251/) · [GitHub profile](https://github.com/pedrohenriquebarrosn)
