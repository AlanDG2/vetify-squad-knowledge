# backend-prestadores

**Qué hace:** Django REST prestadores: TOTP/Auth0, SISE/ENGAGE, atenciones.

**Qué no hace:** videollamadas propias, checkout, reintegros, gateway.

## Contrato HTTP

Default: JWT Auth0 `IsAuthenticated`.

| Método | Ruta | Auth |
| --- | --- | --- |
| GET | `/api/health/` OpenAPI | — |
| POST | `/api/authentication/generate-totp/` | JWT clientes Auth0 |
| POST | `/api/authentication/validate-totp/` | TOTP |
| POST | `/api/authentication/register-provider/` | AllowAny |
| GET | `/api/authentication/oauth/login/` `/callback/` | OAuth PKCE |
| GET | `/api/sise/customer-detail/` `/coverage/` | JWT |
| GET | `/api/sise/pet/<id>/avatar/` | AllowAny |
| * | `/api/attentions/` cancel download subservices | JWT |

## Seguridad

Sin JWT → **401**. TOTP reusado → **403**.

## Env

`DJANGO_SECRET_KEY`, `DEBUG`, `POSTGRES_*`, `CELERY_BROKER_URL`, `SISE_API_*`, `ENGAGE_API_*`, `MASCOTAS_API_URL`/`KEY`, `USERS_SERVICE_URL`, `AUTH0_*`, `WEBAPP_URL`, `SENTRY_DSN`, `TOTP_INTERVAL` (300).

## Errores

| Código | HTTP | Cuándo | Revisar |
| --- | --- | --- | --- |
| `VETIFY_DOCUMENT_NOT_FOUND` | 422 | Doc no existe en users-service | DNI, `USERS_SERVICE_URL` |
| `USERS_SERVICE_UNAVAILABLE` | 503 | Users caído o URL vacía | red |
| registro Auth0 | 400/409/412/422/500 | alta proveedor | payload Auth0 |

## Local / deploy

`docker compose up --build` → `:8000`. Postgres + Redis. GitLab `develop`→dev, `staging`→qa, `main`→prod (EKS).
