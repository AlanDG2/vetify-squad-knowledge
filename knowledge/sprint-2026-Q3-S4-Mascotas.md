# Sprint 2026-Q3-S4-Mascotas (10/08 → 21/08/2026) — resumen real

> Traído en vivo de Jira (`IMAS Scrum Board`, sprint id `3100`, cerrado) el 2026-08-24. **52 ítems
> de primer nivel** (Historia/Tarea/Incidente Productivo/Error — se excluyeron 273 subtareas de
> ejecución tipo "Deploy a QA"/"Desarrollo", que son ruido de implementación, no HUs en sí).
> Agrupado por tema, no por orden de Jira — el objetivo es que alguien nuevo entienda rápido qué
> se trabajó, no que reemplace a Jira como fuente de verdad (los estados cambian; para el estado
> actual, consultar Jira en vivo).

## 🐾 Reintegros — migración SISE→Nexus (épica `IMAS-4101`)

El bloque más grande y mejor documentado del sprint — ver `system-knowledge.md` (`## Módulo:
Reintegros`) para el detalle técnico completo verificado contra código real.

| Ticket | Título | Estado fin de sprint |
|---|---|---|
| `IMAS-4143` | A — Feature Flag p/ Migración Reintegros | ✅ Hecho |
| `IMAS-4092` | B — Obtener Historial Servicios Auxiliares | 🔴 Bloqueado |
| `IMAS-4103` | C — Alta Nexus | 🟡 In Validation |
| `IMAS-4104` | D — Cierre Nexus | 🟡 In Validation |
| `IMAS-4124` | E — Notas Nexus | 🟡 In Validation |
| `IMAS-3923` | Reintegro sugerido usa total de factura cuando hay un solo tipo de gasto (conceptos no cubiertos) | 🟡 Pending Validation |

`IMAS-3923` es el ticket real detrás del mecanismo de "Distribución de factura" (tabla
`factura_linea`, invariantes de cuadratura, API de distribución/rechazo de líneas) ya documentado
en `system-knowledge.md`.

**Bugs de Reintegros del sprint** (ya resueltos, `Hecho`):
- `IMAS-4031` — Error al confirmar reintegro desde reintegros-backoffice en **producción**.
- `IMAS-4078` — Botón "Rechazar" en Calidad no funcionaba antes de validar factura con ARCA.
- `IMAS-3197` — CES (encuesta de satisfacción) al finalizar la carga de un reintegro.

**Tarjetas de diseño** (Hecho): `IMAS-3764` (incorporar CUIL/CUIT del cliente para el pago),
`IMAS-4125` (circuito de autorización de pagos en Finanzas).

**Nota de continuidad**: `IMAS-4092` sigue "Bloqueado" y `IMAS-4103`/`4104`/`4124` siguen "In
Validation" — es exactamente el trabajo que QA (`IMAS-4152`, subtarea de `4124`) siguió probando
después de cerrado este sprint (ver `docs/bugs/BUG-015...md` y `IMAS-4152...tests.md` en
`automation`, y `IMAS-4354`, el bug de rechazo-directo que dev ya había cargado el 21/08).

## 📞 Nueva Videollamada (épica `IMAS-2877`) — el otro bloque grande

Rediseño completo del flujo de agendamiento/gestión de videollamadas, todo `Hecho`:

| Ticket | Título |
|---|---|
| `IMAS-3549` | Comunicación a prestadores — nueva experiencia |
| `IMAS-4023` | Casuística especial — Error subir archivo |
| `IMAS-3174` | Rediseño solicitud de turno x 1 mascota (sin turno previo) |
| `IMAS-3889` | Rediseño solicitud de turno + 1 mascota (sin turno previo) |
| `IMAS-3909` | Casuística especial — con turno previo |
| `IMAS-3894` | Visualización, reprogramación, cancelación, edición de turno |
| `IMAS-3899` | Solicitud de videollamada sin credencial cargada |
| `IMAS-4258` | Validar UX-UI del circuito completo |

**Spillover** (seguían sin cerrar al fin del sprint): `IMAS-4090` (capacitación a CDS/Customer,
Tareas Por Hacer), `IMAS-4000` (implementación de CES para la experiencia, Tareas Por Hacer),
`IMAS-3904` (falla de sistema al agendar turno, Tareas Por Hacer).

## 🔑 Reseteo de Contraseña (épica `IMAS-1602`) — automatización, los 3 productos

`IMAS-3216` (OSDE Capitado), `IMAS-3215` (B2C Vetify), `IMAS-3217` (Flux Capitado) — los 3 "En
Progreso" al cierre del sprint. Coincide 1:1 con el gap ya documentado en `system-knowledge.md`:
**no hay infraestructura de lectura de casilla de correo** en ninguno de los 3 (`IMP-006` en
`automation`) — por eso las subtareas de automatización de estos 3 tickets quedan en Backlog.
`IMAS-2324` (análisis de ejecuciones contra versión mobile iOS/Android) también Hecho, relacionado.

## 🚨 Incidentes de Producción (no planificados, entraron al sprint por urgencia)

| Ticket | Título | Estado |
|---|---|---|
| `IMAS-3742` | Usuarios con planes solo-Vetify acceden a la WebApp de Iké | 🟡 En Progreso |
| `IMAS-3728` | Error en validación de token — webapp prestador | ✅ Hecho |
| `IMAS-4273` | Link de pago no funciona desde SISE/Contact Center | ✅ Hecho |
| `IMAS-4318` | Acceso a Bonda — caso puntual de una usuaria | ✅ Hecho |
| `IMAS-4274` | Checkout Vetify — pago Mercado Pago falla 404 con tipo doc. Cédula | 🔴 Bloqueado |
| `IMAS-4118` | La compra no vincula identidad si el tipo de documento no es DNI | 🟡 Tareas Por Hacer |
| `IMAS-4158` / `IMAS-4159` | Bugs de aviso de indisponibilidad (inconsistente entre pantallas / se auto-oculta) | ✅ Hecho |

`IMAS-3742` (control de acceso por plan) es el mismo que ya está documentado en detalle en
`system-knowledge.md` — el login de Iké falla igual para "cuenta sin plan Iké" y para "email
inventado", así que un rechazo ahí NO prueba por sí solo que el control de acceso funcione.

## 🏥 Webapp — Información de Veterinarias (`IMAS-4187`)

Trabajo grande de discovery/contenido (Hernán Casabella, Belén González) — todas sus ~12 subtareas
de contenido (`Hecho`) quedaron filtradas de esta lista por ser subtareas, pero el ticket padre
`IMAS-4187` y su hermano `IMAS-4248` (discovery info veterinarias) sí quedaron, ambos `Hecho`. Es
groundwork de diseño/contenido — no llegó todavía a una HU de desarrollo visible en este sprint.

## 📊 CX / Negocio / Varios (sin relación directa a QA)

`IMAS-2292` (campaña relanzamiento webview, En Progreso), `IMAS-4011` (armar CES en Power BI,
Hecho), `IMAS-3545` (identificar usuarios Hotjar reales, Hecho), `IMAS-2938`/`IMAS-3666`/`IMAS-3667`
(actualizaciones de landing OSDE/Flux, Hecho), `IMAS-4016` (firma corporativa para mails, Hecho),
`IMAS-3990` (seguimiento Agente IA semana 2, Cancelado), `IMAS-4162` (relevamiento flujo Salesforce
Agente IA, Tareas Por Hacer), `IMAS-3191` (monitoreo alta de usuario webapp, Tareas Por Hacer),
`IMAS-3996` (regularización de compras de testing en producción, Tareas Por Hacer), `IMAS-3610`
(landing de performance de conversión B2C, En Progreso), `IMAS-4288` (campanita de notificaciones
muestra encuestas duplicadas, Tareas Por Hacer), `IMAS-2637` (si Salesforce falla no deja finalizar
compra, Hecho).

## Lectura honesta del sprint

De 52 ítems de primer nivel: **~32 Hecho**, **~7 En Progreso/In Validation** (mayormente
Reintegros y los incidentes más recientes), **1 Bloqueado puro** (`IMAS-4092`) + 1 más marcado
Bloqueado (`IMAS-4274`), y **~8 Tareas Por Hacer** que no arrancaron. El bloque de Reintegros
(`IMAS-4101`) es, con diferencia, el que más spillover generó hacia el sprint siguiente — coincide
con ser también el que más atención de QA recibió después (`IMAS-4152`).
