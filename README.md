# KenzieBurguer 2.0 — React + TypeScript Storefront

Educational storefront originally built during the Kenzie Academy Brasil Full Stack program, with a real backend integration now implemented on an isolated recovery branch.

## Live preview (under validation)

**[Open KenzieBurguer 2.0 preview](https://kenzie-burguer-v2-template-pedro-henrique-eoyd-64nnvoova.vercel.app/)**.

**This is not a commercial store.** The six catalog products, images and prices are illustrative. There is no order placement, checkout, payment processing or actual inventory.

- **Guest demonstration:** enter without an account, browse products, search, and use an in-memory cart.
- **Authenticated mode:** Supabase Auth registration/login, protected storefront, server-backed catalog and cart per signed-in account.
- **Persistence:** cart entries are stored in PostgreSQL table `kenzieburguer_cart_items`, and RLS limits access to their authenticated owner.
- **Email limitation:** Supabase built-in SMTP sends to approved team emails only; real visitor email confirmation requires additional SMTP/redirect configuration. Do not interpret a successful build as verified email delivery.

## Stack

React 18 · TypeScript · Vite · React Router · React Hook Form · Styled Components · Material UI · React Toastify · Supabase Auth · PostgreSQL · Row Level Security.

## Run locally

```bash
git clone https://github.com/pedrohenriquebarrosn/kenzie-burguer-v2-template-pedro-henrique.git
cd kenzie-burguer-v2-template-pedro-henrique
git checkout fix/recover-auth-cart-20261012
yarn install --frozen-lockfile
yarn dev
```

The public client values `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` are optional overrides in `src/services/supabase.js`. Do not put secret keys in a client bundle.

## Verification

- [Recovery PR](https://github.com/pedrohenriquebarrosn/kenzie-burguer-v2-template-pedro-henrique/pull/1) (draft).
- [Passing guest UI and API-contract tests](https://github.com/pedrohenriquebarrosn/kenzie-burguer-v2-template-pedro-henrique/actions/runs/38288227055) test login, HTTP-backed cart rehydration, search and guest behavior with simulated Supabase responses.
- Staging deployment with the backend integration reached `READY`; further changes must be built and deployed before replacing this URL.
- **Pending:** live email confirmation, authenticated catalog/cart operations and cross-user isolation, checked end-to-end against the actual hosted Supabase instance.

Production remains unchanged. Do not claim real orders or economic transactions from this demonstration.
