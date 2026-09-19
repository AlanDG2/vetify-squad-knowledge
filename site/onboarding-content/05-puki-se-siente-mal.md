---
sidebar_position: 6
---

# 04 · Puki se siente mal

Ana solicita una videollamada veterinaria y arranca un flujo coordinado entre tutor y prestador.

## El recorrido, paso a paso

1. **Ana solicita el turno** desde la webapp — elige el motivo, adjunta fotos si hace falta, y
   elige día y horario disponible.
2. **El turno queda agendado** y Ana recibe la confirmación.
3. **Se avisa a la veterinaria** — el prestador asignado es notificado desde su propia app, la
   **App Prestadores**.
4. **Recordatorios** — a medida que se acerca el horario, tanto Ana como el prestador reciben
   avisos.
5. **La videollamada sucede**, con el veterinario del otro lado.
6. **Encuesta** — al terminar, se dispara una encuesta de experiencia.

## App Prestadores

Es la aplicación mobile nativa (hecha con Expo/React Native) que usan los veterinarios y
profesionales de la red para gestionar sus turnos y atender videollamadas. Tiene su propio
repositorio, separado del resto de la webapp — porque corre en un dispositivo distinto, con un
público distinto (el prestador, no el tutor).

> 💡 **Mirada de producto.** Este flujo no es solo "hacer una videollamada": incluye agenda,
> comunicaciones, notificaciones, la experiencia del lado del prestador, y el feedback posterior.
> Si trabajás en cualquiera de esas piezas, vale la pena ver el flujo completo al menos una vez de
> punta a punta, no solo tu parte.

## Un detalle importante: el cupo de videollamadas

La mayoría de los planes tienen videollamadas **sin límite**. Pero algunos planes puntuales de
Capitado (por ejemplo, el plan Esencial de OSDE) tienen un **límite de videollamadas por año**,
contado de forma independiente para cada mascota. Si Ana llega a ese límite con Puki, la app se lo
avisa con un mensaje claro y le explica cuándo se renueva el cupo — y si cancela un turno con
suficiente anticipación (más de 30 minutos antes), ese cupo se le devuelve.
