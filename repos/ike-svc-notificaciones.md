# ike-svc-notificaciones (`notifications-service`)

**Qué hace:** Kafka consumers (mail/push), PureCloud WhatsApp, FCM/APNs, SMTP, SQL Server SISE, recordatorios.

**Qué no hace:** CRUD users/brands/vehicles. El trabajo es **asíncrono**.

## HTTP

| Path | Auth |
| --- | --- |
| GET `/notifications` `/health/backend` | JWT |
| `/actuator/**` | permitAll |

Catálogo errores negocio: no encontrado.

## Env

`SMTP_CIPHER_KEY`, `NOTIFICATIONS_*`, `PURECLOUD_*`, `DB_SISE_*`, `APNS_KEY_ID`, `contact.alerts.toEmail`, `services.api.key`, FCM/APNs.

## Deploy

ECR `webapp-ike/notifications-service`. Deps: Kafka + SQL Server.
