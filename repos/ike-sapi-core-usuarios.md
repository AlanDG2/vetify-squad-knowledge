# ike-sapi-core-usuarios (`users-service`)

**Qué hace:** users/me, devices, addresses, claims, bills, broker, OTP, baja/retención, recovery, interno, Auth0, Kafka.

**Qué no hace:** theming, vehículos, envío push (publica Kafka), files.

Gateway `/users/...`.

## Contrato (resumen)

permitAll: `/create`, `/exist`, `/password-recovery`, `/otp/send|verify`, `/plan/baja|retencion`, `/broker/**` (salvo token).  
`POST /broker/getAccessToken` = Api-Key broker. `/internal/**` = `USERS_INTERNAL_API_KEY`.  
JWT: `/me` `get:users`, updates `update:users`, policy `get:policy`, mail `get:category`, version `get:version`.

## Errores (400 DomainError salvo nota)

`INVALID_USER*`, `EMAIL_ALREADY_REGISTER`, `IDENTIFICATION_ALREADY_USED_*`, `INVALID_TOKEN`, `OTP_*`, `PLAN_NOT_OWNED`, `DUPLICATE_PLAN`. **409** `UserShouldLoginWithPassword`. **500** `MissingConfiguration`. Upstream Engage: `PLANS_UNAVAILABLE` / `JENGAGE_UNAVAILABLE`.

## Env

`USERS_AUTH0_CLIENT_SECRET`, `USERS_BACK_API_KEY`, `BRAND_BACK_API_KEY`, `USERS_INTERNAL_API_KEY`, `USERS_DB_PASSWORD`, `USERS_JWT_SECRET`, `OTP_SESSION_JWT_SECRET`, `SMTP_CIPHER_KEY`, `TALKJS_APP_TOKEN`, `EVENT_OUTBOX_RETENTION_DAYS` (7), Kafka bootstrap.

## Deploy

ECR `webapp-ike/users-service`. Mismo branch→env autogestión.
