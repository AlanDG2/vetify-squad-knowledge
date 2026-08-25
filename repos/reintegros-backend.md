# reintegros-backend

**Qué hace:** API Spring (Java 21) de reintegros Vetify: cuentas, confirmación de solicitudes, expedientes titular/backoffice, ARCA (SQS+HTTP), OCR Textract, SISE/Nexus, IKE Users/Mascotas/Prestadores, mail al titular.

**Qué no hace:** portal prestadores, checkout ecommerce, gateway autogestión, videollamadas, UI.

OpenAPI: `reintegros-backend/src/main/resources/openapi/reintegros-v1.yaml`. Sin context-path.

## Contrato HTTP

Roles JWT con `IKE_ENFORCE_JWT_ROLES=true`. Claim cuya clave termina en `roles` → `cliente` | `quality` | `finance`.

| Método | Ruta | Rol |
| --- | --- | --- |
| GET | `/api/reintegros/v1/mascotas` | `cliente` (DNI vía IKE Users + Bearer) |
| GET | `/api/reintegros/v1/expedientes` | `cliente` |
| GET | `/api/reintegros/v1/expedientes/{expedienteId}` | `cliente` |
| GET | `/api/reintegros/v1/tipos-gasto` | `cliente` |
| GET | `/api/reintegros/v1/motivos-rechazo` | `quality` o `finance` |
| GET/POST | `/api/reintegros/v1/cuentas-acreditacion` | `cliente` |
| GET | `/api/reintegros/v1/cuentas-acreditacion/entidad-bancaria/{numero}` | `cliente` |
| PATCH | `/api/reintegros/v1/cuentas-acreditacion/{id}/activa` | `cliente` |
| DELETE | `/api/reintegros/v1/cuentas-acreditacion/{id}` | `cliente` |
| POST | `/api/reintegros/v1/solicitudes/confirmacion` | `cliente` |
| POST | `/api/reintegros/v1/documentos/validar` | `cliente` |
| GET | `/api/reintegros/v1/backoffice/expedientes` | `quality` o `finance` |
| GET | `/api/reintegros/v1/backoffice/expedientes/{expedienteId}` | `quality` o `finance` |
| PATCH | `/api/reintegros/v1/backoffice/expedientes/{expedienteId}` | `quality` |
| POST | `.../decision-calidad` | `quality` |
| PATCH | `.../comprobante-arca` | `quality` |
| POST | `.../aprobacion-manual-arca` | `quality` |
| POST | `.../registro-pago` | `finance` |
| GET/PUT | `/api/reintegros/v1/backoffice/solicitudes/{solicitudId}/lineas-factura` | `quality` |
| POST | `/api/ocr/v1/text-recognition` | `cliente` |
| GET | `/actuator/health` | público |

Errores: `application/problem+json` (`code`, `message`, `details`, `traceId`, `instance`).

## Arquitectura

Hexagonal `ar.ike.reintegros`: `adapter/in/web` → `application` → `domain` → `adapter/out` (JPA/Flyway, S3, SQS, Textract, HTTP). Postgres `reintegros_schema`. Redis.

## Seguridad

Falta/mal `Authorization` → AUTH-001/002/003 (**400**). JWT inválido/vencido → AUTH-005 (**401**). Rol insuficiente → AUTH-004 (**403**). Perfiles `local`/`local-aws`: enforcement off si no está `IKE_ENFORCE_JWT_ROLES`. ECS: `true`.

## Env (nombres reales)

`SPRING_DATASOURCE_*`, `IKE_REDIS_*`, `IKE_USERS_*`, `IKE_JWT_*`, `IKE_ENFORCE_JWT_ROLES`, `IKE_HOLDER_PETS_*`, `IKE_REIMBURSEMENT_*`, `IKE_TEXTRACT_*`, `AWS_S3_*`, `AWS_SQS_*`, `AWS_ROLE_ARN`, `AWS_ACCESS_KEY_ID`/`SECRET`, `ARCA_INVOICE_VALIDATOR_CLIENT_*`, `IKE_ARCA_PIPELINE_*`, `SISE_*`, `REINTEGROS_MAIL_*`, `REINTEGROS_WEB_BASE_URL`, `REINTEGROS_NOTIFY_*`, `IKE_REST_CLIENT_LOGGING_*`, `REINTEGROS_CORE_PROVIDER` (default `SISE`), `NEXUS_BASE_URL`, `NEXUS_API_KEY`, `NEXUS_*_PATH`. Detalle y defaults: README del repo + `.env.example` (LocalStack).

## Errores de negocio

| Código | HTTP | Cuándo | Qué revisar |
| --- | --- | --- | --- |
| AUTH-001 | 400 | Authorization ausente | Header Bearer |
| AUTH-002 | 400 | No esquema Bearer | Formato |
| AUTH-003 | 400 | Token vacío | JWT |
| AUTH-004 | 403 | Rol insuficiente | claim `*roles` |
| AUTH-005 | 401 | JWT inválido/vencido o Users rechaza | issuers/audiences |
| VAL-001 | 400 | @Valid / multipart file | OpenAPI |
| VAL-002 | 400 | DNI no 7–8 dígitos | patrón |
| VAL-003 | 400 | OCR MIME no PNG/JPEG/PDF | archivo |
| VAL-004 | 400 | OCR vacío | parte `file` |
| VAL-009 | 413 | Multipart demasiado grande | `IKE_REIMBURSEMENT_DOC_MAX_BYTES` |
| VAL-010 | 400 | CBU/CVU inválido | 22 dígitos / checksum |
| VAL-011 | 400 | Prefijo entidad inactivo | catálogo bancos |
| VAL-012/013 | 400 | `ambito` motivos-rechazo | CALIDAD / FINANZAS_OPERATIVO |
| VAL-014–025 | 400 | Confirmación solicitud (payload, factura, cobertura, mascota, cuenta, OCR fiscal) | OpenAPI confirmación |
| VAL-026–031 | 400 | Backoffice ARCA / catálogo / PDF | comprobante-arca, Textract |
| BUS-001 | 400 | Cuenta id inexistente | GET cuentas |
| BUS-002 | 409 | Borrar última cuenta | — |
| BUS-003 | 409 | Borrar activa sin otra | PATCH activa primero |
| BUS-004 | 409 | CUIT+nro factura duplicado | idempotencia |
| BUS-005 | 404 | SISE sin cliente | `SISE_*` / DNI |
| BUS-006 | 502 | Alta/cierre SISE/Nexus sin id | `REINTEGROS_CORE_PROVIDER` |
| BUS-007 | 400 | Users sin DNI o transición ilegal | mensaje/`instance` |
| BUS-008–015 | 400/409 | Calidad/ARCA/estados/montos | bandeja y pipeline |
| BUS-016 | 409 | DELETE cuenta usada en solicitud | — |
| INT-001–004 | 502 | SISE/Nexus | credenciales/red |
| INT-005–007 | 502/503 | IKE Mascotas | `IKE_HOLDER_PETS_*` |
| INT-008–010 | 502/503 | S3 / IKE Users | `AWS_*` / `IKE_USERS_*` |
| INT-011–013 | 503 | Textract | IAM/cuotas |
| SYS-001 | 404 | Ruta inexistente | OpenAPI |
| SYS-002 | 405 | Método incorrecto | verbo |
| SYS-004 | 409 | Integridad JDBC | FKs |
| SYS-099 | 500 | No tratado | `traceId` |

## Local / deploy

JDK 21: `./mvnw spring-boot:run -Dspring-boot.run.profiles=local` o `docker compose up --build` (Postgres 16, Redis 7; perfil `local-aws` = LocalStack S3+SQS).

GitLab: `develop`→dev ECS, `qa`→qa, `main`→prod. `.pipeline/{dev,qa,prod}.env.yml`.
