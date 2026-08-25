# ike-bapi-autogestion-gateway

**Qué hace:** Spring Cloud Gateway (8080): rutea a microservicios + CORS + correlation-id.

**Qué no hace:** negocio ni JWT de usuario en rutas de negocio (`permitAll`).

## Contrato

| Path gateway | Upstream | Auth gateway |
| --- | --- | --- |
| `/services/**` | services-service StripPrefix=1 | permitAll |
| `/users/**` `/vehicle/**` `/brand/**` `/files/**` `/notifications/**` | servicios homónimos | permitAll |
| `/actuator/health/liveness\|readiness` | local | permitAll |
| `/actuator/**` | local | HTTP Basic (`prometheus` + `MONITORING_ACTUATOR_PASSWORD`) |

## Errores

No hay catálogo de negocio (proxy). 502/504 = downstream.

## Deploy

GitHub/Bitbucket: `develop`→`mt-arg-dev`, `qa`→`mt-arg-staging`, `main`→`mt-arg-prod`. ECR `webapp-ike/ike-gateway`.
