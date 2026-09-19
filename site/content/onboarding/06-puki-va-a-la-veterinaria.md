---
sidebar_position: 7
---

# 05 · Puki necesita ir a una veterinaria

A veces la videollamada no alcanza, y hace falta una atención presencial dentro de la red.

## El recorrido, paso a paso

1. **Ana contacta al Call Center (CDS)** y agenda el turno presencial. Hoy este paso **no es
   autogestionado** desde la webapp del tutor — CDS todavía forma parte obligatoria del circuito
   (está planeado que esto cambie más adelante).
2. **Puki asiste** a la consulta en la veterinaria de la red.
3. **Se genera y valida un token** — la veterinaria confirma la cobertura de Puki a través de un
   token que se valida desde la **Webapp Prestadores** (una aplicación web distinta de la App
   Prestadores mobile, pensada para que el personal de la veterinaria la use desde una
   computadora).
4. **Finaliza la consulta.**
5. **El prestador sube su factura**, que más adelante puede ser parte de un reintegro (ver la
   siguiente sección).

## Webapp Prestadores

Es la plataforma que usa el personal de cada veterinaria asociada — valida la cobertura del
cliente antes de atenderlo, sin necesidad de llamar a nadie para confirmarlo. Corre en su propio
repositorio, separado de la App Prestadores mobile.

> 💡 **Estado actual.** El agendamiento presencial no se autogestiona hoy desde la webapp del
> tutor: CDS es parte necesaria del circuito. Si estás por trabajar en esta parte del producto,
> preguntá si ese plan de cambio sigue en pie antes de asumir que ya se resolvió.
