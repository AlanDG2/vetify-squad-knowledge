# CLAUDE.md — vetify-squad-knowledge

> Índice ligero del cerebro de conocimiento compartido del squad Betify/Mascotas (Vetify + Iké
> Asistencia). Hermano de [`vetify-automation/automation`](../vetify-automation/automation) — ese
> repo es donde vive la automatización QA (Playwright) y donde se **produce** el conocimiento;
> este repo es donde ese conocimiento se **consume**, generalizado para todo el squad (PO/PM/SM,
> devs, QA), no solo para quien escribe tests.
>
> 🧭 Antes de cualquier tarea, leer [`AGENTS.md`](AGENTS.md) — decision trees, inventario de
> skills, cuándo usar qué.

---

## Qué es este proyecto

Un hub de conocimiento **de solo lectura para la mayoría de sus usuarios**: PO/PM/SM y devs
consultan y usan skills que leen de acá; **por ahora, solo QA escribe** en `knowledge/`
(ver `knowledge/decision-log.md` para por qué — riesgo de múltiples fuentes de verdad divergentes
si todos editan directo antes de que las skills de autoría estén probadas).

No es un fork de `automation` sin tests — es un proyecto nuevo que **referencia** a `automation`
como fuente de evidencia (tests reales, código verificado) en vez de duplicarlo. El mecanismo que
trae contenido desde `automation` hacia acá se llama **promoción** (ver
`scripts/promote-knowledge.mjs` y `knowledge/promotion-log.ndjson`) — no es una copia manual ni un
submódulo de git.

## Por qué existe (el problema que resuelve)

- Onboarding sin nada escrito: hoy, quien entra al squad depende de que alguien más esté
  disponible para explicarle el sistema.
- HUs inconsistentes: sin un chequeo de calidad antes de pasar a desarrollo (alcance/fuera de
  alcance, contradicciones con Figma).
- Devs sin forma estructurada de darle a QA trazabilidad de qué cambiaron y cómo probarlo.

## Mapa de carpetas

- **`knowledge/`** — el control-plane: `current-state.md` (snapshot de arranque),
  `project-context.md` (producto, organigrama, arquitectura), `system-knowledge.md` (conocimiento
  funcional/técnico, nutrido desde `automation`), `decision-log.md`, `glossary.md`,
  `known-issues.md`, `squad-playbook.md`, `context-index.json`, `promotion-log.ndjson` (auditoría
  de cada promoción de conocimiento).
- **`.claude/skills/`** — skills on-demand por rol (autoría de HU/epic/feature, reporte de bugs,
  creación de tareas, búsqueda de conocimiento). Ver inventario en `AGENTS.md`.
- **`core/dor/`** — Definition of Ready para HUs (equivalente al DoD que ya tiene QA en
  `automation`, pero para PO/PM/SM, y hoy solo a nivel recordatorio, no bloqueo — ver
  `knowledge/decision-log.md`).
- **`adapters/`** — mismo patrón de `automation`: interfaz agnóstica de gestor de tickets +
  adaptador `jira` (real) / `none` (no-op, activo por defecto en este repo hasta que el adaptador
  `jira` esté completo — ver `adapters/jira/README.md`).
- **`docs/_templates/`** — plantillas y prompts para devs (movidos desde `automation`, ver stub
  que quedó allá) y para HUs.
- **`docs/user-stories/`**, **`docs/bugs/`** — artefactos concretos, vacíos hasta la Fase de
  adopción del squad.

## Comandos

```bash
node core/validate/validate-control-plane.mjs   # valida que el control-plane esté completo
```

## Estado del proyecto

**Las 5 fases del plan original están completas.** Ver el plan completo en `knowledge/decision-log.md`.

- ✅ Fase 1 — scaffold + semilla (estructura, `knowledge/` sembrado, templates de devs movidos).
- ✅ Fase 2 — mecanismo de nutrición (`scripts/promote-knowledge.mjs` funcionando,
  `system-knowledge.md` sembrado con la migración Reintegros SISE→Nexus como primera promoción
  real, auditado en `promotion-log.ndjson`).
- ✅ Fase 3 — gate de Definition of Ready (`core/dor/dor-core.md`, `adapters/jira/dor-ticket.md`,
  hook `dor-preflight-check.sh` registrado y probado, `checkReadiness(id)` real en
  `adapters/jira/client.mjs`, skill `hu-epic-feature-authoring`). El adaptador `jira` ya está
  activo — requiere `.env` propio (ver `.env.example`).
- ✅ Fase 4 — consolidación dev-facing: skill `knowledge-lookup` + tabla "quién lee qué" en
  `AGENTS.md` (evita que un dev tenga que revisar más de lo que su rol necesita).
- ✅ Fase 5 — adaptador `jira` completo (`fetchStory`, `listEpicChildren`, `createStoryDraft`,
  `createDefect`, con guardrail de escritura propio en `adapters/jira/update-rules.md` +
  `adapters/jira/sync-log.ndjson`) + skills `squad-bug-report` y `squad-task-authoring`.

**Las 5 fases del plan original están completas.** El proyecto es usable de punta a punta: onboarding,
gate de DoR para HUs, mecanismo de nutrición de conocimiento desde `automation`, y reporte de
bugs/tareas con estándar para todo el squad. Próximos pasos son de **adopción**, no de construcción:
decidir si se pushea a un remoto (sigue local por ahora), y empezar a usarlo en HUs reales.

**Actividad de adopción, 2026-08-23**:
- `knowledge/system-knowledge.md` nutrido con 12 de las 14 secciones de `automation/docs/conocimiento-sistema.md` (visión del producto, los 5 módulos funcionales, conceptos transversales, integración Quantum, ciclo de sprint, usuarios/datos de prueba) — quedaron afuera 2 secciones de metadata interna de QA (no aplican a todo el squad). Detalle completo en `knowledge/promotion-log.ndjson`.
- 50 skills de PM adaptadas de `phuryn/pm-skills` (MIT) para llenar el hueco de soporte a PO/PM/SM en descubrimiento/estrategia/ejecución de producto — ver inventario en `AGENTS.md` y atribución en `.claude/skills/THIRD-PARTY-NOTICES.md`.
