# ike-bapi-autogestion-servicios (`services-service`)

**Qué hace:** BFF autogestión: asistencias, planes, proxy pets, polls, analytics, Feign a cores.

**Qué no hace:** gateway; no persiste turnos.

Cliente: `/services/<path>` en gateway → path sin prefijo en el servicio.

## Contrato (resumen)

| Path | Auth |
| --- | --- |
| `/health/backend` `/actuator/**` | permitAll |
| `/assistance/public/**` `/poll/public/**` `/plans/suscripciones/public/**` | permitAll |
| `/pets/especies` sizes cancel_reasons | permitAll |
| `/assistance/update**` `/bot/**` `/events/internal` `/internal/push/**` | API key |
| `/analytics/summary` `/funnel` | `read:analytics` |
| `/assistance/*` resto | JWT + a menudo `get:category` |
| `/backoffice/videollamadas/*` | `admin` |
| `/sse/assistance_updates` | JWT |

JWT faltante → 401. PreAuthorize fail → 403.

## Env

`API_GESTION_KEY`, `SERVICES_API_KEY`, `ASSISTANCE_PUBLIC_VIEW_SECRET`, `SERVICES_AUTH0_CLIENT_SECRET`, `ENGAGE_SERVICE_TOKEN`, `PETS_SERVICE_AUTHORIZATION`, `*_EVENTS_API_KEY`, `USERS_INTERNAL_API_KEY`, `SERVICES_DB_PASSWORD`, `BUSINESS_EVENTS_RETENTION_MONTHS` (24).

## Errores

| Tipo | HTTP | Códigos |
| --- | --- | --- |
| `DomainErrorException` | 400 | `INVALID_SERVICE`, `INVALID_USER`, `INVALID_TOKEN` |
| `AssistanceErrorException` | varía | `upstream_error`; `no_coverage` → **409** |
| EmptyResult | 404 | |

## Deploy

Igual patrón gateway. ECR `webapp-ike/services-service`. Deps: Postgres, Kafka, upstreams.
