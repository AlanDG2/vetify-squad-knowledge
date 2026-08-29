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
- **Sync de paridad 2026-08-28** (a pedido de Alan, "que estén a la par"): se comparó todo lo
  nuevo en `automation` contra este hub y se promovió lo que faltaba — `system-knowledge.md` sumó
  2 secciones nuevas (`Hallazgos históricos` OSDE histórico, `Estado oficial de automatización`) y
  refrescó 4 más (`Usuarios de prueba compartidos` con la tabla de repos/links oficiales, `Vetify
  WebApp` con el banner Cooper/Vetify PLUS, `Vetify B2C + OSDE Adquirente` con la landing
  `/salud-mascotas`, `Quantum` con los IDs de producto 2319/2364); `bugs-conocidos.md` sumó
  `BUG-017` a `BUG-023` (7 bugs nuevos, uno sin Jira todavía); `known-issues.md` sumó el
  impedimento `IMP-014`/`IMAS-4464` (servicios 500 intermitentes) y el gotcha de
  `customfield_11620` en issues Jira tipo "Tarea"; `sprint-2026-Q3-S5-Mascotas.md` actualizó los
  estados stale de `IMAS-4356`/`IMAS-4408`/`IMAS-3610`. Quedó **deliberadamente fuera de esta
  ronda** (bajo valor para audiencia squad-wide, muy específico de tooling QA): el detalle del
  scaffold mobile Appium/WebdriverIO (`IMP-008`-`IMP-011` en `automation`) y la sección "Hallazgos
  / gaps detectados durante el estudio de tests" de `conocimiento-sistema.md`.
- **2do sync de paridad el mismo día, más tarde (2026-08-28)**: tras un re-intake exhaustivo de
  toda la épica `IMAS-4101` en `automation` (Reintegros SISE→Nexus), se promovió la sección
  `Módulo: Reintegros` completa (vía `promote-knowledge.mjs`, ahora con contrato real de 4 fases
  B/C/D nunca antes documentado + la causa raíz de `IMAS-4354` confirmada en vivo — es 100% de
  `reintegros-backend`, no de Nexus/Core). `bugs-conocidos.md` actualizó `BUG-007`/`BUG-015`/
  `BUG-023` con sus estados reales de Jira. `known-issues.md` sumó el cierre de `IMAS-4464`
  (Cancelado, sin explicación) y un 2do modo de falla del gotcha `customfield_11620` (esta vez el
  problema fue truncamiento del CLI, no el campo escondido). `sprint-2026-Q3-S5-Mascotas.md` se
  refrescó a día 5 (235 issues/24 top-level, 6 bugs nuevos de Reintegros: `IMAS-4471`-`4476`).
- **2 hallazgos sin confirmar con dev** (ver `known-issues.md`): reuso del código de error
  `BUS-005` para 2 causas distintas, y 3 puntos sin autenticación real según el propio código.
- **Regla de evidencia**: no afirmar que algo "ya está" en este repo sin haber corrido
  `node core/validate/validate-control-plane.mjs` o leído el archivo real — igual que en
  `automation`, no asumir desde memoria de una sesión vieja.
