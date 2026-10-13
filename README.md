# KenzieBurguer 2.0 — Product Catalog & Shopping Cart

A responsive React and TypeScript e-commerce learning project featuring authentication, a searchable product catalog, and an interactive shopping cart.

**[▶ See Project Live ↗](https://kenzie-burguer-v2-template-pedro-henrique-eoyd-pxpprhu2s.vercel.app/)** — updated preview, including a guest demonstration mode.

## Features

- Registration and sign-in interfaces using Supabase Auth.
- Searchable sample-product catalog with responsive layouts.
- Add and remove cart items and adjust quantities.
- Guest demonstration without creating a real account.
- PostgreSQL-backed cart implementation with per-user Row Level Security policies.

## Technologies

React · TypeScript · Vite · Supabase Auth · PostgreSQL · RLS · styled-components

## Version

The live preview uses the [updated review branch](https://github.com/pedrohenriquebarrosn/kenzie-burguer-v2-template-pedro-henrique/tree/review/i18n-pt-en-20261013); the default `main` branch contains an earlier version. The catalog is illustrative and does not offer real payments or order placement. The underlying policies and integration have been reviewed, but full live cross-account isolation and quantity-persistence testing are not yet complete.

## Run locally

Refer to the project's `package.json` scripts and configure the required Supabase environment variables for authenticated flows.
