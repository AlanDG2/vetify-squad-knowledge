# Conocimiento del sistema

> Documentación funcional/técnica del producto, verificada contra código/tests/Jira/GitLab reales
> — no diseño asumido. Este archivo se **nutre** desde
> `vetify-automation/automation/docs/conocimiento-sistema.md` vía `scripts/promote-knowledge.mjs`
> (Fase 2 de este proyecto) — cada sección promovida lleva su cabecera de procedencia y una línea
> en `knowledge/promotion-log.ndjson`.
>
> **Estado actual: vacío, pendiente de la primera promoción** (Fase 2 — se sembrará con el
> contenido ya verificado de la migración Reintegros SISE→Nexus como caso insignia).

<!-- Cada sección promovida sigue este formato:

## Módulo: <nombre>
<!-- promovido desde automation, HU <id>, <fecha> -->
### Página/componente: <...>
**Reglas de negocio**: ...
**Última actualización**: <fecha> (<HU/MR que lo generó>)
-->

---

## Módulo: Reintegros
<!-- promovido desde ../vetify-automation/automation/docs/conocimiento-sistema.md, HU IMAS-4101, 2026-08-22 -->

Flujo: el tutor solicita el reintegro de un gasto veterinario (Vetify WebApp → menú "Reintegros" → "Nuevo reintegro", `/section/nuevo-reintegro`) → el equipo de **Calidad** revisa/distribuye/valida la factura (`reintegros-backoffice.ike.qa` / `.ike.ar` en Producción) → el equipo de **Finanzas** aprueba/rechaza el pago final → CBU del tutor.

**Backend en migración a Nexus (confirmado en review de sprint, 2026-08-21)**:
- Hasta hace 2 sprints, reintegros solo funcionaba para clientes **no capitados** (mundo "Engage"/CISE) — no estaba enganchado al mundo de capitados.
- Sprint anterior: se arregló para que funcionara también con CISE. Aprovechando ese análisis, se hizo el pasaje del módulo completo a **Nexus** (nueva plataforma interna), para Capitados y Adquirentes por igual.
- **Estado real a 2026-08-21**: en Producción, reintegros sigue andando vía CISE (el mundo viejo) — la versión sobre Nexus recién se demostró en QA ese día. Pasaje a Producción anunciado para "la semana siguiente", aunque en el mismo comentario de cierre de la reunión se lo relativizó a "los próximos sprints" — no asumir una fecha exacta sin confirmar en Jira/con el equipo antes de reportar algo como ya productivo.
- Cuenta de prueba usada en la demo con rol dual Calidad+Finanzas: **Alex** (`acastellano@ikeasistencia.com.ar`) — en producción real estos son roles/personas separadas (Calidad aprueba/rechaza primero con sus propios motivos, después Finanzas aprueba/rechaza lo que Calidad ya aprobó).

**Estados (3 sistemas de estados distintos, no confundir)**:
1. **Estados de Nexus** (la plataforma interna nueva): `Aceptado` (=recién creado, nombre confuso — no significa "aprobado"), `Rechazado`, `Aprobado`, `Finalizado`, `Anulado`. Estos NO llegan directo a la UI de Calidad/Finanzas.
2. **Estados de la UI de Calidad/Finanzas** (el backoffice de reintegros): `Pendiente`, `Rechazado`, `Finanzas` (derivado a finanzas tras aprobación de Calidad).
3. **Estados que ve el tutor** (solo 3 hoy, confirmado por Cyntia Ferrari): **`Pagado`**, **`Solicitado`**, **`Desaprobado`**. Si está desaprobado, el tutor puede hacer doble clic/expandir y ve **el texto exacto que escribió la persona de Calidad o Finanzas al rechazar** — se muestra verbatim, sin traducir ni filtrar. Por eso Calidad/Finanzas deben cuidar la redacción del motivo de rechazo, ya que el cliente lo lee tal cual.
   - **No existe todavía un estado intermedio tipo "en revisión"/"en trámite"** — ya identificado como mejora en el backlog (no priorizada, "no nos hizo ruido todavía" según Cyntia), no confundir con un bug.

**Motivos de rechazo — asimetría Calidad vs. Finanzas**:
- **Finanzas** hoy solo tiene **un único motivo de rechazo**: *"datos inconsistentes"* — señalado en la review como potencialmente confuso/poco empático para un producto de salud ("reintegros en salud es más sensible", Mariana Minutella). Ya hay una tarjeta de retrabajo planeada para agregar motivos más específicos.
- **Calidad** tiene muchos más motivos ya armados y categorizados (tipo de cobertura no incluida, sin eventos disponibles, plan no cubre el monto, etc.) — con posibilidad de "doble clic" sobre el rechazo específico de cobertura.

**Distribución de factura (Calidad) — mecánica confirmada** (coincide y amplía lo ya probado en `IMAS-3923`, ver `docs/bugs/BUG-007-reintegros-dni-formato-invalido.md` para el bug de DNI relacionado):
1. Antes de validar la factura manualmente, Calidad debe **distribuir** la factura: por cada línea, poner un monto y aceptarla o "Rechazar línea" con un motivo (ej. "el plan no cubre este monto").
2. Regla de cuadratura: la suma de los montos aceptados + rechazados de todas las líneas debe dar exactamente el total de la factura, o el sistema no deja confirmar la distribución.
3. Recién después de confirmar la distribución se puede validar manualmente la factura (paso separado).
4. Al validar, el sistema trae de SISE el **"tope por evento"** (ej. $28.000 para una vacuna) y ese es el monto sugerido a reintegrar — puede ser menor al monto de la línea aceptada.
5. La **validación de ARCA (automática) confirmada que NO funciona en ambientes bajos/QA** (siempre falla, 502 "no se le está pudiendo pegar bien al servicio de arca") — **pero sí funciona en Producción**, confirmado explícitamente en esta reunión ("hasta lo último que habíamos verificado está funcionando [en producción]"). En QA, Calidad usa el botón de validación manual como bypass — esto es intencional/esperado en QA, no reportar como bug salvo que se confirme la misma falla en Producción.
6. La validación de ARCA **solo chequea validez de la factura en sí** (que exista, CAE válido, etc.) — no lee ni entiende el concepto/línea incluido, eso es responsabilidad de la distribución manual de Calidad.

**Medio de pago del reintegro**: siempre se paga por **CBU** (corta o larga/CVU) — nunca a la tarjeta con la que el cliente paga su plan. Esto resuelve de raíz la duda sobre clientes con tarjeta prepaga (que no pueden recibir débitos automáticos): como el reintegro no usa la tarjeta del plan, no hay conflicto con ese universo de clientes.

**Métricas**: no hay KPI de reintegros todavía (módulo recién en implementación/migración, sin medición formal a la fecha de julio 2026).

**Pendiente de confirmar** (abierto en la review, sin respuesta): si el dashboard de "Guardia General"/siniestralidad que usa el equipo de negocio ya refleja los datos de Nexus, o solo sigue leyendo de CISE.

### Migración técnica SISE → Nexus — detalle real (fuente: épica Jira `IMAS-4101`, analizada 2026-08-21)

> La review de sprint (arriba) da la foto de negocio; esto es el detalle técnico que sale de leer la épica completa + sus 6 tareas hijas + 30 subtareas. Nota: el sistema legado aparece nombrado como **"SISE"** en la épica técnica y como **"CISE"** en la transcripción verbal de la review — mismo sistema, probablemente error de transcripción/oído en uno de los dos.

**Por qué migrar (causa raíz)**: un capitado no compra → no pasa por Engage → nunca tiene cliente/expediente en SISE → **no podía pedir reintegro por esa vía**. La migración a Nexus es lo que lo destraba.

**Alcance**: convivencia SISE + Nexus por un tiempo (no es corte total inmediato), controlada por un **feature flag** (`IMAS-4143`, variable de entorno que decide con qué sistema se genera/edita/finaliza el expediente) — ya en Hecho.

**Pipeline de tareas, con nombre de fase (A→E)**:
1. **A — Feature Flag** (`IMAS-4143`, Hecho).
2. **B — Obtener Historial de Servicios Auxiliares** (`IMAS-4092`, En Progreso): cobertura/límites vía `auxiliaryClaimsHistory` (Nexus Customers), que ya trae `capabilityList` — alcanza para el alta, no hace falta `getAuxiliaryTypes` (cancelado, absorbido acá).
3. **C — Alta Nexus** (`IMAS-4103`, In Validation): `createPetAuxiliary` (Nexus Assistance), crea el expediente (`filecase`) con `refund.idEstado=1`/`montoAReintegrar=0`.
4. **D — Cierre Nexus** (`IMAS-4104`, In Validation): `POST /api/assistance/v1/pets/refund` con estados `1`/`3`(pago)/`5`(rechazo) sobre el `filecase`. Bug real encontrado y resuelto durante el desarrollo: el rechazo (estado 5) no cerraba correctamente — Core lo arregló entre el 14/08 y el 19/08.
5. **E — Notas Nexus** (`IMAS-4124`, In Validation): `addAuxiliaryNote` (`POST /api/assistance/v1/auxiliaries/notes`, body `{filecase, noteType: "shared", text}`) reemplaza el registro best-effort de notas en SISE. **Comportamiento confirmado real** (no se llama a mano desde el backoffice — lo dispara el propio backend solo tras un cierre exitoso en Nexus, y solo si el proveedor configurado es NEXUS):
   - Calidad rechaza (`PENDIENTE`/`RECHAZADO_FINANZAS` + motivo) → dispara nota.
   - Finanzas paga (`VALIDADO` → `PAGO_REALIZADO`) → dispara nota.
   - Finanzas marca `INCONVENIENTE` → **no** dispara nota.
   - Si el refund falla, la nota no se envía; si falla solo la nota, el rechazo/pago igual queda grabado en reintegros (la nota es best-effort, no bloqueante).

**Limitante conocido, documentado por el propio equipo (no confirmado aún con Core)**: `policy.key` en Mascotas = `{clCuenta}-{clave}`, y `clave` suele ser el DNI del titular → identifica **titular + producto**, no la mascota puntual. Con **2+ mascotas** en la misma cuenta, el `policy.key` no las distingue entre sí (la mascota puntual se resuelve aparte, por `IKE Mascotas`/`insuredObject`). **Relevante para diseño de casos**: cualquier caso de reintegro multi-mascota necesita verificar contra qué mascota específica quedó imputado el expediente, no asumir que el sistema ya lo distingue de forma nativa.

**Bloqueo real vigente a 2026-08-21 (comentario del equipo en la épica)**: el pase a **Producción queda fuera de alcance** de estos 5 tickets — falta que el equipo Core migre datos de usuarios para poder probar primero en QA. Mientras tanto hay un **parche/interim** para que los usuarios tengan servicios auxiliares. El equipo va a abrir un ticket nuevo el sprint siguiente para dejar esto formalmente documentado. **No reportar ni asumir nada de esta migración como ya productivo** hasta confirmar ese ticket nuevo.

**Trabajo de QA real pendiente**: la subtarea `IMAS-4152` ("Pruebas QA Manuales Nexus", bajo `IMAS-4124`) sigue en **Tareas Por Hacer** — es el testing manual de la fase de notas, sin arrancar todavía.

### Verificado contra el código real (repo GitLab `grupo-ike-arg/webapp-mascotas/reintegros-backend`, MR !103 `feat/IMAS-4104-on-develop → develop`, mergeada)

> La épica y sus comentarios dan la intención; esto es lo que el código realmente hace — Java/Spring, arquitectura hexagonal (ports & adapters). Reemplaza cualquier suposición de la sección anterior donde haya diferencia.

**El switch SISE/Nexus es un Router, no un flag disperso**: `ReintegrosCoreProviderRouter` implementa los mismos 3 ports que antes solo implementaba `SISEHttpClient` (alta, cierre, nota) y delega a `SISEHttpClient` o `NexusHttpClient` según `reintegros.core-provider` (enum `CoreProvider.SISE`/`NEXUS`). Ojo: **la consulta de cobertura y el lookup de cliente NO pasan por este switch** — quedan 100% en SISE a propósito, porque los capitados sí existen ahí como cliente (solo sin `engageId`), así que no hacía falta migrar esas dos consultas.

**Endpoints Nexus reales, con su path exacto** (`NexusProperties`, prefijo `nexus.*`, mismo host `qa-quantum.ike.ar` bajo dos APIs distintas — `customers` y `assistance`):
| Operación | Método/path | Nota |
|---|---|---|
| Resolver `capabilityId` (interno, previo al alta) | `GET /api/customers/aux/claimsHistory/{policyKey}` | Busca en `capabilityList` el item cuyo `capabilityCode` (parseado a int) matchee el `clSubServicio` pedido — si no lo encuentra, tira excepción de negocio (`BUS_006`). |
| Alta | `POST /api/assistance/v1/pets/auxiliaries` | Body: `serviceType:"asap"`, `assisted{capability, contact DNI, insuredObject, policy}`, `provider.internalCode` (`2080`, hardcodeado en config), `refund{idEstado:"1", montoAReintegrar:0}`. Responde `filecase` (ej. `"3147-1"`, `"2820-1"`) — si viene vacío, excepción. |
| Cierre | `POST /api/assistance/v1/pets/refund` | Usa el `filecase` como `clExpediente`. `idEstado` real: `3`=pago, `5`=rechazo (los mismos vistos en los ejemplos de curl de los comentarios). |
| Nota | `POST /api/assistance/v1/auxiliaries/notes` | Body `{filecase, noteType:"shared", text}` — `noteType` es config (`nexus.note-type`, default `"shared"`), no hardcodeado en el DTO. |

Auth Nexus: **un único API-KEY fijo por header, igual en los 3 ambientes** (no hay intercambio de token como en SISE) — confirmado en el código, coincide con el API-KEY que Mariana pegó en los comentarios de varias tarjetas.

**Máquina de estados real del expediente (`ClaimDossierState`), verificada en `DecideClaimDossierQualityUseCaseImpl` / `RegisterFinancePaymentUseCaseImpl`** — más rica que los "3 estados que ve el tutor" documentados arriba (esos son solo la proyección UI):
- **Aprobar** (`APROBAR`, Calidad): solo válido desde `PENDIENTE`/`RECHAZADO_FINANZAS` → `VALIDADO`. Requiere que **ARCA esté en un resultado final** (si no, `BUS_012`/`BUS_013`; ver bypass manual en QA ya documentado arriba) y que **todos** los expedientes de la misma solicitud ya tengan monto de gasto cargado (si no, `BUS_015`). No admite `motivoCalidadId` (el rechazo si tiene motivo libre, la aprobación no).
- **Rechazar en Calidad** (`RECHAZAR`, dos variantes):
  - Rechazo directo (primera vez): requiere `motivoCalidadId` válido del catálogo `CALIDAD` → `RECHAZADO`, dispara nota de bitácora (`SISE_ESTADO_RECHAZO_DEFINITIVO`) **y un evento que manda mail al titular** con el mensaje de cara al cliente del catálogo (`findHolderFacingMessageByActiveCalidadMotifId`) — coincide con lo documentado arriba sobre "el tutor ve el texto exacto que escribió Calidad".
  - Rechazo post-Finanzas (`postFinanceReturn`, cuando el expediente ya viene de `RECHAZADO_FINANZAS` con un `motivoOperativoFinanzasId` linkeado): **NO** debe llevar `motivoCalidadId` (viene ya resuelto de Finanzas) → también a `RECHAZADO`, mismo mecanismo de nota + evento.
- **Pagar en Finanzas** (`PAGO_REALIZADO`): solo válido desde `VALIDADO`. Cierra con `idEstado` de pago, nota `"Aviso de Pago"`, pasa a `PAGADO`, dispara evento de notificación al titular.
- **Rechazo operativo de Finanzas** (`INCONVENIENTE`): solo válido desde `VALIDADO`. Requiere `motivoOperativoFinanzasId` del catálogo `FINANZAS_OPERATIVO` → pasa a **`RECHAZADO_FINANZAS`** (un estado real e intermedio, no solo un rechazo final) — **este camino NO llama a `registrarNota` en absoluto** (confirmado en el código: la rama `INCONVENIENTE` de `RegisterFinancePaymentUseCaseImpl` no invoca el port de notas). Coincide exactamente con lo que reportó Mariana en el comentario de `IMAS-4124`: *"cuando... rechaza en finanzas (INCONVENIENTE) no mandan esta nota"*.
- **Todas las notas son best-effort real, no solo "en teoría"**: `registrarNotaBitacoraBestEffort` envuelve la llamada en un `try/catch RuntimeException` que solo loguea (`log.warn`) — un fallo de Nexus/SISE al escribir la nota **nunca revierte** el rechazo o el pago, que ya quedó confirmado en la base local antes de intentar la nota.

**Evidencia visual real** (screenshots adjuntos en Jira, `IMAS-4103`, cuenta OSDE Capitado ya documentada arriba — DNI `12540524`):
- **Backoffice Calidad/Finanzas** (pantalla real): header con Titular/Mascota/Plan/estado ("Al día"), sección "Documentación adjunta" (factura con botón "Mostrar factura"), panel derecho con Nº de expediente, badge "Validación manual" (confirma el bypass de ARCA en QA ya documentado), tipo de gasto, monto, CUIT, prestador, y "Resumen de cobertura" con tope por evento + reintegro sugerido calculado — y ahí mismo los botones **Rechazar**/**Pagar**.
- **Panel interno de Nexus** ("Iké Argentina (dev)" → módulo "Servicios auxiliares"): expediente `3147-1` con línea de tiempo real `Aceptado → Finalizado`, tarjeta "Cliente" mostrando literalmente `Osde/capitado (H)` y `Coordinador: Nexus-api`, tarjeta "Asistido" con DNI y tag `WEBAPP-REINTEGROS`. Confirma que el mismo caso queda trazable tanto del lado tutor/backoffice como del lado interno Nexus.

**Evidencia pendiente de revisar (no visualizable con las herramientas actuales)**: `IMAS-4052` tiene 7 videos adjuntos (`.mp4`/`.mov`, validación manual QA del workaround de capitados + un bug de iOS) — quedan como referencia para quien tenga que auditar ese caso puntual, no se transcribieron acá.

### El servicio completo, de su propio README (`reintegros-backend`, rama `develop`)

> Solo leí 6 clases de las 549 `.java` del repo — dirigidas a la migración Nexus. Esto es distinto: es el **README real del servicio**, que sí da el mapa completo de qué hace, aunque el detalle de implementación de cada endpoint siga sin explorarse.

**Qué es el servicio (más allá de reintegros→Nexus)**: microservicio Spring Boot 4 / Java 21 que además de reintegros maneja: **cuentas de acreditación** del titular (CBU/CVU), **validación automática de comprobantes vía ARCA** (async, por **SQS** + cliente HTTP externo, no solo el bypass manual que ya sabíamos), **OCR de facturas con AWS Textract**, e integraciones con **SISE, IKE Mascotas, IKE Users y Prestadores**.

**Contrato HTTP real** (`/api/reintegros/v1/...`), con el rol JWT que exige cada área:
| Área | Rol requerido |
|---|---|
| Cuentas de acreditación, tipos de gasto, mascotas del titular, expedientes/solicitudes/documentos del titular | `cliente` |
| Catálogo de motivos de rechazo | `quality` o `finance` según ámbito |
| Backoffice de expedientes (`decision-calidad`, `comprobante-arca`, `aprobacion-manual-arca`, `registro-pago`) | `quality` / `finance` según la operación puntual |
| OCR (`/api/ocr/v1/text-recognition`) | sin rol, multipart `file` |

Auth: JWT Bearer validado contra JWKS de **Auth0** (mismo proveedor que ya conocíamos de otras apps del ecosistema, pero acá con su propio issuer/audience de reintegros) — rol insuficiente da `403 AUTH-004`, token inválido/vencido da `401 AUTH-005`.

**El feature flag de la migración tiene nombre real**: `REINTEGROS_CORE_PROVIDER` (env var que setea el enum `CoreProvider.SISE`/`NEXUS` que vimos en el código). Con `NEXUS` activo, los errores de alta/cierre contra Nexus (`pets/auxiliaries`, `pets/refund`) se reportan igual bajo los códigos `BUS-006`/`INT-004` que ya usaba SISE — no hay un código de error separado por proveedor.

**ARCA es asíncrono de verdad, no solo "falla en QA"**: hay una cola SQS (`reintegros-arca-validation`), un mecanismo de "lease" de procesamiento (`IKE_ARCA_PIPELINE_PROCESSING_LEASE_SECONDS`) y un fallback de procesamiento síncrono en la misma JVM tras el `sendMessage` (activado por default en `local-aws`, apagado en producción). Esto explica mejor **por qué** la validación automática de ARCA es poco confiable en ambientes bajos (dependencia de infraestructura async completa, no un simple call sync) — coincide con, y profundiza, lo ya documentado sobre el bypass manual en QA.

**Códigos de error más relevantes para diseño de casos de Backoffice** (catálogo completo con ~50 códigos en el README; estos son los que tocan directo el flujo Calidad/Finanzas que vamos a probar):
| Código | HTTP | Cuándo |
|---|---|---|
| `BUS-008` | 400 | Decisión de Calidad sin fila ARCA (`expediente_verificacion`) o resultado ARCA no definitivo. |
| `BUS-012` | 400 | ARCA `PENDIENTE` (validación automática todavía en curso). |
| `BUS-013` | 400 | ARCA `PENDIENTE_VERIFICACION_DATOS` (faltan datos obligatorios del comprobante). |
| `BUS-009` | 400 | Estado de expediente incorrecto para la operación (Calidad requiere `PENDIENTE`, Finanzas requiere `VALIDADO`) — coincide 1:1 con las precondiciones que vimos en el código. |
| `BUS-014` | 400 | Aprobación manual de ARCA con menos de 2 intentos fallidos previos. |
| `BUS-015` | 400 | Aprobar en Calidad sin monto cargado en algún expediente de la solicitud. |
| `BUS-006` | 502 | Alta/cierre SISE **o Nexus** con cuerpo vacío/sin `filecase`/`clExpediente`. |
| `VAL-026` | 400 | `motivoCalidadId`/`motivoOperativoFinanzasId` mal enviados según el catálogo (VET-033) o el resultado de la decisión. |

**Cómo correrlo localmente (por si algún día hace falta contra un backend real en vez de QA desplegado)**: `./mvnw spring-boot:run -Dspring-boot.run.profiles=local`, requiere JDK 21 + PostgreSQL; `docker-compose.yml` del propio módulo levanta Postgres+Redis+el servicio. Perfil `local-aws` agrega LocalStack para S3/SQS. Deploy real es **exclusivamente** GitLab CI → ECS (`develop`→dev, `qa`→qa, `main`→prod) — no hay Portainer ni deploy alternativo (fue retirado explícitamente del repo y su historial).
