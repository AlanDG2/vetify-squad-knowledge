# Estado actual del proyecto (arranque del agente)

> Fuente de arranque por sesión. Se lee primero al empezar, para no depender solo del chat.

- **Proyecto**: `vetify-squad-knowledge` — hub de conocimiento compartido del squad Betify/Mascotas
  (Vetify + Iké Asistencia). Hermano de `vetify-automation/automation` (QA automation, Playwright)
  — no un fork, un proyecto separado que referencia al otro cuando necesita evidencia.
- **Quién escribe hoy**: solo QA (vía `scripts/promote-knowledge.mjs`, ver `AGENTS.md` regla 2).
  PO/PM/SM y devs consumen y usan skills, no editan `knowledge/` directo todavía.
- **Gestor de tickets**: adaptador `none` activo por ahora (`adapters/jira/` existe pero incompleto
  — se termina en la Fase 3 cuando el gate de DoR necesite `checkReadiness` en vivo).
- **Fase actual**: 1 de 5 (scaffold + semilla). Ver `decision-log.md` para el plan completo.
- **Regla de evidencia**: no afirmar que algo "ya está" en este repo sin haber corrido
  `node core/validate/validate-control-plane.mjs` o leído el archivo real — igual que en
  `automation`, no asumir desde memoria de una sesión vieja.
