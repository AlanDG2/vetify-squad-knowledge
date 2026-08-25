---
name: knowledge-lookup
description: Ayuda a encontrar rápido dónde vive una pieza de conocimiento del squad sin tener que leer todo el repo — a qué archivo ir según el tipo de pregunta, y qué tan fresca es esa información. Se invoca cuando alguien pregunta "¿esto ya está documentado?", "¿dónde busco X?", "¿esto ya se probó/se sabe?", o no sabe en qué archivo mirar.
---

# Búsqueda de conocimiento

## Principio

El costo de este proyecto solo se paga si encontrar algo acá es más rápido que preguntarle a una
persona. Este skill es el "índice" que hace eso posible — enrutar la pregunta al archivo correcto
en vez de hacer que alguien lea `knowledge/` entero.

## Tabla de enrutamiento

| La pregunta es sobre... | Ir a |
|---|---|
| Quién es quién, arquitectura de repos, viaje del usuario, cadencia de sprint | `knowledge/project-context.md` |
| Cómo funciona realmente el sistema (reglas de negocio, estados, endpoints, migraciones en curso) | `knowledge/system-knowledge.md` (buscar por `## Módulo: <nombre>`) |
| Un término del dominio (capitado, filecase, DoR, etc.) | `knowledge/glossary.md` |
| Un gap o limitante ya conocido (para no "descubrirlo" de nuevo) | `knowledge/known-issues.md` |
| Una decisión ya tomada y por qué (para no reabrir un debate viejo) | `knowledge/decision-log.md` |
| Qué se trabajó en un sprint pasado, quién, y qué quedó pendiente | `knowledge/sprint-<nombre>.md` (ej. `sprint-2026-Q3-S4-Mascotas.md`) — snapshot al cierre, no el estado actual |
| Contrato HTTP, catálogo de errores, env vars o seguridad de un servicio/repo puntual | `repos/00-indice.md` → el `.md` del servicio (19 repos relevados 2026-08-25) |
| Qué bugs de producto ya se conocen, abiertos o resueltos | `knowledge/bugs-conocidos.md` — estados "último conocido", confirmar en vivo si importa la precisión |
| Copy/textos/planes/precios de las landings públicas | `knowledge/contenido-institucional.md` |
| Qué se espera de un dev al terminar una HU | `docs/_templates/dev-hu-testing-note.prompt.md` |
| Si una HU está lista para pasar a desarrollo | `core/dor/dor-core.md` + skill `hu-epic-feature-authoring` |

## Procedimiento

1. Identificar qué tipo de pregunta es (tabla de arriba) y leer el archivo correspondiente.
2. Si es sobre `system-knowledge.md`, buscar el `## Módulo:` relevante — cada sección tiene su
   propia cabecera de procedencia (`<!-- promovido desde ... -->`) con la fecha real.
3. **Chequear frescura**: `grep` esa misma sección/HU en `knowledge/promotion-log.ndjson` para ver
   cuándo se promovió por última vez. Si pasó mucho tiempo o el módulo está en una migración activa
   (ej. Reintegros SISE→Nexus), decirlo explícitamente en la respuesta — no presentar información
   vieja como si fuera el estado actual sin más.
4. Si no se encuentra nada relevante, decirlo honesto — no inventar que "no existe" (ver regla
   dura 1) ni fabricar una respuesta plausible.

## Reglas duras

1. 🚫 **Un grep sin resultados NO es prueba de que algo no existe o no está documentado** — puede
   que simplemente todavía no se promovió desde `automation`, o que esté con otro nombre. Decir
   "no lo encontré en `knowledge/`, puede que no esté promovido todavía" — nunca "esto no existe".
2. 🚫 **NUNCA presentar contenido de `system-knowledge.md` como el estado actual sin chequear su
   fecha de promoción** — sobre todo en módulos marcados como "en migración" (ver
   `knowledge/known-issues.md`).
3. ✅ **Si la pregunta requiere evidencia que no está en `knowledge/`** (ej. un detalle de código
   muy específico), decir explícitamente que hace falta pedírselo a QA/`automation` en vez de
   adivinar — este repo es conocimiento ya promovido, no acceso en vivo al código.
