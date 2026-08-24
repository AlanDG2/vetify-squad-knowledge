# Interfaz de Ticket-Manager (contrato agnóstico)

> Adaptado de `vetify-automation/automation/adapters/ticket-manager.interface.md`. Las skills de
> este repo llaman a **estas operaciones**, nunca a un gestor concreto. Cambiar de gestor = escribir
> un adaptador nuevo que cumpla este contrato.

## Cómo funciona

- Cada adaptador vive en `adapters/<nombre>/` y declara que cumple esta interfaz.
- Un solo adaptador está **activo** a la vez (`adapter.config.json` con `"active": true`).
- El adaptador `none` (activo hoy, Fase 1) implementa la interfaz como no-ops.
- El adaptador `jira` (Fase 3) se completa cuando el gate de DoR necesite `checkReadiness` en vivo.

## El contrato — operaciones (6 heredadas de `automation` + 4 nuevas de este proyecto)

| Operación | Entrada | Salida | Quién la usa | Fase |
|---|---|---|---|---|
| `fetchStory(id)` | id de HU | texto con CAs | skill `hu-epic-feature-authoring` | 3 |
| `listLinkedTests(id)` | id de HU | `[{key, title, status}]` | — (no aplica sin Xray) | — |
| `importTests(testsFile, id)` | ruta, id | `{created, skipped, errors}` | — (no aplica sin Xray) | — |
| `createDefect(bug)` | objeto bug | id del defect o null | skill `squad-bug-report` | 5 |
| `getDoDTicketCriteria()` | — | texto o "" | — (este repo usa DoR, no DoD) | — |
| `checkClosable(id)` | id de HU | `{closable, missing}` | — (equivalente de cierre, si aplica) | — |
| **`checkReadiness(id)`** *(nuevo)* | id de HU | `{ready: bool, missing: [criterios]}` | gate de DoR | 3 |
| **`createStoryDraft(payload)`** *(nuevo)* | HU estructurada | id/borrador creado (con aprobación humana previa) | skill `hu-epic-feature-authoring` | 5 |
| **`listEpicChildren(epicId)`** *(nuevo)* | id de épica | lista de HUs hijas | skill `knowledge-lookup` | 5 |
| **`addComment(key, text)`** *(nuevo, 2026-08-24)* | key de issue existente, texto | `void` (lanza si falla) | skill `squad-task-authoring` | 5 |

## Reglas del contrato

1. **Las skills nunca mencionan un gestor concreto** — llaman a la operación agnóstica.
2. **El adaptador `none` siempre debe existir y funcionar.**
3. **Toda escritura al gestor pide OK explícito del usuario antes de ejecutarse** — sin excepción,
   ni para `createStoryDraft` ni para ninguna operación nueva que se agregue. Mismo principio no
   negociable que en `automation/jira/update-rules.md`.
4. **Credenciales en `.env`** (gitignored), nunca en el código del adaptador.
5. **Estado real, no asumido.** Si un adaptador no puede consultar el gestor en vivo, debe
   devolver un marcador "no verificado", nunca inventar estado.
