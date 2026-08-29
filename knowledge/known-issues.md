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

- **Servicios intermitentes `500` en `category/overview` y `plans/engage/{dni}` (Vetify WebApp,
  QA)** — confirmado 2026-08-28 vía captura de red en vivo (Playwright MCP), reportado en Jira
  como `IMAS-4464` (`IMP-014` en `automation/docs/impedimentos-bloqueos.md`), linkeado "Blocks" a
  `IMAS-4356`. **Por qué importa más allá de un bug puntual**: estos 2 endpoints fallando de forma
  intermitente ya generaron 2 síntomas de UI que en un primer momento parecían bugs de producto
  distintos — el banner de beneficios de Home cae a "Vetify PLUS" en vez de "Cooper" cuando falla
  `category/overview`, y "Planes y coberturas" muestra "No hay planes por el momento" (para una
  cuenta con plan real) cuando falla `plans/engage/{dni}`. También se vio `notifications` con
  `500` la misma sesión. **Antes de reportar cualquier bug nuevo de Home/menú/planes en Vetify
  WebApp QA, descartar primero que no sea este mismo impedimento** — ver
  `system-knowledge.md` § Vetify WebApp (banner Cooper) para el detalle completo.
  **Actualización 2026-08-28 (pull de sprint más tarde el mismo día)**: `IMAS-4464` pasó a
  **Cancelado** en Jira (asignado a juan cruz triventi), sin comentarios que expliquen el motivo —
  coincide con que dejó de reproducir en el retest de la tarde, pero al cerrarse como "Cancelado"
  y no "Hecho"/confirmado, no queda del todo claro si dev llegó a la misma conclusión o si se
  cerró sin más contexto.

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
  vía API antes de concluir "no hay nada que probar acá".
