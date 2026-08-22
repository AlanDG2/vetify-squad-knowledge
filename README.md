# vetify-squad-knowledge

Hub de conocimiento compartido para el squad Betify/Mascotas (Vetify + Iké Asistencia) — PO/PM/SM,
devs, y QA. Ver [`CLAUDE.md`](CLAUDE.md) para qué es esto y [`AGENTS.md`](AGENTS.md) para
navegación por rol.

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

Fase 1 de 5 (scaffold + semilla). Ver `knowledge/decision-log.md` para el plan completo de fases.
