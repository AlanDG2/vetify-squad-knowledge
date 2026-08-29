# Bugs conocidos (squad-wide)

> Resumen de los bugs de producto encontrados y documentados en `automation/docs/bugs/`
> (23 al 2026-08-28) — para que PO/PM/devs tengan visibilidad sin tener que abrir ese repo.
> **Los estados acá son los últimos conocidos al momento de esta promoción, no en vivo** — antes
> de tomar una decisión que dependa del estado exacto de uno, confirmar en Jira o pedirle a QA que
> lo re-verifique. El detalle completo (pasos, evidencia) de cada uno vive en el `.md` original.

## Abiertos, confirmados

| # | Jira | Título | Severidad | Último estado conocido |
|---|---|---|---|---|
| BUG-001 | `IMAS-4102` | Credencial no retoma videollamada tras completarla | Alto | Backlog (bloquea agendar si la mascota no tiene credencial) |
| BUG-003 | `IMAS-4119` | Detalle de turno sin estado y stale tras reprogramar | Medio | Backlog |
| BUG-004 | `IMAS-4118` | Tipo de documento ≠ DNI no vincula la compra a la cuenta | Alto | Confirmado en sprint activo, "Tareas Por Hacer" |
| BUG-005 | `IMAS-4272` | El correo de reseteo de contraseña no llega | Alto | Confirmado en sprint activo, "Tareas Por Hacer" — vinculado a `IMAS-3215`/`3216`/`3217` |
| BUG-006 | `IMAS-4274` | Checkout con "Cédula" como documento → 404, pago nunca se concreta | Alto | Confirmado, "Bloqueado" |
| BUG-007 | `IMAS-4279` | Reintegros bloqueado (400 VAL-002) por DNI con formato inválido en la cuenta | Alto | **En Progreso** (Mariana Navarro, pull de sprint 2026-08-28) — reconfirmado 3 veces más ese mismo día en 3 endpoints (`/mascotas`, `/cuentas-acreditacion`, `/expedientes`) y 2 pools distintos (`VETIFY_ADQUIRENTE`, `OSDE_CAPITADO`) |
| BUG-008 | `IMAS-4294` | Webapp Prestadores: "Cerrar sesión" no cierra la sesión de Auth0 | Alto — **riesgo de seguridad** (dispositivo compartido, ej. recepción de veterinaria) | Backlog |
| BUG-009 | `IMAS-4300` | App Android: banner de cookies tapado por la barra de navegación, imposible aceptar/rechazar | Alto | Backlog |
| BUG-012 | `IMAS-4324` | App Android: íconos de la barra de estado invisibles sobre la landing institucional | Bajo | Backlog |
| BUG-013 | `IMAS-4351` | Compra no asocia el plan si el DNI ya tiene cuenta existente | Medio | Sin HU padre, ver detalle |
| BUG-015 | `IMAS-4354` | Rechazo directo de Calidad (Reintegros) falla — requiere `clCuenta` de Nexus | Medio-Alto | **"Pending Validation"** — evidencia de dev (204 exitoso, 26/08) NO se sostuvo en retest independiente 2026-08-28 (2 expedientes, mismo 404 de siempre); **causa raíz confirmada en vivo ese mismo día: es 100% de `reintegros-backend`**, Nexus/Core acepta el rechazo directo sin problema (ver `system-knowledge.md` § Reintegros) |
| BUG-016 | `IMAS-4430` | Landing Flux Capitado: FAQ con copy de OSDE sin adaptar a la marca | Bajo-Medio | Recién creado (2026-08-25/26), Backlog — ver `knowledge/contenido-institucional.md` |
| BUG-017 | `IMAS-4431` | Vetify B2C: error 500 "Error al calcular precio del producto" al finalizar la compra | Crítico — bloquea el 100% de las compras confirmadas con datos/tarjeta válidos | Creado 2026-08-26, **Backlog** (reconfirmado en vivo en Jira 2026-08-28 — sigue sin resolver) |
| BUG-022 | `IMAS-4463` | OSDE Capitado: menú lateral pierde la entrada "Vetify PLUS" pero no la reemplaza por "Cooper" (queda un hueco) | Bajo-Medio | Creado 2026-08-28, **Backlog**, Blocks `IMAS-4356` — confirmado como bug genuino, no síntoma de `IMAS-4464`/`IMP-014` (ver `known-issues.md`) |
| BUG-023 | `IMAS-4464` | Vetify WebApp QA: `category/overview` y `plans/engage/{dni}` devuelven 500 intermitente, causa el banner Cooper/Vetify PLUS incorrecto y "No hay planes por el momento" | Alto — impedimento de ambiente, no de una feature puntual | **Cancelado** en Jira (pull de sprint 2026-08-28, sin comentarios que expliquen el cierre) — coincide con que dejó de reproducir en el retest, ver también `known-issues.md` (`IMP-014`) |

## Sin Jira todavía (pendiente de decisión)

| Título | Severidad | Notas |
|---|---|---|
| BUG-021 — OSDE Adquirente: la compra falla en el paso de pago con un error de backend crudo (no siempre el mismo mensaje) | Alto — bloquea el 100% de compras OSDE Adquirente y la generación de cuentas fresh de ese producto | Encontrado 2026-08-26/27 investigando `IMAS-4356`. QA cree que podría ya estar reportado — pendiente de confirmar antes de crear un Defect nuevo. Ver `docs/bugs/BUG-021-osde-adquirente-compra-falla-error-backend.md` en `automation`. |

## Resuelto

| # | Jira | Título |
|---|---|---|
| BUG-014 | `IMAS-4347` | Error 502 en auth al cargar planes (bloqueaba el 100% de las compras) — marcado "Hecho" 2026-08-25 |
| BUG-018 | `IMAS-4439` | Landing Salud Mascotas: el logo del checkout redirigía a la landing institucional en vez de volver a `/salud-mascotas` — **"Hecho"** (reconfirmado en vivo en Jira 2026-08-28; el `.md` original en `automation` todavía dice "Backlog" porque nunca se actualizó tras el cierre — no confiar en ese archivo para el estado) |
| BUG-019 | `IMAS-4447` | Landing Salud Mascotas: sin cupón en la URL aplicaba `VETIFY20` (1 mes) en vez del default `VETIFY20X3` (3 meses) — **"Hecho"** (reconfirmado en vivo 2026-08-28, mismo caveat que arriba sobre el `.md` desactualizado) |
| BUG-020 | `IMAS-4450` | Landing Salud Mascotas: plan Emergencias, fila "Diagnóstico por imagen" sin tope — **"Hecho"** (reconfirmado en vivo 2026-08-28; la duda adicional sobre cantidad 1 vs. 6/año se retractó — era contenido duplicado entre filas de Figma, no un gap real, ver `system-knowledge.md` si hace falta el detalle) |

**Con los 3 anteriores resueltos, `IMAS-3610` (landing de performance) ya no está bloqueada** —
pasó a "Pending Validation" en Jira (reconfirmado 2026-08-28). Ver `sprint-2026-Q3-S5-Mascotas.md`.

## No son bugs reales (retractados / reclasificados) — no asumir que están abiertos

- **BUG-002** — UUID crudo en pantalla de revisión: retractado, en duda, nunca filed.
- **BUG-010** — Upload oversize devuelve 500 crudo: reclasificado a mejora de robustez, no filed como Defect.
- **BUG-011** — "Ir a la web" no navega en mobile: retractado, era un falso positivo del emulador.

## Nota sobre `IMAS-4198`/`IMAS-4199` (reseteo de contraseña)

Estos 2 bugs (mensaje de error engañoso con campo vacío / sin validación de formato de email) no
tienen un `.md` propio en `docs/bugs/` — están documentados inline en
`knowledge/system-knowledge.md` § Vetify WebApp. Ambos confirmados en el sprint activo como
"Tareas Por Hacer".
