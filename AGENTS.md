# AGENTS.md — Navegación (vetify-squad-knowledge)

> Mapa de decisión: cuándo usar qué, según quién sos y qué necesitás. `CLAUDE.md` es el índice;
> este archivo es la navegación. No se auto-carga — cero costo hasta referenciarse.

## 🎯 Decision tree por rol

### Soy nuevo en el squad / necesito onboarding
1. Leer `knowledge/project-context.md` (producto, organigrama, arquitectura de repos).
2. Leer `knowledge/glossary.md` (términos del dominio — capitado, adquiriente, reintegro, etc.).
3. Leer `knowledge/system-knowledge.md` (cómo funciona el sistema realmente, verificado — no
   asunciones de diseño).
4. Si sos dev, ver `docs/_templates/dev-repo-context-for-qa.prompt.md` y
   `docs/_templates/dev-hu-testing-note.prompt.md` para lo que se espera de vos hacia QA.

### Soy PO/PM/SM y voy a redactar una HU/epic/feature
1. Skill `hu-epic-feature-authoring` — ya construida (Fase 3).
2. Consulta sola `knowledge/system-knowledge.md` + `knowledge/known-issues.md` antes de que
   escribas nada, y autochequea contra los 7 criterios de `core/dor/dor-core.md` +
   `adapters/jira/dor-ticket.md`.
3. El hook `.claude/hooks/dor-preflight-check.sh` te recuerda el checklist antes de cada
   respuesta — es un recordatorio, no un bloqueo técnico (ver `knowledge/decision-log.md`).

### Soy dev y terminé una HU
1. Usar `docs/_templates/dev-hu-testing-note.prompt.md` para redactar la sección "Para QA" de tu
   MR (si el repo ya tiene instalado `docs/_templates/gitlab-mr-template-para-qa.md`, la sección
   ya está precargada).
2. El borrador de comentario para Jira se revisa y se pega a mano — nunca se publica solo.

### Necesito saber si algo ya está documentado / dónde buscar
1. Skill `knowledge-lookup` — ya construida (Fase 4).
2. Mientras tanto (o si el skill no aplica a tu pregunta): `knowledge/system-knowledge.md`
   (funcional/técnico) vs. `knowledge/project-context.md` (organizacional/arquitectura) vs.
   `knowledge/known-issues.md` (gaps de ambiente conocidos, no bugs de producto).

## 🧩 Inventario de skills (a construir por fase — ver `knowledge/decision-log.md`)

| Skill | Rol | Fase | Estado |
|---|---|---|---|
| `hu-epic-feature-authoring` | PO/PM/SM | 3 | ✅ Construida |
| `knowledge-lookup` | Devs | 4 | ✅ Construida |
| `squad-bug-report` | Devs/no-QA | 5 | ✅ Construida |
| `squad-task-authoring` | Devs/no-QA | 5 | ✅ Construida |

### Skills de PM (46 + 4, adaptadas de `phuryn/pm-skills`, ver `.claude/skills/THIRD-PARTY-NOTICES.md`)

Traídas 2026-08-23 para llenar un hueco real: hasta ese momento no había nada acá para
descubrimiento/estrategia/ejecución de producto, solo autoría de HU + el gate de DoR. Cargan
on-demand igual que el resto — no hace falta memorizar los 50 nombres, alcanza con saber que
existen 5 categorías:

| Categoría | Cuántas | Para qué (ejemplos) |
|---|---|---|
| Descubrimiento (`pm-product-discovery`) | 13 | `opportunity-solution-tree`, `brainstorm-ideas-new`, `prioritize-features` |
| Estrategia (`pm-product-strategy`) | 12 | `product-vision`, `swot-analysis`, `value-proposition` |
| Ejecución (`pm-execution`) | 16 | `create-prd`, `user-stories`, `retro`, `sprint-plan`, `stakeholder-map` |
| Analítica (`pm-data-analytics`) | 3 | `ab-test-analysis`, `cohort-analysis`, `sql-queries` |
| Auditoría de código con IA (`pm-ai-shipping`) | 2 | `intended-vs-implemented`, `shipping-artifacts` |
| Sueltas (de otros plugins, cherry-pick) | 4 | `north-star-metric`, `customer-journey-map`, `user-personas`, `user-segmentation` |

## 👁️ Quién lee qué (para no cargar a nadie con más de lo que necesita)

| Rol | Lee/usa | NO necesita |
|---|---|---|
| **Dev** | Los 3 prompts de `docs/_templates/` (`dev-*`) + `knowledge/system-knowledge.md` para el módulo que toca + skill `knowledge-lookup` | `automation` completo (Playwright/POMs no le sirven), `core/dor/`, skill de autoría de HU |
| **PO/PM/SM** | `knowledge/project-context.md`, `knowledge/known-issues.md`, `knowledge/system-knowledge.md`, skill `hu-epic-feature-authoring`, `core/dor/dor-core.md`, las skills de PM de arriba | Detalle de implementación de `automation` (tests, POMs) — si necesita evidencia de un comportamiento, pedirla a QA en vez de ir a leer el código |
| **QA** | Todo — es quien produce y promueve el conocimiento (`scripts/promote-knowledge.mjs`) | — |
| **Nuevo en el squad (cualquier rol)** | Ver "Soy nuevo en el squad" arriba — 3 archivos, en ese orden | Todo lo demás, hasta que su rol específico lo requiera |

## 🚦 Reglas duras (NO negociables)

1. 🚫 **NUNCA escribir en Jira de forma autónoma sin aprobación humana explícita** — ni desde este
   repo ni desde ningún skill que se construya acá. Mismo principio que `automation/jira/update-rules.md`;
   se decidió explícitamente en contra de que la IA de un dev publique comentarios sola (ver
   `knowledge/decision-log.md`).
2. 🚫 **NUNCA que nadie más que QA edite `knowledge/` directamente** mientras las skills de
   autoría no estén probadas (decisión vigente, ver `knowledge/decision-log.md` — reabrir cuando
   corresponda).
3. 🚫 **NUNCA asumir que un archivo de `automation` está actualizado acá.** Este repo solo tiene lo
   que se promovió explícitamente vía `scripts/promote-knowledge.mjs` — si algo parece faltar o
   viejo, puede ser simplemente que todavía no se promovió, no un error.
4. ✅ **SIEMPRE que se promueva conocimiento desde `automation`, dejar la cabecera de procedencia**
   (`<!-- promovido desde automation, HU <id>, <fecha> -->`) y una línea en
   `knowledge/promotion-log.ndjson`.

## 🔌 Gestor de tickets

Igual patrón que `automation`: `adapters/ticket-manager.interface.md` (contrato agnóstico) +
`adapters/jira/` + `adapters/none/`. **`jira` está completo desde la Fase 5**: `checkReadiness`,
`fetchStory`, `listEpicChildren`, `createStoryDraft`, `createDefect` — todas reales, las dos
últimas bajo el guardrail de escritura (`adapters/jira/update-rules.md`, sin excepciones). Requiere
un `.env` propio de este repo (ver `.env.example`) — nunca reutilizar un secreto copiado a mano de
`automation` sin decidirlo explícitamente.

## 📁 Estructura

Ver `CLAUDE.md` §"Mapa de carpetas".
