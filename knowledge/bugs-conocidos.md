# Bugs conocidos (squad-wide)

> Resumen de los bugs de producto encontrados y documentados en `automation/docs/bugs/`
> (15 al 2026-08-25) — para que PO/PM/devs tengan visibilidad sin tener que abrir ese repo.
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
| BUG-007 | `IMAS-4279` | Reintegros bloqueado (400 VAL-002) por DNI con formato inválido en la cuenta | Alto | Confirmado en sprint activo, "In Validation" |
| BUG-008 | `IMAS-4294` | Webapp Prestadores: "Cerrar sesión" no cierra la sesión de Auth0 | Alto — **riesgo de seguridad** (dispositivo compartido, ej. recepción de veterinaria) | Backlog |
| BUG-009 | `IMAS-4300` | App Android: banner de cookies tapado por la barra de navegación, imposible aceptar/rechazar | Alto | Backlog |
| BUG-012 | `IMAS-4324` | App Android: íconos de la barra de estado invisibles sobre la landing institucional | Bajo | Backlog |
| BUG-013 | `IMAS-4351` | Compra no asocia el plan si el DNI ya tiene cuenta existente | Medio | Sin HU padre, ver detalle |
| BUG-015 | `IMAS-4354` | Rechazo directo de Calidad (Reintegros) falla — requiere `clCuenta` de Nexus | Medio-Alto | **En Progreso** (dev ya lo tiene, ver `system-knowledge.md` § Reintegros) |
| BUG-016 | `IMAS-4430` | Landing Flux Capitado: FAQ con copy de OSDE sin adaptar a la marca | Bajo-Medio | Recién creado (2026-08-25/26), Backlog — ver `knowledge/contenido-institucional.md` |

## Resuelto

| # | Jira | Título |
|---|---|---|
| BUG-014 | `IMAS-4347` | Error 502 en auth al cargar planes (bloqueaba el 100% de las compras) — marcado "Hecho" 2026-08-25 |

## No son bugs reales (retractados / reclasificados) — no asumir que están abiertos

- **BUG-002** — UUID crudo en pantalla de revisión: retractado, en duda, nunca filed.
- **BUG-010** — Upload oversize devuelve 500 crudo: reclasificado a mejora de robustez, no filed como Defect.
- **BUG-011** — "Ir a la web" no navega en mobile: retractado, era un falso positivo del emulador.

## Nota sobre `IMAS-4198`/`IMAS-4199` (reseteo de contraseña)

Estos 2 bugs (mensaje de error engañoso con campo vacío / sin validación de formato de email) no
tienen un `.md` propio en `docs/bugs/` — están documentados inline en
`knowledge/system-knowledge.md` § Vetify WebApp. Ambos confirmados en el sprint activo como
"Tareas Por Hacer".
