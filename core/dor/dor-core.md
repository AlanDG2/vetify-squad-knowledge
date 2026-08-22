# DoR Core — Definition of Ready (criterios universales)

> Estos **6 criterios universales** aplican a toda HU/feature/epic, sin importar el gestor de
> tickets. Si hay un adaptador activo con criterios extra, se suman desde
> `adapters/<activo>/dor-ticket.md` — igual patrón que el DoD de `automation`
> (`core/dod/dod-core.md`), pero apuntado a **antes** de pasar a desarrollo, no al cierre.

Una HU está **"lista" (Ready)** si y solo si cumple los siguientes criterios **simultáneamente**:

## Los 6 criterios universales

1. **Objetivo/Descripción explícita.** La HU tiene un párrafo de contexto real (por qué existe, qué
   problema resuelve) — no solo un título. Un título sin descripción no es una HU lista.
2. **Criterios de aceptación atómicos y verificables.** Cada CA describe una condición
   comprobable, sin adjetivos vagos ("funciona bien", "se ve correcto"). Si un CA no se puede
   convertir en un test/paso concreto, no es un CA válido todavía.
3. **Alcance y Fuera de alcance, ambos explícitos.** No alcanza con que el alcance esté implícito
   en los CAs — tiene que existir una sección "Fuera de alcance" aunque diga "N/A". Este es el gap
   más confirmado por QA en la práctica (ver `knowledge/known-issues.md`).
4. **Diseño referenciado o su ausencia justificada.** Link a Figma presente y no contradicho por
   los CAs, o una nota explícita de que esta HU no requiere diseño. "No hay Figma" silencioso no
   cumple este criterio.
5. **Vinculada a su épica.** Ninguna HU queda suelta — coincide con el acuerdo de equipo ya
   documentado en `knowledge/project-context.md`.
6. **Dependencias/bloqueos conocidos, identificados.** Si esta HU depende de otra o la bloquea,
   está explícito — no se descubre recién en refinamiento.

## Regla dura

Si falta **cualquiera** de los criterios aplicables (estos 6 + los del adaptador activo) → la HU
**NO está lista para desarrollo**. Es "casi lista" o "no cumple". **NUNCA inflar el estado:** si un
criterio no se cumple, decirlo honesto antes de que se pregunte — mismo principio que el DoD de
`automation`.

## Cómo se verifica

- Criterios 1-4 y 6 → lectura/análisis de la HU (skill `hu-epic-feature-authoring`).
- Criterio 5 → si hay adaptador de tickets activo con soporte, `checkReadiness(id)` lo verifica en
  vivo (ver `adapters/jira/dor-ticket.md`); sin adaptador, verificación manual.

## Nota de rigor (decisión vigente, ver `knowledge/decision-log.md`)

Este gate **arranca como recordatorio**, igual que el DoD de `automation` hoy — un hook que
inyecta este checklist antes de cada respuesta, sin bloquear técnicamente nada. Depende de que
quien redacta/revisa lo tome en serio. Evaluar endurecerlo (ej. bloquear una transición de Jira)
recién cuando `checkReadiness()` sea confiable y el squad ya lo esté usando activamente.
