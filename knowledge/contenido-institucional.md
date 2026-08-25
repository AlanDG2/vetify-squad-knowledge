# Contenido institucional de los sitios (QA vs PROD)

> Sembrado desde `automation/docs/contenido-institucional.md` (relevado 2026-08-14, promovido
> 2026-08-25) — textos, secciones, planes y FAQ reales de cada landing pública, navegando QA y
> PROD en paralelo. Complementa `system-knowledge.md` (comportamiento funcional/técnico) con el
> contenido de marketing/institucional real. Útil para PO/PM/Content, no solo QA.

## Resumen ejecutivo

- Los **4 sitios de venta/landing** (Vetify B2C, OSDE Adquirente, OSDE Capitado, Flux Capitado)
  tienen contenido **idéntico entre QA y PROD** — sin drift de contenido entre ambientes.
- Ninguno tiene una página dedicada "Quiénes somos"/"Misión"/"Visión" — la identidad de marca se
  transmite vía el hero, la sección "¿Por qué elegir Vetify?" y el Aviso de Privacidad.
- Las **apps logueadas** (Vetify WebApp, Ike WebApp, Reintegros Backoffice, Prestadores) no tienen
  contenido institucional propio — son herramientas transaccionales.
- **🐛 Hallazgo sin reportar todavía (confirmado 2026-08-25, sigue así 11 días después)**: la
  landing de **Flux Capitado** (QA y PROD, ambos) tiene el FAQ **copiado literalmente de OSDE** —
  dice "Alianza Vetify x OSDE" y "¿por qué OSDE lo eligió como aliado...?" en una página que se
  presenta como "Vetify x Flux". Ver detalle abajo.

## 1. Vetify institucional (B2C) — venta directa con tarjeta

- QA: `qa.vetify.com.ar` · PROD: `vetify.com.ar`
- Hero: *"Tu mascota más tiempo con vos"*. 4 pilares: medicina integral, veterinarios 24/7,
  beneficios exclusivos, atención en todo el país.
- **4 planes** (precio/mes, sin descuento):

| Plan | Precio | Incluye |
|---|---|---|
| Emergencias | $19.990 | Solo accidentes/enfermedades de riesgo vital. Videollamadas ilimitadas, emergencias/guardias 24h, análisis y estudios, cirugías, traslados |
| Classic | $62.990 | Todo Emergencias + consultas presenciales ilimitadas en red, vacunas, desparasitación, internaciones, nutricionista online, especialistas 50% off |
| Premium | $88.990 | Todo Classic + resonancias, tratamientos periodontales, mayor cobertura en cirugías/internaciones/diagnóstico/cardiología |
| Cachorros (0-1 año) | $79.990 | Todo Classic + mayor cobertura especialistas en comportamiento, calendario de vacunación 1er año 100% off |

- 20% descuento por grupo familiar (banner en todos los sitios de venta).
- Razón social (Aviso de Privacidad): **IKÉ ASISTENCIA ARGENTINA S.A.**, CUIT 33-71006859-9,
  Lavardén 157 Piso 2° "201", CABA. Contacto privacidad: `privacidad-vetify@vetify.com.ar`.
- No almacenan CVV ni número de tarjeta completo (procesan plataformas PCI-DSS).
- Footer: WhatsApp `+54 9 11 7248-7444`, `info@vetify.com.ar`, `0800 122 1183`.

## 2. OSDE Adquirente — venta directa, descuento por convenio OSDE

- QA: `qa.vetify.com.ar/mas-osde-beneficios` · PROD: `vetify.com.ar/mas-osde-beneficios`
- Banner: "30% OFF POR TRES MESES EXCLUSIVO OSDE", luego 10% off fijo desde el 4to mes.
- Mismo catálogo de planes/coberturas que B2C, precios con descuento aplicado.

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

### 🐛 Hallazgo de contenido — sigue sin reportar (relevado 2026-08-14, confirmado sin cambios 2026-08-25)

Las respuestas del FAQ **no fueron adaptadas de OSDE a Flux**:
- Categoría del FAQ dice "Alianza Vetify x OSDE" (debería decir "... x Flux").
- Primera pregunta/respuesta: *"¿Qué es Vetify y por qué **OSDE** lo eligió como aliado...?"* en
  una página que se presenta como "Vetify x Flux".
- Confirmado en **QA y PROD por igual** — no es drift de ambiente, es el mismo copy mal cargado en
  ambos. **Pendiente**: nadie lo filó todavía como Defect — sigue como hallazgo suelto 11 días
  después de encontrado.

## 5. Apps logueadas — sin contenido institucional propio

| App | QA | PROD |
|---|---|---|
| Vetify WebApp | `vetify-qa.ikeapp.com` | `vetify.ikeapp.com` |
| Ike WebApp | `ikeargentina-qa.ikeapp.com` | `ikeargentina.ikeapp.com` |
| Reintegros Backoffice | `reintegros-backoffice.ike.qa` | `reintegros-backoffice.ike.ar` |
| Webapp Prestadores | `qa.prestadores.ike.ar` | (no confirmado, inferido `prestadores.ike.ar`) |
