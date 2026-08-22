# Adaptador `jira` — completo (Fase 5)

Implementa las 5 operaciones reales que este proyecto necesita: `checkReadiness`, `fetchStory`,
`listEpicChildren`, `createStoryDraft`, `createDefect`. `listLinkedTests`/`importTests` siguen
no-op a propósito (no hay Xray/Zephyr en este squad, igual que en `automation`).

## Reutilización de `automation`

Este cliente es una copia adaptada de
`vetify-automation/automation/scripts/jira/jira-client.mjs` (mismo esquema de auth, mismo helper
`jira()`, mismo `toDoc`/`extractText`) — no un `require`/`import` cross-repo.

**Nota de duplicación aceptada explícitamente**: la decisión de "referenciar, no incrustar"
`automation` aplica a tests/POMs (carpeta pesada, con historial propio), no a un cliente REST
genérico de ~200 líneas. Mantenerlo sincronizado a mano es una duplicación chica y consciente; la
salida si diverge de forma problemática es extraerlo a un paquete compartido — no hace falta hoy
con un solo mantenedor.

## Variables de entorno

`JIRA_BASE_URL`, `JIRA_EMAIL`, `JIRA_API_TOKEN`, `JIRA_PROJECT_KEY` (ver `.env.example`). **Nunca
copiar el `.env` real de `automation` sin decidirlo explícitamente** — cargar credenciales propias
de este repo.

## Guardrail de escrituras (no negociable, sin excepción)

`createStoryDraft` y `createDefect` escriben en Jira de verdad. Siguen exactamente
[`update-rules.md`](update-rules.md): leer → preview → **OK explícito de una persona** → ejecutar →
verificar → loguear (`sync-log.ndjson`, automático). Nunca autónomo — decisión ya tomada en
`knowledge/decision-log.md` tras descartar la idea de que la IA de un dev publique sola.
