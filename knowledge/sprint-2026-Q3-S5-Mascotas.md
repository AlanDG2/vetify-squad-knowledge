# Sprint 2026-Q3-S5-Mascotas (24/08 → 04/09/2026) — EN CURSO, no cerrado

> ⚠️ **A diferencia de `sprint-2026-Q3-S4-Mascotas.md`, este sprint está activo** — arrancó el
> 2026-08-24, el mismo día que se trajo este snapshot. Los estados de acá van a quedar viejos
> rápido; para el estado real de un ticket puntual, consultar Jira en vivo, no este archivo.
> Traído de Jira (`IMAS Scrum Board`, sprint id `3138`) el 2026-08-24 — **32 ítems de primer
> nivel** (se filtraron 155 subtareas de ejecución).

## 🐾 Reintegros — sigue siendo el bloque más grande, ahora con más bugs

La épica `IMAS-4101` (SISE→Nexus) continúa del sprint pasado, con **3 tickets de bugs nuevos** que
no estaban la vez anterior:

| Ticket | Título | Estado |
|---|---|---|
| `IMAS-4103` / `4104` / `4124` | C/D/E — Alta/Cierre/Notas Nexus (siguen igual que el sprint pasado) | 🟡 In Validation |
| `IMAS-4092` | B — Obtener Historial Servicios Auxiliares | 🔴 Bloqueado (sigue igual) |
| `IMAS-3923` | Reintegro sugerido usa total de factura (distribución de líneas) | 🟡 Pending Validation |
| **`IMAS-4354`** | **[Reintegros Calidad] Rechazo de expediente falla (BUS-005): Nexus pets/refund requiere clCuenta** | 🟡 En Progreso — **este es el bug que QA reprodujo de forma independiente y documentó como `BUG-015` en `automation`, 3 días después de que dev lo cargara** |
| `IMAS-4279` | Bug: Reintegros bloqueado (400 VAL-002) por documento con formato inválido en la cuenta | 🟡 In Validation — **coincide con `BUG-007` ya documentado en `automation`** |
| `IMAS-3527` | Incidente: no impactan en SISE los datos/estados del cliente — **marcado explícitamente "depende de la migración Nexus"** | 🟡 In Validation |
| `IMAS-4343` | **[Reintegros Calidad] Roadmap de Estabilización** — ticket nuevo, parece agrupar el trabajo de estabilizar Calidad tras los bugs de arriba | 🟡 Tareas Por Hacer |

**Lectura**: Reintegros no solo no cerró del sprint pasado — sumó 3 bugs más y un ticket de
"roadmap de estabilización", lo cual sugiere que el equipo ya reconoce que esto necesita un
esfuerzo dedicado, no solo parches puntuales.

## 📞 Nueva Videollamada — casi todo cerrado, un tema nuevo aparece

Del sprint pasado solo sigue abierto `IMAS-4090` (capacitación CDS/Customer, Tareas Por Hacer).
Aparece un tema nuevo: **`IMAS-4350`** — "[Límite Videollamada] Diseño de experiencia para
videollamadas limitadas por producto" (En Progreso, Hernán Casabella) — sugiere una funcionalidad
nueva de límites de uso por plan. `IMAS-4309` (corrección de horario en rango Noche) quedó
Cancelado.

## 🔑 Reseteo de Contraseña — automatización sigue, y aparecen los bugs reales que la bloquean

`IMAS-3216`/`3215`/`3217` (automatización, los 3 productos) siguen "En Progreso" igual que el
sprint pasado. Lo nuevo: **3 bugs específicos del flujo, todos "Tareas Por Hacer"**:
- `IMAS-4272` — el correo para resetear la contraseña no llega.
- `IMAS-4198` — mensaje de error engañoso cuando el campo email está vacío.
- `IMAS-4199` — no valida el formato del email ingresado.

`IMAS-4198` y `IMAS-4199` **ya estaban documentados** en `system-knowledge.md` (sección Vetify
WebApp) como "Bug conocido 1/2" — confirma que siguen sin resolver, ahora con ticket formal en
este sprint. `IMAS-4272` es nuevo, no estaba documentado todavía.

## 📱 QA Mobile — trabajo propio de Alan

**`IMAS-4341`** — "Automatización QA Mobile — Cobertura funcional de la app Vetify (Android)" (En
Progreso, asignado a Alan) — coincide con la rama de trabajo activa
(`feature/qa-mobile-validation-ike-access-control`) en `automation`.

## 💳 MDP / Estado de Cuenta — tema nuevo, todavía en definición

`IMAS-3778` ([MDP] Definición de Solución Técnica, Tareas Por Hacer, Oscar Tello) y `IMAS-4348`
([MDP] Diseño de Estado de Cuenta, Tareas Por Hacer, Hernán Casabella) — ambos recién arrancando,
sin desarrollo todavía. "MDP" no está definido en `glossary.md` — **confirmar con el equipo qué
significa antes de asumir**.

## 🏥 Webapp Prestadores / Veterinarias

`IMAS-4352` (aprobación Figma de info de veterinarias MVP, Tareas Por Hacer) y `IMAS-4327`
("[Webapp de prestadores] Visualizar Carencia", Historia, Tareas Por Hacer, Belen Gwizdala) —
continuación del discovery del sprint pasado (`IMAS-4187`). `IMAS-4326` (actualizar mapa de
prestadores y PDF) también Tareas Por Hacer.

## 🚨 Otros

- `IMAS-3742` (usuarios solo-Vetify acceden a Iké webapp) sigue "En Progreso", sin resolver desde
  el sprint pasado.
- `IMAS-4313` ([Diseño] Credenciales — indicar plan asociado durante la carga, En Progreso).
- `IMAS-4356` (banner Cooper en WebApp, reemplazo de "vetify+", Tareas Por Hacer).
- `IMAS-4408` ([Bajas] la webapp mantiene la credencial activa sin plan activo, Tareas Por Hacer).
- `IMAS-4349` ([Límite por servicio] análisis de solución técnica, Tareas Por Hacer) — posible
  relación con `IMAS-4350` (límite de videollamadas) — **a confirmar, no asumido**.
- `IMAS-2292` (campaña relanzamiento webview) y `IMAS-3610`/`IMAS-4342` (landing de performance +
  pasaje a prod) continúan del sprint pasado.

## Lectura honesta (24/08, día 1 del sprint)

De 32 ítems: **10 En Progreso**, **1 Pending Validation**, **3 In Validation** (todo carryover de
Reintegros), **1 Bloqueado**, **1 Cancelado**, y **16 en "Tareas Por Hacer"** (recién arrancando o
sin arrancar) — es esperable en el día 1 de un sprint. El dato más importante para QA: Reintegros
sigue siendo el foco de mayor riesgo, ahora con un ticket explícito de "roadmap de estabilización"
que reconoce que el problema es más grande que bugs sueltos.
