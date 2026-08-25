# reintegros-backoffice

**Qué hace:** UI Next.js 16 para operadores `finance` | `quality`. BFF `/api/bff/reintegros/*` → Spring.

**Qué no hace:** app titular; no llama Spring desde el browser; no corre OCR/ARCA.

## Contrato HTTP (esta app)

| Método | Ruta | Auth |
| --- | --- | --- |
| GET | `/` `/expedientes/[id]` | sesión Auth0 + rol `finance` \| `quality` |
| GET | `/api/health` | público (ALB) |
| * | `/auth/login` `/logout` `/callback` | Auth0 SDK v4 |
| * | `/api/bff/reintegros/[...path]` | sesión; proxy + Bearer + `X-Titular-Id` |

Roles por operación: los del backend. Query inválida BFF (SEC-013) → `VAL-400`. Catálogo completo: [reintegros-backend.md](./reintegros-backend.md).

## Arquitectura

Browser → Next (`proxy.ts`) → BFF → Spring. TanStack Query, Chakra v3.

## Seguridad

Sin sesión → login. Rol no permitido → `/unauthorized`. BFF no expone `REINTEGROS_BACKEND_ORIGIN` al cliente.

## Env

`AUTH0_DOMAIN`, `AUTH0_CLIENT_ID`, `AUTH0_CLIENT_SECRET`, `AUTH0_SECRET`, `AUTH0_AUDIENCE`, `AUTH0_SCOPE` (default `openid profile email offline_access`), `APP_BASE_URL`, `REINTEGROS_BACKEND_ORIGIN`, `REINTEGROS_BACKEND_TLS_INSECURE` (`true` skip TLS), `BFF_DEFAULT_TITULAR_ID`, `CSP_*`, `CORS_EXTRA_ORIGINS`.

## Local / deploy

`yarn install && yarn dev` (:3000). GitLab `develop`→dev, `qa`→qa, `main`→prod (ECR/ECS).
