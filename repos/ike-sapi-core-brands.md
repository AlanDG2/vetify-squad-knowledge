# ike-sapi-core-brands (`brand-service`)

**Qué hace:** theme, assets, manifests, flags, brokers, accounts, notification-config.

**Qué no hace:** login, vehículos, push, upload.

Gateway `/brand/...`. Público: `GET /{url}/theme|assets|manifest|messages|features|bootstrap`. Autenticado: identification-types, secret, plans. `feature-flags:write` para mutar flags. Api-Key: `Authorization: Api-Key <BRAND_BACK_API_KEY>`.

## Errores

404 + mensaje: Theme/Manifest/Secret/Feature/Sponsor/Account not found. Sin FAMILIA-NNN.

## Env

`BRAND_BACK_API_KEY`, `BRAND_NOTIFICATION_CIPHER_KEY`, `BRAND_DB_PASSWORD`, `VERSION`, `default.brand`.

## Deploy

`develop`/`qa`/`main` → mt-arg-dev/staging/prod. ECR `webapp-ike/brands-service`.
