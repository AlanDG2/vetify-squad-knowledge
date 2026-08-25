# webapp-proveedores-mascotas

**Qué hace:** SPA prestadores (login OAuth, alta, atenciones).

**Qué no hace:** Next, backoffice reintegros.

## Rutas UI

Público: `/signIn` `/signUp` `/recovery` `/auth/callback`. Privado: `/` `/home` `/attentionList` `/:id`.

API: `VITE_PUBLIC_API_URL` → backend-prestadores.

## Env

`VITE_PUBLIC_API_URL`, `VITE_PUBLIC_AUTH0_DOMAIN`, `VITE_PUBLIC_AUTH0_CLIEND_ID` (typo en nombre), `VITE_PUBLIC_AUDIENCE`, `VITE_PUBLIC_AUTH0_REALM` (default Username-Password-Authentication), Hotjar.

## Errores

Catálogo tipado: no encontrado.

## Local / deploy

`pnpm dev`. GitLab `develop`→dev, `staging`→qa, `main`→prod.
