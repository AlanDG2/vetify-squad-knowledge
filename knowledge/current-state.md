# Estado actual del proyecto (arranque del agente)

> Fuente de arranque por sesión. Se lee primero al empezar, para no depender solo del chat.

- **Proyecto**: `vetify-squad-knowledge` — hub de conocimiento compartido del squad Betify/Mascotas
  (Vetify + Iké Asistencia). Hermano de `vetify-automation/automation` (QA automation, Playwright)
  — no un fork, un proyecto separado que referencia al otro cuando necesita evidencia.
- **Remoto**: `git@gitlab.com:alan-ike/vetify-squad-knowledge.git`, rama `master` — ya no es
  local-only (eso cambió 2026-08-25, ver `decision-log.md`).
- **Quién escribe hoy**: solo QA (vía `scripts/promote-knowledge.mjs`, ver `AGENTS.md` regla 2).
  PO/PM/SM y devs consumen y usan skills, no editan `knowledge/` directo todavía.
- **Gestor de tickets**: adaptador `jira` **activo y completo** (`fetchStory`, `listEpicChildren`,
  `checkReadiness`, `createStoryDraft` — HU o actividad relacionada con `issueType`/`parentKey` —,
  `createDefect`, `addComment`). Todo bajo el mismo guardrail: preview + OK explícito antes de
  escribir, sin excepción (`adapters/jira/update-rules.md`).
- **Fase del plan original**: las 5 completas (scaffold, promoción, DoR, consolidación dev-facing,
  adaptador completo). Ver `decision-log.md` para el historial — lo que sigue es adopción real, no
  más construcción de estructura.
- **Contenido reciente** (2026-08-24/25): `knowledge/system-knowledge.md` con 12/14 secciones
  promovidas desde `automation`, 50 skills de PM adaptadas de `phuryn/pm-skills`, resúmenes de los
  últimos 2 sprints (`sprint-2026-Q3-*.md`), y un pack de 19 repos reales (`repos/00-indice.md`)
  con contrato HTTP/errores/env vars de cada servicio del squad.
- **2 hallazgos sin confirmar con dev** (ver `known-issues.md`): reuso del código de error
  `BUS-005` para 2 causas distintas, y 3 puntos sin autenticación real según el propio código.
- **Regla de evidencia**: no afirmar que algo "ya está" en este repo sin haber corrido
  `node core/validate/validate-control-plane.mjs` o leído el archivo real — igual que en
  `automation`, no asumir desde memoria de una sesión vieja.
