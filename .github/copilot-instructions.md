# Instrucciones para GitHub Copilot — vetify-squad-knowledge

Este repo es el hub de conocimiento compartido del squad Betify/Mascotas (Vetify + Iké
Asistencia) — para PO/PM/SM, devs y QA. Antes de responder algo sobre este proyecto, leé:

1. **`README.md`** — qué es esto y para qué sirve (autocontenido, no asumas que ya lo leíste).
2. **`AGENTS.md`** — navegación por rol (qué archivo mirar según quién sos y qué necesitás).
3. Si sos dev y vas a pasar algo a QA: `docs/_templates/dev-hu-testing-note.prompt.md`.
4. Si necesitás entender cómo funciona el sistema real: `knowledge/system-knowledge.md`.

**Reglas que valen sin importar la herramienta**:
- No inventes contexto de negocio que no esté en `knowledge/` — si falta, preguntalo.
- Nunca publiques nada en Jira de forma autónoma (crear tickets, comentarios) — solo redactar y
  mostrar el borrador; la persona decide si lo publica.
- `.claude/skills/` son ayudas que se auto-cargan solo en Claude Code — si estás en Copilot,
  igual podés leer el contenido de esas skills como referencia de proceso, aunque no se activen
  solas.

Este archivo es un puente — el contenido real vive en `README.md`/`AGENTS.md`/`knowledge/`, no acá.
