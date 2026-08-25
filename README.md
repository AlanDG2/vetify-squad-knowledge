# vetify-squad-knowledge

Hub de conocimiento compartido para el squad Betify/Mascotas (Vetify + Iké Asistencia) — PO/PM/SM,
devs, y QA.

## Qué es esto y para qué sirve (leer esto primero, sea cual sea tu editor/IA)

Antes de este repo, el onboarding dependía de que alguien estuviera disponible para explicar el
sistema, las HUs llegaban a desarrollo con alcance ambiguo o contradiciendo el diseño, y los devs
no tenían forma estructurada de decirle a QA qué cambiaron y cómo probarlo. Este repo junta:

- **`knowledge/`** — qué es el producto, cómo funciona de verdad el sistema (verificado contra
  código real, no supuesto), decisiones ya tomadas, y qué se trabajó en cada sprint.
- **`core/dor/`** — un checklist de "¿esta HU está lista para pasar a desarrollo?" (Definition of
  Ready), para que alcance/fuera-de-alcance/criterios de aceptación no queden ambiguos.
- **`docs/_templates/`** — prompts listos para pegarle a **tu propio asistente de IA** (Claude
  Code, Cursor, Copilot Chat, JetBrains AI, el que uses) cuando termines una HU, para dejarle a QA
  un "qué hice / cómo probarlo" claro.
- **`.claude/skills/`** — ayudas que se activan solas **si tu asistente de IA es Claude Code**
  (busca conocimiento, redacta HUs/bugs con estándar, etc.). Si usás otra herramienta, esa parte
  no se activa sola — pero todo lo de arriba (`knowledge/`, `core/dor/`, los prompts de
  `docs/_templates/`) es texto plano que podés leer vos o pegarle a cualquier IA igual.

**Si cambiás de editor/IA seguido**: lo único que depende de Claude Code específicamente son las
skills. El resto (por qué existe este repo, qué HU está lista, qué prompt pegarle a tu IA) está
en archivos de texto normales — funcionan clonando el repo y leyéndolos, sin importar qué
herramienta tengas abierta ese día.

Para navegación más detallada por rol: [`AGENTS.md`](AGENTS.md). Para el índice pensado para
Claude Code específicamente: [`CLAUDE.md`](CLAUDE.md).

## Setup

No requiere instalación de dependencias todavía — es documentación + skills consumidos por un
asistente de IA (Claude Code u otro). Si más adelante `adapters/jira/` queda funcional, va a
necesitar las mismas variables de entorno que `adapters/jira/README.md` documente.

```bash
node core/validate/validate-control-plane.mjs   # valida que el control-plane esté completo
```

## Relación con `vetify-automation/automation`

Este repo es hermano de `vetify-automation/automation` (automatización QA Playwright) — no un
fork. `automation` sigue siendo donde se produce el conocimiento verificado (tests reales, código,
Jira, GitLab); este repo es donde ese conocimiento se generaliza y consume por el resto del squad.
El contenido de `knowledge/` llega acá vía **promoción explícita** (`scripts/promote-knowledge.mjs`),
nunca por copia automática silenciosa — ver `knowledge/promotion-log.ndjson` para el historial de
qué se promovió y cuándo.

## Estado

Las 5 fases del scaffold inicial están completas — en uso real por el squad desde 2026-08-24
(pusheado a `git@gitlab.com:alan-ike/vetify-squad-knowledge.git`). Ver `knowledge/decision-log.md`
para el historial completo de decisiones.
