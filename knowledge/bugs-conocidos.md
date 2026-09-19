# Bugs conocidos (squad-wide)

> Resumen de los bugs de producto encontrados y documentados en `automation/docs/bugs/`
> (37 al 2026-09-19, más 2 sin `.md` local — `IMAS-4731`/`IMAS-4743`, ver tabla) — para que
> PO/PM/devs tengan visibilidad sin tener que abrir ese repo.
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
| BUG-008 | `IMAS-4294` | Webapp Prestadores: "Cerrar sesión" no cierra la sesión de Auth0 | Alto — **riesgo de seguridad** (dispositivo compartido, ej. recepción de veterinaria) | Backlog |
| BUG-009 | `IMAS-4300` | App Android: banner de cookies tapado por la barra de navegación, imposible aceptar/rechazar | Alto | Backlog |
| BUG-012 | `IMAS-4324` | App Android: íconos de la barra de estado invisibles sobre la landing institucional | Bajo | Backlog |
| BUG-013 | `IMAS-4351` | Compra no asocia el plan si el DNI ya tiene cuenta existente | Medio | Sin HU padre, ver detalle |
| BUG-015 | `IMAS-4354` | Rechazo directo de Calidad (Reintegros) falla — requiere `clCuenta` de Nexus | Medio-Alto | **"Pending Validation"** — causa raíz confirmada en vivo 2026-08-28: es 100% de `reintegros-backend`, Nexus/Core acepta el rechazo directo sin problema (ver `system-knowledge.md` § Reintegros) |
| BUG-016 | `IMAS-4430` | Landing Flux Capitado: FAQ con copy de OSDE sin adaptar a la marca | Bajo-Medio | Backlog — ver `knowledge/contenido-institucional.md` |
| BUG-017 | `IMAS-4431` | Vetify B2C: error al calcular precio del producto al finalizar la compra | Crítico — bloquea el 100% de las compras confirmadas con datos/tarjeta válidos | **Sigue sin resolver** (reconfirmado 2026-09-08/10) — el síntoma **mutó 3 veces** (500 → 400 con detalle distinto), ahora vinculado a `IMAS-4658`; coincide con una reapertura del sandbox de pago QA rechazando/aprobando tarjetas de forma errática (`BUG-035`, `known-issues.md` `IMP-012`). Bloquea el 100% de las compras Vetify B2C hace ya 3+ semanas. |
| BUG-022 | `IMAS-4463` | OSDE Capitado: menú lateral pierde la entrada "Vetify PLUS" pero no la reemplaza por "Cooper" (queda un hueco) | Bajo-Medio | Backlog, Blocks `IMAS-4356` — confirmado como bug genuino, no síntoma de `IMAS-4464`/`IMP-014` |
| BUG-024 | `IMAS-4465` | OSDE Adquirente no ve el banner de beneficios Cooper (sigue viendo Vetify PLUS) | Alto — incumple un requisito explícito de la HU, el segmento no recibe el beneficio prometido | Creado 2026-08-28, Backlog, Blocks `IMAS-4356`. Reproducido 3/3 veces mientras Capitado y Capitado-Flux sí ven Cooper bien el mismo día — descarta falla pasajera del sistema |
| BUG-026 | `IMAS-4526` | El registro rechaza casi todos los caracteres válidos de un email (19 de 20 probados, incluido el "+" — solo el punto funciona) | Medio — bloquea el registro a cualquiera cuyo email real use uno de estos caracteres (el "+" es común para organizar la casilla) | Creado 2026-09-01 |
| BUG-029 | `IMAS-4476` | Reintegros: no se puede aprobar expediente con 2+ gastos cargados (`decision-calidad` rechaza con "expense type amount") | Alto — bloquea la aprobación de Calidad, el expediente no llega a Finanzas para el pago final | "En Progreso" (Mariana Navarro), subtarea QA `IMAS-4504` en "Tareas Por Hacer" |
| BUG-031 | `IMAS-4472`/`IMAS-4534` | Reintegros: validación ARCA automática sigue devolviendo HTTP 400 en QA pese al fix `IMAS-4533` (deployado) | Alto — obliga a usar el workaround manual; el ticket pedía que ARCA respondiera bien en QA y no se cumple | Padre `IMAS-4472` "In Validation", subtarea QA `IMAS-4534` en Backlog |
| — | `IMAS-4731` | Landing de OSDE Adquirentes muestra el precio "antes" con la columna de precios B2C en vez de la columna OSDE (el checkout cobra bien — solo el precio de referencia tachado está mal) | Medio — no afecta el cobro real, pero muestra un descuento incorrecto al cliente antes de comprar | Creado 2026-09-18, sin `.md` local — ver `automation/docs/user-stories/IMAS-4644-actualizacion-precios-vetify.tests.md` §9. Blocks `IMAS-4644` |
| — | `IMAS-4743` | PDF descargable "Cuadro de cobertura OSDE" en la landing OSDE Adquirentes desactualizado (mismo hash MD5 en QA y PROD — precio de lanzamiento $19.900, topes viejos) | Medio — el cliente descarga información de cobertura incorrecta | Creado 2026-09-18, sin `.md` local — ver `automation/docs/user-stories/IMAS-4657-cuadros-cobertura-vetify.tests.md` §3. Blocks `IMAS-4657` |

## Inconcluso — retestear cuando el ambiente lo permita

| # | Jira | Título | Notas |
|---|---|---|---|
| BUG-025 | — | OSDE Adquirente: "Planes y coberturas" muestra "No hay planes por el momento" pese a que el backend a veces devuelve un plan real | Retesteado 2026-09-10: no se pudo reproducir la mecánica exacta porque el endpoint (`plans/engage/{dni}`) devolvió 500 esta vez en vez de 200 con datos — mismo síntoma de fondo que los impedimentos de ambiente ya documentados (`IMP-017`). Sin Defect creado. |
| BUG-027 (rechazo-post-finanzas) | creado 2026-09-04 | Rechazo de Calidad post-Finanzas (`decision-calidad`) sigue fallando incluso en expedientes 100% nuevos (post-26/08) — código de error distinto al de datos históricos | Severidad Alto, vinculado (`Blocks`) a `IMAS-4104`. Sin reconfirmación reciente registrada — no asumir que sigue igual sin retestear |

## Reclasificados como impedimento de ambiente (no Defect de producto)

Estos se investigaron como posibles bugs pero terminaron reclasificados `ENV_BLOCKED` — viven en
`known-issues.md`, no acá, para no duplicar tracking. Se listan solo para que no se los busque
como Defect en Jira:

- **BUG-027 (reintegros-mascotas-array-vacio)** / **BUG-033** — ambos son el mismo impedimento transversal (`category/overview`/`my-products`/`reintegros/mascotas` intermitentes) documentado en `known-issues.md` `IMP-017` bloqueo 1. `IMAS-4464` (el intento de Defect) se cerró "Cancelado" precisamente por este motivo.

## No son bugs reales (retractados / falsos positivos / error de datos de QA)

- **BUG-002** — UUID crudo en pantalla de revisión: retractado, en duda, nunca filed.
- **BUG-010** — Upload oversize devuelve 500 crudo: reclasificado a mejora de robustez, no filed como Defect.
- **BUG-011** — "Ir a la web" no navega en mobile: retractado, era un falso positivo del emulador.
- **BUG-034** — Compra OSDE Adquirente 500 al pagar: retesteado 2026-09-10, no reproduce (compra aprobada de punta a punta con datos frescos) — mismo síntoma/causa que `BUG-021`.
- **BUG-035** — Tarjetas de prueba rechazadas parejo en varios productos: mismo síntoma de fondo que `BUG-017`/`IMAS-4431`, no amerita ticket separado (sería duplicado).
- **BUG-036** — "Condiciones del Servicio" no abre el PDF: llegó a crearse en Jira (`IMAS-4659`) y se canceló el mismo día — era falso positivo del test, no del producto.
- **BUG-037** — Cuenta OSDE Adquirente vieja no recibía el reset de contraseña: no era un bug — era la cuenta de prueba equivocada tageada como `REAL_EMAIL` del lado de QA. Corregido en el pool, sin acción para el squad.

## Resuelto

| # | Jira | Título |
|---|---|---|
| BUG-007 | `IMAS-4279` | Reintegros bloqueado (400 VAL-002) por DNI con formato inválido en la cuenta — **"Hecho"** (verificado en vivo en Jira 2026-09-17; ya no reproduce en los 3 endpoints donde se había confirmado el bloqueo) |
| BUG-014 | `IMAS-4347` | Error 502 en auth al cargar planes (bloqueaba el 100% de las compras) — marcado "Hecho" 2026-08-25 |
| BUG-018 | `IMAS-4439` | Landing Salud Mascotas: el logo del checkout redirigía a la landing institucional en vez de volver a `/salud-mascotas` — **"Hecho"** |
| BUG-019 | `IMAS-4447` | Landing Salud Mascotas: sin cupón en la URL aplicaba `VETIFY20` (1 mes) en vez del default `VETIFY20X3` (3 meses) — **"Hecho"** |
| BUG-020 | `IMAS-4450` | Landing Salud Mascotas: plan Emergencias, fila "Diagnóstico por imagen" sin tope — **"Hecho"** |
| BUG-023 | `IMAS-4464` | Vetify WebApp QA: `category/overview`/`plans/engage/{dni}` 500 intermitente, banner Cooper incorrecto | **Cancelado** en Jira — el impedimento de fondo sigue activo y reclasificado como `ENV_BLOCKED` en `known-issues.md` `IMP-017`, no como Defect de producto |
| BUG-028 | `IMAS-4488` | PDF de condicionado inaccesible para planes OSDE Adquirente (Classic/Cachorro/Premium/Emergencias) — muestra landing en vez del PDF | **Resuelto 2026-09-11** — confirmado manualmente por el equipo de QA con varias cuentas reales, el link "Condiciones del Servicio" ya lleva al PDF correcto en todos los casos |
| BUG-032 | `IMAS-4583` | Alta de cuenta OSDE Capitado nueva no se puede completar (falla al validar datos personales) | Jira dice **"Hecho"** — sin retest reciente registrado en `automation`, reverificar en vivo antes de asumir que sigue arreglado |

**Con `BUG-018`/`019`/`020` resueltos, `IMAS-3610` (landing de performance) ya no está bloqueada** —
"Pending Validation" en Jira. Ver `sprint-2026-Q3-S5-Mascotas.md` (desactualizado, ver nota en `current-state.md`).

## Nota sobre `IMAS-4198`/`IMAS-4199` (reseteo de contraseña) — RESUELTO

Estos 2 bugs (mensaje de error engañoso con campo vacío / sin validación de formato de email) no
tienen un `.md` propio en `docs/bugs/` — están documentados inline en
`knowledge/system-knowledge.md` § Vetify WebApp. **Confirmados resueltos en vivo 2026-08-31**
(validación client-side agregada para ambos casos) — ya no están "Tareas Por Hacer".
