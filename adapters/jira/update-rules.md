# Guardrail de escrituras Jira (adaptado de `automation/jira/update-rules.md`)

> Aplica a **toda** operación de `adapters/jira/client.mjs` que escriba en Jira:
> `createStoryDraft`, `createDefect`. Sin excepción, sin importar qué skill la invoque.

## Secuencia obligatoria

1. **Leer** el estado actual (ej. `fetchStory(id)` antes de crear un draft relacionado, o
   `getIssue` del padre antes de un defect).
2. **Preview**: mostrarle a la persona el contenido exacto que se va a escribir — resumen,
   descripción, a qué épica/padre se linkea — antes de ejecutar nada.
3. **OK explícito de una persona.** No alcanza con que "la HU se ve bien" a criterio de la IA —
   tiene que haber una confirmación real. El propio hecho de correr el comando CLI con argumentos
   reales cuenta como esa confirmación (mismo principio que `automation`), pero la skill que lo
   invoca debe haber mostrado el preview ANTES en la misma conversación.
4. **Ejecutar** — recién ahí llamar a `createStoryDraft`/`createDefect`.
5. **Verificar** — confirmar que el issue se creó de verdad (`getIssue` del key devuelto), no
   asumir éxito solo porque no tiró excepción.
6. **Loguear** — cada intento (éxito o error) ya queda en `adapters/jira/sync-log.ndjson`
   automáticamente (lo hace la propia función, no hace falta un paso manual).

## Por qué existe (no es burocracia)

Esta es la razón directa por la que se descartó la idea de que la IA de un dev publique
comentarios en Jira de forma autónoma (ver `knowledge/decision-log.md`, entrada de creación del
proyecto). Cualquier escritura nueva que se agregue a este adaptador en el futuro hereda esta
misma disciplina — no hay una versión "más simple" para casos que parezcan de bajo riesgo.

## Qué NO hacer nunca

- No crear un issue "para probar" con datos falsos en un proyecto real de Jira.
- No reintentar una escritura fallida sin mostrar de nuevo el preview — el estado pudo haber
  cambiado entre el primer intento y el reintento.
- No desvincular o borrar un link para "resolver" un bloqueo de DoR/DoD — corregir la causa real.
