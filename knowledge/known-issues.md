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
