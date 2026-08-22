---
name: hu-epic-feature-authoring
description: Ayuda a PO/PM/SM a redactar o revisar una Historia de Usuario, feature o épica completa, usando el conocimiento acumulado del squad y autochequeando contra el gate de Definition of Ready antes de pasarla a desarrollo. Se invoca cuando alguien va a escribir, completar o revisar una HU/feature/epic nueva en Jira.
---

# Autoría de HU/Feature/Epic con gate de Definition of Ready

## Principio

La causa confirmada repetidas veces por QA de HUs que llegan incompletas a desarrollo (alcance
ambiguo, contradicciones con Figma, criterios no atómicos) no es falta de buena voluntad — es
falta de un chequeo explícito antes de dar la HU por terminada. Este skill provee ese chequeo,
apoyado en el conocimiento ya acumulado del squad para no repetir preguntas que ya tienen
respuesta documentada.

## Procedimiento

1. **Reunir contexto antes de escribir una palabra**: leer `knowledge/project-context.md`,
   `knowledge/glossary.md`, `knowledge/known-issues.md`, y la parte relevante de
   `knowledge/system-knowledge.md` para el módulo/área que toca esta HU. Si `known-issues.md` ya
   documenta un gap relacionado, no volver a "descubrirlo" en la HU — referenciarlo.
2. **Si ya existe un ticket parcial en Jira**, traerlo con `fetchStory(id)` del adaptador activo
   (cuando esté implementado — Fase 5) en vez de partir de cero. Hasta entonces, pedir el texto
   actual a quien la esté redactando.
3. **Redactar/completar usando `docs/_templates/hu.template.md`** — objetivo, alcance, fuera de
   alcance, CAs, diseño, dependencias, riesgos. No dejar ninguna sección vacía sin una nota
   explícita de "N/A" o "no aplica".
4. **Autochequear contra cada criterio de `core/dor/dor-core.md`** (los 6 universales), uno por
   uno, explícitamente — no un veredicto genérico de "se ve bien".
5. **Si el adaptador `jira` está activo**, correr `checkReadiness(id)` (`adapters/jira/client.mjs`)
   para el criterio 7 (vínculo con épica) — ver `adapters/jira/dor-ticket.md`. Si no se puede
   consultar en vivo, reportarlo como no verificado, nunca asumir que está OK.
6. **Reportar veredicto GO/NO-GO** con el detalle de qué falta (ver Output Contract abajo).

## Reglas duras

1. 🚫 **NUNCA marcar una HU como "lista para desarrollo" si falta cualquier criterio aplicable**
   (los 6 del core + los del adaptador activo) — mismo principio no negociable que el DoD de
   `automation`.
2. 🚫 **NUNCA crear o modificar el ticket en Jira sin aprobación humana explícita**
   (`createStoryDraft`, cuando exista — Fase 5). Este skill redacta y audita; no publica solo.
3. 🚫 **NUNCA inventar contexto de negocio que no esté en `knowledge/` ni en lo que la persona
   aportó** — si falta información, preguntarla, no completarla con una suposición razonable
   presentada como hecho.
4. ✅ **SIEMPRE contrastar el alcance de la HU contra `knowledge/known-issues.md`** antes de dar el
   veredicto — un gap ya conocido no debería sorprender en refinamiento.

## Output Contract

```
## Veredicto: <GO / NO-GO>

### Criterios universales (core/dor/dor-core.md)
1. Objetivo/Descripción — <OK / FALTA: ...>
2. CAs atómicos y verificables — <OK / FALTA: ...>
3. Alcance y Fuera de alcance — <OK / FALTA: ...>
4. Diseño referenciado o justificado — <OK / FALTA: ...>
5. Vinculada a su épica — <OK / FALTA: ...>
6. Dependencias/bloqueos identificados — <OK / FALTA: ...>

### Criterios del adaptador activo (si aplica)
7. Vínculo con épica verificado en vivo — <OK / FALTA / NO_VERIFICADO_EN_VIVO>

### Qué falta para pasar a GO
<lista concreta, o "nada — lista para desarrollo">
```
