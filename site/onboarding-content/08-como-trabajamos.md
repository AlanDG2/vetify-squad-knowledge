---
sidebar_position: 9
---

# 07 · Cómo trabajamos

Herramientas, acuerdos y ceremonias que ordenan el trabajo del equipo.

## Documentación del equipo

Toda la documentación funcional, técnica y los acuerdos del equipo viven en un espacio compartido
interno. Pedile el acceso a tu buddy apenas arranques — no tiene sentido que lo intentes reconstruir
de memoria.

## Jira: del pedido a producción

Cada tarjeta de trabajo recorre 5 estados, en este orden:

1. **Tareas por hacer** — trabajo priorizado que todavía no arrancó.
2. **En progreso** — el trabajo ya empezó.
3. **En validación** — el desarrollo fue enviado a QA para probarse.
4. **Pending Validation** — ya está validado, esperando que se despliegue a producción.
5. **Hecho** — el cambio llegó a producción **y** cumple la definición de hecho (las dos
   condiciones a la vez, no alcanza con una sola).

Una tarjeta que queda "atascada" en Pending Validation no es un error: significa exactamente lo que
dice, ya está validada, solo falta el deploy.

### Tipos de tarjeta

- **Historia de usuario** — aporta valor directo al usuario.
- **Bug** — error detectado internamente por el equipo.
- **Incidente productivo** — problema detectado o reportado por un cliente en producción.
- **Tarea** — trabajo necesario que no encaja en ninguna de las categorías anteriores.

### Acuerdos del equipo en Jira

- Linkear cada tarjeta con su épica.
- No subir trabajo a un sprint sin consultar antes con la Product Owner.
- Crear las subtareas que hagan falta.

### Una buena tarjeta incluye

Objetivo · Descripción · Criterios de aceptación · Definición de hecho (DoD) · Evidencias con
imágenes · Links a Figma cuando corresponda · Subtareas y dependencias relevantes.

## Deploys

El equipo de desarrollo sigue un acuerdo vigente sobre cómo preparar, validar y desplegar cambios
(un flujo de ramas tipo GitFlow, documentado aparte). Si te toca deployar algo, revisá ese acuerdo
con tu buddy antes de tu primer deploy — no lo improvises.

## Ceremonias

- **Daily** — sincronización breve de avance, próximos pasos y bloqueos.
- **Refinamiento** — entendimiento y preparación del trabajo futuro.
- **Planning** — definición del objetivo y alcance del sprint.
- **Review** — demostración de lo construido y recepción de feedback.
- **Retrospectiva** — mejora continua sobre nuestra forma de trabajar.

Los sprints duran 2 semanas, y cada review termina con una demo seguida del pase a producción de lo
que quedó listo.
