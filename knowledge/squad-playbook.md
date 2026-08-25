# Squad Playbook

> Cómo se trabaja en este squad: convenciones operacionales, flujos repetidos. Complementa las
> skills (que son el "cómo" técnico paso a paso).

## Onboarding de una persona nueva

1. Leer `knowledge/project-context.md` (producto, organigrama, arquitectura).
2. Leer `knowledge/glossary.md`.
3. Leer `knowledge/system-knowledge.md` (conocimiento funcional/técnico del sistema).
4. Si es dev: `docs/_templates/dev-repo-context-for-qa-general.prompt.md` (qué se espera del README
   de su propio repo) + `repos/00-indice.md` (contrato HTTP/errores/env vars ya relevados de 19
   repos reales del squad).
5. Si es PO/PM/SM: skill `hu-epic-feature-authoring` + `core/dor/dor-core.md`.

## Cerrar una HU (dev → QA)

1. Dev instala (una vez por repo) `docs/_templates/gitlab-mr-template-para-qa.md` como
   `.gitlab/merge_request_templates/Default.md` — GitLab precarga la sección "Para QA" vacía sola.
2. Al terminar la HU, dev pega `docs/_templates/dev-hu-testing-note.prompt.md` a su propia IA —
   completa la sección de la MR y arma un borrador de comentario para Jira.
3. Dev revisa y pega a mano el borrador de comentario en Jira (nunca automático — ni con
   `addComment` del adaptador, que exige el mismo guardrail de preview + OK explícito).
4. QA certifica en `automation`, usando el MR + el conocimiento acumulado acá.
5. Si la certificación genera conocimiento nuevo de sistema, QA lo promueve acá
   (`scripts/promote-knowledge.mjs`) — ver `knowledge/promotion-log.ndjson` para el historial.

## Redactar una HU nueva (PO/PM/SM)

Skill `hu-epic-feature-authoring` — consulta `knowledge/system-knowledge.md` +
`knowledge/known-issues.md` antes de escribir (para no pedir algo que ya se sabe que es un gap
conocido), completa el template (`docs/_templates/hu.template.md`), y autochequea contra los 6
criterios de `core/dor/dor-core.md` + el 7mo del adaptador `jira` activo antes de dar un veredicto
GO/NO-GO. Las 50 skills de PM (`.claude/skills/` — `create-prd`, `opportunity-solution-tree`,
`prioritization-frameworks`, etc.) están para apoyar el pensamiento previo a redactar, no
reemplazan este flujo.

## Ciclo de sprint (proceso real del equipo)

- **Ambientes**: Dev (solo devs) / QA (para probar, **no estable** — un fallo puede ser del
  ambiente, no del producto) / Prod (no se testea, salvo excepción).
- Sprints de 2 semanas. Planning: complejidad = `AVG(Dev+QA)` (a veces `MAX`).
- Semana 1: dev construye → se crean casos de prueba → se prueba en QA → se corre la regresión.
- Semana 2: pruebas manuales (deadline histórico jueves 16hs ARG) → viernes Review (feature lista
  para pasar a Prod).
- **La automatización de QA va un sprint detrás** de su desarrollo/pruebas manuales — no se
  automatiza en el mismo sprint en que se construyó. Si algo "todavía no está automatizado" en un
  sprint reciente, esto es la explicación esperada, no una demora anormal.
- Un ticket puede quedar "atascado" en `Pending Validation` con la subtarea "Deploy a Prod" en
  Backlog — significa exactamente eso (ya validado, esperando el deploy), no un error.

## Reportar un bug encontrado fuera de una sesión formal de QA

Skill `squad-bug-report` — clasifica primero si es un problema de ambiente ya conocido
(`knowledge/known-issues.md`) antes de armar el reporte; nunca crea el Defect sin preview + OK
explícito.
