# ike-xapi-autogestion-web (`ike-service`)

**Qué hace:** Spring Kotlin XAPI: asistencias, cobertura, planes, claims, brand/users, vial → Gestión/SISE, Nexus, Paygate.

**Qué no hace:** UI, reintegros-backend, ruteo gateway.

Vía gateway: `/services/<path>`. FF Nexus vs SISE: `ike.assistance.auxiliary.mode` default **AGC**; `NEX` = Nexus (vial). En memoria: restart vuelve a AGC.

## Contrato HTTP (paths del servicio)

`/version`, `/categories`, `/plans`, `/policy`, `/poll`, `/claim/*`, `/coverage*`, `/bill/all`, `/brand*`, `/vets`, `/province*`, `/user*`, `/assistance/*`, `/ppe/providers`, `/vial/product*`.

Auth: JWT Auth0 (`permissions`). CSRF ignore en varios paths (`SecurityConfig`). Verificar código antes de asumir permitAll.

## Errores

| Tipo | HTTP | Revisar |
| --- | --- | --- |
| `DomainError` (`INVALID_USER`, `POLL ALREADY EXISTS`, `CANT_CREATE`) | 400 | payload |
| Gestión/Nexus down | 503 | red |
| `AssistanceError` | 422 | reglas asistencia |

## Local / deploy

Java 21, `application-local` example. Bitbucket `mt-*` → `mt-arg-{dev,staging,prod}`. GitHub `develop`/`qa`/`main`. ECR `webapp-ike/ike-service`.
