# Contenido institucional de los sitios (QA vs PROD)

> Sembrado desde `automation/docs/contenido-institucional.md` (relevado 2026-08-14, promovido
> 2026-08-25) — textos, secciones, planes y FAQ reales de cada landing pública, navegando QA y
> PROD en paralelo. Complementa `system-knowledge.md` (comportamiento funcional/técnico) con el
> contenido de marketing/institucional real. Útil para PO/PM/Content, no solo QA.

## Resumen ejecutivo

- Los **4 sitios de venta/landing** (Vetify B2C, OSDE Adquirente, OSDE Capitado, Flux Capitado)
  tienen contenido **idéntico entre QA y PROD** — sin drift de contenido entre ambientes.
- Hay un **5to canal de venta no documentado hasta ahora**: **Landing PAS** (`pas.vetify.com.ar`),
  con códigos SISE propios (2337-2340), **solo existe en PROD** (sin ambiente QA), acceso
  exclusivo vía link de "productor de seguros" (broker de seguros) — ver sección 5.
- Ninguno tiene una página dedicada "Quiénes somos"/"Misión"/"Visión" — la identidad de marca se
  transmite vía el hero, la sección "¿Por qué elegir Vetify?" y el Aviso de Privacidad.
- Las **apps logueadas** (Vetify WebApp, Ike WebApp, Reintegros Backoffice, Prestadores) no tienen
  contenido institucional propio — son herramientas transaccionales.
- **⚠️ Aumento de precios ~6% aplicado el 2026-09-16** (`IMAS-4644`, padre `IMAS-4651`) en los 3
  canales con ambiente QA (Performance, B2C, OSDE Adquirentes) — confirmado sin lag entre QA y
  PROD. Ver tabla de precios actualizada en cada sección. **Defect abierto**: `IMAS-4731` — la
  landing de OSDE Adquirentes muestra el precio "antes" tachado usando la columna de precios B2C
  en vez de la columna OSDE (el checkout cobra el monto correcto, solo el precio de referencia
  mostrado está mal).
- **⚠️ Cuadros de cobertura actualizados el mismo ciclo** (`IMAS-4657`), topes más altos en casi
  todas las categorías — ver tabla en sección 1. **Defect abierto**: `IMAS-4743` — el PDF
  descargable "Cuadro de cobertura OSDE" de la landing OSDE Adquirentes está desactualizado (mismo
  hash MD5 en QA y PROD, muestra precio de lanzamiento $19.900 y topes viejos) — no fue tocado por
  ninguna de las 2 HUs de este ciclo.
- **🐛 Hallazgo sin reportar todavía (confirmado 2026-08-25, sigue así)**: la
  landing de **Flux Capitado** (QA y PROD, ambos) tiene el FAQ **copiado literalmente de OSDE** —
  dice "Alianza Vetify x OSDE" y "¿por qué OSDE lo eligió como aliado...?" en una página que se
  presenta como "Vetify x Flux". Ver detalle abajo.

## 1. Vetify institucional (B2C) — venta directa con tarjeta

- QA: `qa.vetify.com.ar` · PROD: `vetify.com.ar`
- Hero: *"Tu mascota más tiempo con vos"*. 4 pilares: medicina integral, veterinarios 24/7,
  beneficios exclusivos, atención en todo el país.
- **4 planes** (precio/mes individual, sin descuento — **precios actualizados 16-sep-2026**, ver
  precio anterior tachado si hace falta comparar):

| Plan | Precio (desde 16-sep-26) | Precio anterior (28-may-26) | Incluye |
|---|---|---|---|
| Emergencias | $21.190 | $19.990 | Solo accidentes/enfermedades de riesgo vital. Videollamadas **ilimitadas** (o con límite anual si es OSDE Capitado Esencial, ver `system-knowledge.md` § Videollamadas), emergencias/guardias 24h, análisis y estudios, cirugías, traslados |
| Classic | $66.790 | $62.990 | Todo Emergencias + consultas presenciales ilimitadas en red, vacunas, desparasitación, internaciones, nutricionista online, especialistas 50% off |
| Premium | $94.790 | $88.990 | Todo Classic + resonancias, tratamientos periodontales, mayor cobertura en cirugías/internaciones/diagnóstico/cardiología |
| Cachorros (0-1 año) | $84.790 | $79.990 | Todo Classic + mayor cobertura especialistas en comportamiento, calendario de vacunación 1er año 100% off |

- **Cuadro de coberturas (topes en $) actualizado el mismo ciclo** (`IMAS-4657`, tabla oficial
  mar-26 → sep-26):

| Cobertura | Tope anterior | Tope nuevo |
|---|---|---|
| Consulta veterinaria fuera de la red | $35.000 | $40.000 |
| Vacunas fuera de la red | $28.000 | $32.000 |
| Desparasitación fuera de la red | $8.000 | $9.000 |
| Análisis bioquímico (Cachorro) | $20.000 | $27.500 |
| Análisis bioquímico (demás planes) | $25.000 | $40.000 |
| Diagnóstico por imagen / estudio cardiológico | $35.000 | $40.000 |
| Especialidades | 50% hasta $30.000 c/u | 50% hasta $35.000 c/u |
| Traslado | 10 km | 10 km o $15.000 |
| Videollamada | 9 a 21hs | **24hs** |

- 20% descuento por grupo familiar (banner en todos los sitios de venta).
- Razón social (Aviso de Privacidad): **IKÉ ASISTENCIA ARGENTINA S.A.**, CUIT 33-71006859-9,
  Lavardén 157 Piso 2° "201", CABA. Contacto privacidad: `privacidad-vetify@vetify.com.ar`.
- No almacenan CVV ni número de tarjeta completo (procesan plataformas PCI-DSS).
- Footer: WhatsApp `+54 9 11 7248-7444`, `info@vetify.com.ar`, `0800 122 1183`.

## 2. OSDE Adquirente — venta directa, descuento por convenio OSDE

- QA: `qa.vetify.com.ar/mas-osde-beneficios` · PROD: `vetify.com.ar/mas-osde-beneficios`
- Banner: "30% OFF POR TRES MESES EXCLUSIVO OSDE", luego 10% off fijo desde el 4to mes.
- Mismo catálogo de planes/coberturas que B2C (mismos topes de la tabla de la sección 1), precios
  con descuento aplicado y códigos SISE propios (2358-2365):

| Plan | Precio (desde 16-sep-26) | Precio anterior (lanzamiento) |
|---|---|---|
| Classic x1 OSDE | $60.111 | $56.691 |
| Cachorro x1 OSDE | $76.311 | $71.991 |
| Premium x1 OSDE | $85.311 | $80.091 |
| Emergencias x1 OSDE | $19.071 | $17.991 |

- **⚠️ Defect abierto (`IMAS-4731`)**: el precio "antes" tachado en esta landing usa la columna de
  precios B2C (no la columna OSDE de arriba) — el checkout cobra el monto OSDE correcto, es solo
  el precio de referencia mostrado el que está mal.
- **⚠️ Defect abierto (`IMAS-4743`)**: el botón "DESCARGAR CUADRO DE COBERTURA" de esta landing
  sirve un PDF desactualizado (precio de lanzamiento $19.900, topes viejos) — no fue tocado por
  `IMAS-4644` ni `IMAS-4657`.

## 3. OSDE Capitado — canje de cupón (plan corporativo, sin pago)

- QA: `qa.vetify.com.ar/osde` · PROD: `vetify.com.ar/osde`
- Formulario de activación: Nombre, Apellido, Tipo de documento (DNI/LC/LE/Pasaporte/DNI
  Extranjero/CUIT/CUIL/Cédula/Documento Único/No Determinado), Nº Documento, teléfono, email,
  Cupón.
- **"Plan Esencial"** (único plan, cobertura fija): videollamadas 2/año, consultas 2/año hasta
  $35.000 c/u, traslados hasta 5km o $15.000, análisis bioquímicos 1/año hasta $40.000 (activo
  desde los 60 días), certificado de salud 1/año hasta $35.000.
- Mensaje clave repetido: *"Vetify no es un seguro"* — es medicina preventiva.

## 4. Flux Capitado — canje de cupón (plan corporativo, sin pago)

- QA: `qa.vetify.com.ar/flux` · PROD: `vetify.com.ar/flux`
- Estructura idéntica a OSDE Capitado (mismo formulario, mismo "Plan Esencial").

### 🐛 Hallazgo de contenido — reportado como `IMAS-4430` (2026-08-25)

Las respuestas del FAQ **no fueron adaptadas de OSDE a Flux**:
- Categoría del FAQ dice "Alianza Vetify x OSDE" (debería decir "... x Flux").
- Primera pregunta/respuesta: *"¿Qué es Vetify y por qué **OSDE** lo eligió como aliado...?"* en
  una página que se presenta como "Vetify x Flux".
- Confirmado en **QA y PROD por igual** — no es drift de ambiente, es el mismo copy mal cargado en
  ambos. Re-confirmado en vivo 2026-08-25 (11 días después del hallazgo original, sin cambios) y
  reportado como [`IMAS-4430`](https://ikeasistencia-arg.atlassian.net/browse/IMAS-4430)
  (ver `automation/docs/bugs/BUG-016-flux-faq-copy-osde-sin-adaptar.md`).

## 5. Landing PAS — venta vía productor de seguros (canal nuevo, sin ambiente QA)

- **Solo existe en PROD**: `pas.vetify.com.ar` — confirmado explícitamente que no tiene ambiente
  QA ("de PAS solo tengo prod, no tiene QA, es en vivo prod de una"). Cualquier verificación de
  este canal tiene que hacerse directo en producción.
- **Acceso restringido**: no es de navegación libre — se entra vía un link específico de
  "productor de seguros" (broker de seguros); sin ese link válido muestra "Link inválido: contactá
  a tu productor de seguros para que te reenvíe el link correcto".
- Mismo catálogo Vetify que B2C, con **códigos SISE propios** (2337-2340, distintos de B2C y de
  OSDE Adquirente) y **sin variante familiar/"+1"** (solo planes individuales x1) — confirmado en
  vivo, no es un hueco de documentación.

| Plan | Precio (desde 16-sep-26) | Precio anterior (28-may-26) |
|---|---|---|
| Classic x1 | $66.790 | $62.990 |
| Cachorro x1 | $84.790 | $79.990 |
| Premium x1 | $94.790 | $88.990 |
| Emergencias x1 | $21.190 | $19.990 |

## 6. Apps logueadas — sin contenido institucional propio

| App | QA | PROD |
|---|---|---|
| Vetify WebApp | `vetify-qa.ikeapp.com` | `vetify.ikeapp.com` |
| Ike WebApp | `ikeargentina-qa.ikeapp.com` | `ikeargentina.ikeapp.com` |
| Reintegros Backoffice | `reintegros-backoffice.ike.qa` | `reintegros-backoffice.ike.ar` |
| Webapp Prestadores | `qa.prestadores.ike.ar` | (no confirmado, inferido `prestadores.ike.ar`) |
