# backend (Ike Mascotas)

**Qué hace:** FastAPI turnos/videollamadas, slots, mascotas, proveedores, Twilio, notificaciones, telemetría, métricas backoffice.

**Qué no hace:** BFF ecommerce, gateway autogestión, Django prestadores, reintegros.

Prefijo `/v1`. Docs locales: `http://localhost/docs` (Compose `:80`).

## Contrato HTTP

| Método | Ruta (resumen) | Auth |
| --- | --- | --- |
| GET | `/` `/health` `/test` | público |
| CRUD | `/v1/cliente/{tipo}/{id}/slots…` `/mascotas` `/turnos` `/twilio` | `Authorization: api-key <API_KEY>` |
| GET | `/v1/tamanos_mascota` algunas credenciales | sin Depends en código |
| * | `/v1/profesionales/*` | Bearer + `manage:appointments` |
| * | `/v1/backoffice/proveedores…` turnos clientes | Bearer + `admin` |
| POST | `/v1/telemetria/videollamada-error` | API-Key **o** Bearer |
| GET | `/v1/backoffice/videollamadas/*` | API-Key **o** Bearer `admin` |
| POST | `/v1/files/upload` `/v1/room_status_update` `/v1/twiliologging` | sin auth Depends |

## Arquitectura

Hexagonal `app/api/<dominio>/`. Celery + Redis. Dominios: turnos, cliente, proveedores, notificaciones, especies, sise, audit, files, twilio, metricas.

## Seguridad

API-Key mala → **401**. Esquema mal → **403**. JWT inválido → **401**. Sin permission → **403**. Audience Auth0 hardcode `api.mascotas.ikeargentina.com.ar`.

## Env (settings)

`API_KEY`, `DB_*`, `REDIS_HOST`, `AUTH0_*`, `TWILIO_*`, `S3_BUCKET_NAME`, `SISE_API_*`, `YOIZEN_*`, `CORS_ALLOWED_ORIGINS`, `SENTRY_DSN`, `EXPO_TOKEN`, `EMAIL_*`, pools, tiempos de turno. Copiar `.env.sample`.

## Errores

Sin catálogo `FAMILIA-NNN`. HTTP 400/403/404/409 ad-hoc. QA: key inválida, JWT vencido, permission faltante, double-booking, SISE down.

## Local / deploy

`cp .env.sample .env && docker compose up`. Postgres + Redis + Celery. Flower `:5555`. GitLab `develop`/`staging`/`main` → EKS homónimo.
