# web-backend (BFF checkout Vetify)

**Qué hace:** Express 5: Web-to-Lead SF, Apex ecommerce, Quantum/ENGAGE, MercadoPago, enrolamiento SQL Server, Prometheus, cron mails.

**Qué no hace:** login Auth0 de usuario, turnos, reintegros.

Puerto default **3001**. Env vía `getEnv.ts`.

## Contrato HTTP

| Método | Ruta | Auth |
| --- | --- | --- |
| GET | `/health` | público |
| POST | `/api/webtolead` `/api/registro` | rate limit + reCAPTCHA (lead) |
| POST | `/api/sf/first-step` `/second-step` `/ecommerce` `/ecommerce-error` | público |
| POST | `/api/ecommerce/validate-card` | público |
| GET/POST | Quantum `/api/quantum/*`, payment links, `/api/calculate-discount` | proxy |
| GET | `/api/lead/:id` `/api/product-price/:id` | SF/Quantum |
| POST | `/api/rum` | público (rate limit) |
| GET | `/api/metrics` | Bearer `METRICS_TOKEN`; malo/ausente → **404** |
| GET | `/api/debug/...` | siempre registrados |
| GET | `/__debug/purchase-log-path` | no production |

## Seguridad

CORS `ALLOWED_ORIGIN` → 403 si origen no permitido. Metrics fail-closed 404.

## Env

`PORT`, `ALLOWED_ORIGIN`, `METRICS_TOKEN`, `RECAPTCHA_*`, `SF_*`, `QUANTUM_BASE`, `API_USERNAME`/`PASSWORD`, `BOUNCER_API_KEY`, `NUMVERIFY_*`, `DB_*` (SQL Server), `SMTP_*`, `CRON_ENVIO_MAIL`, `ENVIO_MAIL_*`, `TOKEN_*`, `GIT_COMMIT`. Ver `.env.example` (no commitear secretos).

## Errores

| Código | HTTP | Cuándo | Revisar |
| --- | --- | --- | --- |
| captcha/bot | 4xx | reCAPTCHA | `RECAPTCHA_*` |
| `missing_fields` | 400 | payload | form |
| `too_many_requests` | 429 | rate limit | IP |
| `sf_error` / `upstream_error` | 502 | SF/Quantum | credenciales |
| token enrolamiento | 422 | no está en tabla Tokens | |
| token duplicado | 409 | UNIQUE SQL | |

## Local / deploy

`npm run dev`. Deps: SQL Server (enrolamiento), SMTP, SF/Quantum. **Pipeline en repo: no encontrado.**
