---
sidebar_position: 3
---

# 01 · Ana contrata Vetify

Todo empieza con el alta de Puki en uno de los canales disponibles.

Hoy el plan puede contratarse o activarse por **cuatro caminos**:

- 🐾 **E-commerce** — contratación digital desde la experiencia pública (la landing que cualquiera
  puede visitar y pagar con tarjeta).
- 🐾 **Agente IA** — canal de contratación asistido por inteligencia artificial.
- 🐾 **Call Center (CDS)** — alta gestionada por el Centro de Servicios, alguien del equipo hace la
  venta por teléfono.
- 🐾 **Capitado (OSDE / Flux)** — activación del beneficio para usuarios capitados: la persona no
  paga directo, el beneficio ya viene incluido en un acuerdo entre Iké y un tercero (OSDE o Flux),
  y se activa con un cupón en vez de una compra nueva.

Estos 4 caminos son justo lo que después define **qué tipo de cliente** es cada familia — el "cómo
llegó" cambia reglas más adelante (qué reintegros puede pedir, qué planes ve disponibles).

## Para explorar

- **Landing pública (e-commerce)**: `vetify.com.ar` — con su versión de pruebas (QA) equivalente.
- **Repos de e-commerce / landing**: la landing institucional y el checkout son 2 repos separados —
  uno para el frontend (la experiencia visual, hecha en React) y otro que actúa de intermediario
  con el backend de pagos (BFF de checkout, hecho en Express/Node).
- **Activación de capitados**: la misma landing tiene rutas propias para OSDE y para Flux, donde la
  persona activa su cupón sin pasar por un checkout de pago.

> 💡 **Idea para el ingresante.** No alcanza con conocer la pantalla de compra: es importante
> identificar **desde qué canal nació el alta**, porque eso dispara un recorrido distinto después
> (por ejemplo, un cliente Capitado nunca "compra" en el sentido tradicional, y eso tiene
> consecuencias técnicas más adelante — lo vas a ver en la sección de Reintegros).
