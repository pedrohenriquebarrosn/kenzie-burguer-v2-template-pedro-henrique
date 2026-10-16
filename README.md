# KenzieBurguer 2.0 — Interactive Storefront

**Responsive React and TypeScript storefront with product search, shopping-cart management, and authentication flows.**

[**↗ See live preview**](https://kenzie-burguer-v2-template-pedro-henrique-eoyd-c5ec30mk6.vercel.app/) · [**↗ Code on GitHub**](https://github.com/pedrohenriquebarrosn/kenzie-burguer-v2-template-pedro-henrique)

**Project status:** Reviewed bilingual storefront on the default branch, with passing build and browser checks for the guest experience. [Verification](https://github.com/pedrohenriquebarrosn/kenzie-burguer-v2-template-pedro-henrique/actions/runs/38476455635).

**More work:** [Professional Portfolio 2026](https://portfolio-pedro-barros-2026-review.vercel.app/en) · [Versão em português](https://portfolio-pedro-barros-2026-review.vercel.app/pt)

## Overview

KenzieBurguer 2.0 is an educational e-commerce interface initially created during Full Stack training and subsequently enhanced with a bilingual experience, a guest demonstration, and Supabase-backed account and cart flows.

## Key features

- Explore a responsive catalog of six illustrative food products.
- Search by product name or word prefix.
- Add products to the cart, change quantities, remove items, and calculate totals.
- Explore the store immediately using a separate, browser-local guest mode.
- Register, sign in, and manage an authenticated cart with Supabase Auth and PostgreSQL.
- Restrict authenticated cart records to their owners through Row Level Security.
- Switch between English and Portuguese.

## Technology stack

React 18 · TypeScript · Vite · React Router · Styled Components · Material UI · Supabase Auth · PostgreSQL · RLS · Playwright

## Explore and run locally

The default `main` branch contains the reviewed storefront, Supabase integration, and cart improvements. The linked application provides a published interactive preview; implementation and verification are documented below.

```bash
git clone https://github.com/pedrohenriquebarrosn/kenzie-burguer-v2-template-pedro-henrique.git
cd kenzie-burguer-v2-template-pedro-henrique
yarn install --frozen-lockfile
yarn dev
```

The Supabase client can be configured using public `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` values. Keep all privileged database credentials outside the frontend.

## Engineering and verification

- Guest shopping, product search, cart operations, and responsive behavior were exercised in automated browser tests.
- Authenticated UI and cart-persistence contracts were exercised with simulated Supabase HTTP responses.
- Cart storage uses PostgreSQL, with owner-restricted RLS policies and quantity constraints.

Products, images, and prices in this demonstration are illustrative. The interface is a portfolio project, not a commercial checkout, ordering, or payment service.

---

## Author

**Pedro Henrique Barros Nascimento** — Business Administration graduate and Full Stack development alumnus of Kenzie Academy Brasil.

[GitHub profile](https://github.com/pedrohenriquebarrosn) · [LinkedIn](https://www.linkedin.com/in/pedro-henrique-barros-nascimento-2bb684251/)
