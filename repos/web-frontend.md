# web-frontend

**Qué hace:** SPA Vite+React sitio Vetify + checkout + payment links + landings OSDE/Flux.

**Qué no hace:** backoffice reintegros, login de usuario, API de negocio.

## Rutas UI

`/` checkout (`/checkout/form` billing payment success), blog, legales, landings, mapa, `regresando/:leadId`, payment links, `/consideracion`, `*`.

BFF: `VITE_BFF_URL` / `VITE_API_BASE_URL` → web-backend.

## Seguridad

Sin login. reCAPTCHA. Todo `VITE_*` es público.

## Env

`VITE_BFF_URL`, `VITE_API_BASE_URL`, `VITE_API_CUENTA` (`MA_VETIFY`), `VITE_RECAPTCHA_SITE_KEY`, `VITE_OSDE_CAMPAIGN_ID`, `VITE_SF_CAMPAIGN_DEFAULT`, `VITE_CARTILLA_URL`, `VITE_QUANTUM_BASE` (fallback qa-quantum), `VITE_RUM_ENABLED`/`SAMPLE_RATE`.

## Errores UI

Códigos MP en `paymentErrorCodes.constant.ts`. Enrolamiento **409** = token/cupón usado.

## Local / deploy

`npm run dev`. Necesita BFF :3001. **CI en repo: no encontrado.**
