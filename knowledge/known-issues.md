# Issues conocidos

> Problemas conocidos del sistema/proceso que NO son un bug puntual de una HU — gaps
> estructurales, limitantes de ambiente, o problemas de proceso recurrentes. Distinto de un bug de
> producto (eso va en `docs/bugs/` o directo en Jira).

- **HUs frecuentemente incompletas** (confirmado repetidas veces por QA): faltan secciones de
  alcance/fuera de alcance, contradicen el diseño de Figma, o no tienen criterios de aceptación
  atómicos/testeables. Es la motivación directa de la Fase 3 de este proyecto (gate de Definition
  of Ready). No es culpa de una persona puntual — es un gap de proceso.
- **Reintegros — limitante multi-mascota, no confirmado con Core todavía**: `policy.key` en
  Mascotas identifica titular+producto, no la mascota puntual — con 2+ mascotas en la misma
  cuenta, no las distingue entre sí. Ver `system-knowledge.md` (Fase 2) para el detalle técnico
  completo una vez promovido.

- **`BUS-005` parece reusarse para 2 condiciones de negocio distintas** (confirmado 2026-08-25,
  cruzando `repos/reintegros-backend.md` contra `IMAS-4354` y pruebas propias de QA): el doc del
  repo lo documenta como *"SISE sin cliente"* (404); `IMAS-4354` y la reproducción en vivo de QA
  lo vieron como *"Nexus pets/refund requiere clCuenta"* (también 404, mismo código). No
  confirmado con dev todavía si es el mismo código de error reusado a propósito para 2 causas
  distintas, o una casualidad de numeración — no asumir cuál es hasta que alguien de dev lo
  confirme.

- **3 puntos sin autenticación real, según lo que el propio código/config reportan** (relevado
  2026-08-25 vía `repos/*.md`, no explotado ni probado en vivo — documentado para que dev/
  seguridad lo confirme):
  - `backend-mascotas`: `/v1/files/upload`, `/v1/room_status_update`, `/v1/twiliologging` — sin
    dependencia de auth en el código (`repos/backend-mascotas.md`).
  - `ike-fiera-upload-manager` — el servicio completo (upload de fotos/imágenes, actualización de
    expediente/SISE) no tiene JWT ni API-Key en el código, y el gateway tampoco lo protege
    (`/files/**` es `permitAll` en `ike-bapi-autogestion-gateway`) — sin código de auth en ningún
    punto de la cadena (`repos/ike-fiera-upload-manager.md`).
  - `ike-app-autogestion-web` tiene un flag `NEXT_PUBLIC_REINTEGROS_SKIP_AUTH=true`, descripto en
    el propio código como "temporal", que saltea la autenticación de reintegros
    (`repos/ike-app-autogestion-web.md`).

- **Servicios intermitentes `500`/timeout en `category/overview`, `my-products`, `users/me` y
  `validation/policy` (Vetify WebApp, QA) — impedimento recurrente, todavía ABIERTO** (`IMP-017`
  bloqueo 1 en `automation/docs/impedimentos-bloqueos.md`, reconfirmado por última vez
  2026-09-17). Historia completa: el primer avistamiento (`IMAS-4464`, `IMP-014`) se dio por
  **Resuelto/Cancelado 2026-09-10** — el backend volvió a responder 200 de forma estable y Alan
  confirmó que Jira lo cerró por ser un problema de ambiente, no de producto. **Pero el mismo
  síntoma de fondo recurrió** (`IMP-017` bloqueo 1, desde 2026-09-01) y resultó ser mucho más
  transversal de lo que sugería el nombre original: rompe el arranque básico de la webapp
  (`category/overview`/`my-products`/`users/me`) para cuentas **fresh recién activadas y también
  cuentas pooled con plan real**, y además afecta `validation/policy` (activación de cuenta nueva,
  502). Reconfirmado 5+ veces entre 2026-09-04 y 2026-09-17, más recientemente aislado a cuentas
  OSDE Adquirente 100% fresh creadas por API (mientras cuentas pooled ya existentes no tienen
  problema el mismo día) — sugiere que es intermitente/por-cuenta, no un outage total. **Antes de
  reportar cualquier bug nuevo de Home/menú/planes/activación en Vetify WebApp QA, descartar
  primero que no sea este mismo impedimento.** Ver `bugs-conocidos.md` (`BUG-023`/`IMAS-4464`,
  cerrado por este motivo) y `system-knowledge.md` § Vetify WebApp para el detalle de los síntomas
  de UI (banner Cooper incorrecto, "No hay planes por el momento").

- **Issues Jira de tipo "Tarea" pueden guardar la descripción real en un custom field
  (`customfield_11620`), no en el campo `description` estándar** — descubierto 2026-08-27/28
  investigando `IMAS-4408` (`description` aparentaba estar vacío; el texto completo con los 12
  criterios de aceptación estaba en `customfield_11620`). Confirmado que el mismo problema afectó
  `IMAS-4356` el día anterior — casi lleva a una conclusión equivocada sobre esa HU. Un ticket tipo
  "Historia" revisado en paralelo (`IMAS-3610`) usa el campo estándar sin problema — **el gap
  parece ser específico del tipo de issue "Tarea"**, no general. Relevante para cualquiera que
  scriptee contra la API de Jira de este proyecto (incluido el adaptador `jira` de este mismo
  repo, si en el futuro lee historias/tareas en vez de solo crear defects) — no asumir que
  `description` vacío significa que la HU está realmente vacía sin revisar los custom fields.
  **2do modo de falla, encontrado 2026-08-28 en `IMAS-4092`**: acá el campo `description` estándar
  sí tenía el contrato completo (objetivo, tabla de negocio, checklist de 6 criterios de
  aceptación) — pero el CLI de `automation` (`jira-client.mjs get <KEY>`) trunca la salida en
  terminal después del primer párrafo, dando la misma sensación de "ticket vacío" que el caso de
  arriba, por una causa completamente distinta (truncamiento de display, no campo escondido). Se
  encontró porque Alan cuestionó directamente "pero no hay nada que probar?" después de una
  conclusión apresurada de "sin contrato". **Regla combinada**: si un ticket de Jira parece no
  tener contrato real, no confiar en la salida del CLI en ningún sentido — pedir el campo crudo
  vía API antes de concluir "no hay nada que probar acá". **Arreglado en código 2026-08-31**: el
  CLI (`jira-client.mjs get <KEY>`) ahora escanea automáticamente todos los `customfield_*` con
  contenido real en vez de mostrar solo `description` — cubre ambos modos de falla de una vez, ya
  no hace falta pedir el campo crudo a mano.

- **3 ítems del roadmap de QA no son funcionalidades reales del producto** (`IMP-024`,
  confirmado en vivo 2026-09-10): "Cambio/selección de mascota" (no existe un concepto de
  "mascota activa" a nivel de sesión — cada pantalla lista todas las mascotas como tarjetas,
  salvo dentro del flujo puntual de Videollamada, que tiene su propio selector), "Detalle de
  veterinaria" y "Atención de Red" (no existe ese ítem en ningún menú ni pantalla real,
  confirmado contra el menú lateral completo — ver `system-knowledge.md` § Vetify WebApp).
  Relevante para Producto/PM: si alguien sigue trackeando estos 3 como "pendiente de
  automatizar", en realidad es una pregunta de alcance sin responder, no un gap técnico.

- **Checkout institucional de Vetify B2C bloquea tras ~2 interacciones reales seguidas en la
  misma sesión** (`IMP-029`, nuevo 2026-09-10): aplicar cupón + completar datos 2 veces seguidas
  dentro de la misma sesión de navegador deja la landing en blanco (solo header + reCAPTCHA, sin
  planes) — reproducido 2 veces con métodos distintos, mismo síntoma exacto. Parece un mecanismo
  de anti-bot/rate-limiting del checkout mismo, no un bug de automatización. **Relevante para
  cualquier prueba de carga, demo con múltiples compras seguidas, o campaña de marketing con
  tráfico repetido desde la misma sesión/IP** — Oscar Tello confirmó parcialmente que "no
  deberías poder hacer más de 2 compras/interacciones con el mismo cliente" en QA.
