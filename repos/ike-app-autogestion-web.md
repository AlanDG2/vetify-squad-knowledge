# ike-app-autogestion-web

**Qué hace:** Next Pages Router multi-tenant: asistencias, mascotas, planes, Twilio, TalkJS, backoffice interno, BFF reintegros.

**Qué no hace:** lógica Spring; el gateway es `BASE_URL`.

## Rutas / BFF

UI: auth, myprofile/mypets/myplans/mycoverage/myclaims/mybills/myappointments/myreintegros, servicios, backoffice, videocall.

| Path Next | Nota |
| --- | --- |
| `/api/[...slug]` | proxy a `BASE_URL` |
| `/api/bff/reintegros/*` `/api/bff/ocr/*` | `REINTEGROS_BACKEND_ORIGIN` |
| `/api/health` `/api/sse` `/api/prestadores-token` | utils |

`NEXT_PUBLIC_REINTEGROS_SKIP_AUTH=true` saltea auth reintegros (flag temporal).

## Env (leídas en código)

`BASE_URL`, `AUTH0_*` / `NEXT_PUBLIC_AUTH0_*`, `MOCK_ENABLED`, Maps/TalkJS/GTM/Hotjar, `REINTEGROS_BACKEND_ORIGIN`, `REINTEGROS_BACKEND_TLS_INSECURE`, `PRESTADORES_API_URL`, `TENANT`, `FARO_COLLECTOR_ORIGIN`, etc. Copiar desde `envs/` — no pegar secretos.

## Errores

Reintegros: mismos `VAL-*`/`BUS-*` vía BFF. Resto HTTP/Auth0.

## Local / deploy

Bitbucket `mt-develop`→dev, `mt-staging`→qa, `mt-master`→prod. GitHub `develop`/`qa`/`main`.
