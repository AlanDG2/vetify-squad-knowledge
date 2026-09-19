---
sidebar_position: 8
---

# 06 · Puki necesita un estudio con reintegro

Cuando Ana paga una atención de su bolsillo, puede pedir que Vetify le devuelva parte de ese gasto.

## El recorrido, paso a paso

1. **Ana solicita el reintegro** desde la webapp — carga la factura y cuenta qué pasó.
2. **Calidad revisa el expediente** — desde un backoffice interno, distinto de la webapp de Ana.
   Antes de validar la factura, Calidad tiene que **distribuirla**: por cada línea del gasto, pone
   un monto y decide si lo acepta o lo rechaza con un motivo. La suma de las líneas aceptadas y
   rechazadas tiene que dar exactamente el total de la factura, o el sistema no deja avanzar.
3. **Calidad aprueba o rechaza** el expediente.
4. **Si se aprobó, pasa a Finanzas**, que gestiona el pago final.
5. **Ana ve el estado actualizado** en su propia webapp — y si algo se rechazó, puede ver **el
   motivo exacto** que escribió la persona de Calidad o Finanzas, tal cual lo redactó, sin
   traducir ni filtrar. Por eso la redacción de un rechazo importa tanto: el cliente la lee
   directo.

El pago, cuando corresponde, siempre se hace por **transferencia (CBU)** — nunca a la tarjeta con
la que Ana paga su cuota mensual. Esto resuelve de raíz el caso de clientes con tarjetas prepagas,
que no podrían recibir un reintegro en la tarjeta.

## Backoffice de Calidad y Finanzas

Es la herramienta interna (no la webapp del cliente) donde los equipos de Calidad y Finanzas
revisan cada expediente. Tiene su propio repositorio de frontend y uno de backend, separados de la
webapp de Ana.

## Nexus: el sistema que conecta a todos los clientes

Antes, un cliente **Capitado** (el que llega por convenio, sin comprar directo) no podía pedir
reintegros tan fácil como uno que paga con tarjeta — el sistema viejo solo reconocía bien a los
clientes que habían pasado por una compra, y como el Capitado nunca "compra" en ese sentido, su
reintegro se trababa.

**Nexus** es el sistema interno nuevo que se construyó justamente para resolver eso — conecta
también a los clientes Capitado con el circuito completo de reintegros. La migración no fue de un
día para el otro: durante un tiempo, una parte de los reintegros se sigue procesando con el
sistema anterior mientras el resto ya usa Nexus.

> 💡 **Para quien trabaje acá.** Si te toca tocar algo de reintegros, preguntá primero si el caso
> que estás viendo ya pasó por Nexus o todavía usa el sistema anterior — el comportamiento puede
> diferir mientras dure la convivencia entre los dos.
