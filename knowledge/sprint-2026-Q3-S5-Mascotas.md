# Sprint 2026-Q3-S5-Mascotas (24/08 → 04/09/2026) — EN CURSO, no cerrado

> ⚠️ **A diferencia de `sprint-2026-Q3-S4-Mascotas.md`, este sprint está activo** — arrancó el
> 2026-08-24, el mismo día que se trajo este snapshot. Los estados de acá van a quedar viejos
> rápido; para el estado real de un ticket puntual, consultar Jira en vivo, no este archivo.
> Traído de Jira (`IMAS Scrum Board`, sprint id `3138`) el 2026-08-24 — **32 ítems de primer
> nivel** (se filtraron 155 subtareas de ejecución). **Refrescado 2026-08-28 (día 5): 235 issues
> totales → 24 de primer nivel + 211 subtareas** — la baja en top-level y suba en subtareas es
> variación normal de alcance del sprint, no investigada línea por línea.

## 🐾 Reintegros — sigue siendo el bloque más grande, ahora con más bugs

La épica `IMAS-4101` (SISE→Nexus) continúa del sprint pasado, con **3 tickets de bugs nuevos** que
no estaban la vez anterior:

| Ticket | Título | Estado |
|---|---|---|
| `IMAS-4092` / `4103` / `4104` | B/C/D — Historial/Alta/Cierre Nexus | 🟡 In Validation — **QA armó casos de prueba formales completos el 2026-08-28 para las 3** (nunca los habían tenido) — ver `system-knowledge.md` § Reintegros. Mismo hallazgo en las 3: la cuenta Capitado de referencia del equipo funcionó el 21/08 y el 26/08 (evidencia de dev) pero **hoy no puede iniciar un reintegro nuevo** (`/mascotas` devuelve el registro con campos de identidad en `null`) |
| `IMAS-3923` | Reintegro sugerido usa total de factura (distribución de líneas) | 🟡 Pending Validation |
| **`IMAS-4354`** | **[Reintegros Calidad] Rechazo de expediente falla (BUS-005): Nexus pets/refund requiere clCuenta** | 🟡 **Pending Validation** (reasignado a Mariana Navarro) — QA reprodujo el bug de forma independiente 2 veces más el 2026-08-28 (contradice una captura "204 exitoso" de dev del 26/08) y **aisló la causa raíz en vivo: es 100% de `reintegros-backend`, Nexus/Core acepta el rechazo directo sin problema** (confirmado con una llamada directa a la API de Nexus) |
| `IMAS-4279` | Bug: Reintegros bloqueado (400 VAL-002) por documento con formato inválido en la cuenta | 🟡 **En Progreso** (reasignado a Mariana Navarro) — **coincide con `BUG-007` ya documentado en `automation`**, reconfirmado 3 veces más el 2026-08-28 en otro pool de cuentas y 2 endpoints más |
| `IMAS-3527` | Incidente: no impactan en SISE los datos/estados del cliente — **marcado explícitamente "depende de la migración Nexus"** | 🟡 In Validation |
| `IMAS-4343` | **[Reintegros Calidad] Roadmap de Estabilización** — agrupa el trabajo de estabilizar Calidad; 3 subtareas (Análisis técnico, Crear Roadmap, Nutrir Backlog), ninguna arrancada todavía | 🟡 Tareas Por Hacer |
| `IMAS-4471` | Mejora — hoy Operación cierra a mano los expedientes en "Pendiente de pago" (pasa por Anulado → Aprobado/Rechazado en SISE) | 🆕 Tareas Por Hacer |
| `IMAS-4472` | **ARCA no funciona ni en QA ni en Producción** — contradice el supuesto ya documentado ("funciona en Producción, no reportar salvo que falle ahí también"); no confirmado de forma independiente, el ticket no trae evidencia propia todavía | 🆕 Tareas Por Hacer |
| `IMAS-4473` | En notas de rechazo, "Tipo de Reembolso" muestra "Detalle y Descripción" en vez de "Motivo" | 🆕 En Progreso (Paula Scalzo) |
| `IMAS-4474` | Finanzas necesita más motivos de rechazo (hoy solo tiene "Datos inconsistentes") — coincide con lo que QA ya había confirmado como comportamiento actual | 🆕 Tareas Por Hacer |
| `IMAS-4475` | Traslado de mascota: el tope figura siempre $0 al validar contra SISE — posible relación con el `502/BUS-006` ya documentado para esa misma categoría, sin confirmar si es la misma causa | 🆕 Tareas Por Hacer |
| `IMAS-4476` | No se pueden aprobar 2+ gastos cargados juntos — `decision-calidad` falla ("expense type amount before approval to finance"), expediente de ejemplo real `3300-1` en QA | 🆕 Tareas Por Hacer |

**Lectura (actualizada 2026-08-28, día 5)**: Reintegros sumó **6 bugs/mejoras más** desde el
snapshot del día 1 (todos bajo el paraguas de `IMAS-4343`), y el bug insignia (`IMAS-4354`) tuvo
un ciclo completo de "parecía arreglado → QA lo retesteó → seguía roto → QA aisló la causa raíz
exacta" en un solo día — el equipo ya reconoce que esto necesita un esfuerzo dedicado, no solo
parches puntuales, y ahora hay evidencia técnica concreta (no solo intuición) de dónde está el
problema real.

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
- `IMAS-4356` (banner Cooper en WebApp, reemplazo de "vetify+") — **estado real: "Pending
  Validation" (reconfirmado en vivo en Jira 2026-08-28), no "Tareas Por Hacer"**: QA probó en vivo
  2026-08-26/27/28 y encontró que el mecanismo funciona (B2C/OSDE Adquirente perfil incompleto →
  "Vetify PLUS", OSDE Capitado perfil completo → "Cooper"), pero encontró 2 bugs en el camino —
  `IMAS-4463` (menú lateral no agrega la entrada Cooper, queda un hueco) e `IMAS-4464` (causa raíz
  real de la inconsistencia reportada originalmente: `category/overview`/`plans/engage/{dni}`
  devuelven 500 intermitente en QA, no es un bug de la feature en sí). Ambos "Blocks" a esta HU,
  ambos siguen en Backlog (reconfirmado 2026-08-28). QA decidió esperar a que `IMAS-4464` esté
  estable antes de re-validar el resto de los casos. Detalle completo en `system-knowledge.md` §
  Vetify WebApp y `bugs-conocidos.md`/`known-issues.md`.
- `IMAS-4408` ([Bajas] la webapp mantiene la credencial activa sin plan activo) — **estado real:
  "In Validation" (reconfirmado en vivo en Jira 2026-08-28), no "Tareas Por Hacer"**. QA hizo el
  intake completo 2026-08-27/28 (la descripción real, con 12 criterios de aceptación sobre 3
  estados de plan, estaba en el custom field `customfield_11620`, no en `description` — ver
  `known-issues.md`). Bloqueado para verificación en vivo por QA: no hay ninguna cuenta de prueba
  con plan `Inactivo`/`Dado de baja` (el tag `UserTag.INACTIVE_PLAN` existe en el framework de
  `automation` pero ningún usuario del pool lo tiene, y no hay generador automático de esa
  condición) — pendiente de conseguir o generar una.
- `IMAS-4349` ([Límite por servicio] análisis de solución técnica, Tareas Por Hacer) — posible
  relación con `IMAS-4350` (límite de videollamadas) — **a confirmar, no asumido**.
- `IMAS-2292` (campaña relanzamiento webview) y `IMAS-3610`/`IMAS-4342` (landing de performance +
  pasaje a prod) continúan del sprint pasado — **`IMAS-3610` avanzó, ya NO está bloqueada**: los 3
  bugs de la landing `/salud-mascotas` que la bloqueaban (`IMAS-4439` logo del checkout mal
  direccionado, `IMAS-4447` cupón default incorrecto, `IMAS-4450` cobertura incompleta en el plan
  Emergencias) fueron corregidos por dev y confirmados por QA el 2026-08-27 — los 3 "Hecho"
  (reconfirmado en vivo 2026-08-28). La HU en sí pasó de "En Progreso" a **"Pending Validation"**
  (reconfirmado 2026-08-28), reasignada a Oscar Tello. Ver `bugs-conocidos.md`.

## Lectura honesta (24/08, día 1 del sprint)

De 32 ítems: **10 En Progreso**, **1 Pending Validation**, **3 In Validation** (todo carryover de
Reintegros), **1 Bloqueado**, **1 Cancelado**, y **16 en "Tareas Por Hacer"** (recién arrancando o
sin arrancar) — es esperable en el día 1 de un sprint. El dato más importante para QA: Reintegros
sigue siendo el foco de mayor riesgo, ahora con un ticket explícito de "roadmap de estabilización"
que reconoce que el problema es más grande que bugs sueltos.

## Lectura honesta, refresh 2026-08-28 (día 5 del sprint)

De 24 ítems de primer nivel: **7 Tareas Por Hacer**, **6 In Validation**, **6 En Progreso**, **3
Hecho**, **1 Backlog**, **1 Cancelado** (`IMAS-4464`, ver `bugs-conocidos.md`). Reintegros sigue
siendo, por lejos, el bloque de mayor riesgo — no solo no bajó de tamaño, sumó 6 tickets nuevos.
Lo más valioso de este día para el equipo: por primera vez hay una confirmación técnica exacta
(no solo "no funciona") de dónde vive el problema del bug insignia (`IMAS-4354`) — 100% en
`reintegros-backend`, Nexus/Core queda descartado. Áreas nuevas que aparecieron y todavía no se
investigaron desde QA: "Límite Videollamada" (`IMAS-4350`/`4349`, diseño casi terminado) y
"Webapp de prestadores — Visualizar Carencia" (`IMAS-4327`).
