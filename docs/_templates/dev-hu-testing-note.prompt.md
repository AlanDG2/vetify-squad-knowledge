# Prompt para devs — nota "qué hice / cómo probarlo" al terminar una HU

> **Para qué sirve esto**: cuando una HU pasa a QA, hoy el único rastro de "qué se tocó" son los
> comentarios sueltos del ticket (calidad muy despareja — algunos con videos y pasos, otros una
> línea). Esto le pide a la IA del dev que arme la nota en dos lugares, con distinto nivel de
> automatización a propósito:
>
> - **Descripción de la MR**: se edita sola. Es la propia MR del dev, antes de mergear, la ve el
>   equipo técnico — mismo riesgo que el dev editándola a mano.
> - **Comentario de Jira**: la IA solo **redacta un borrador** y lo muestra. Publicarlo lo hace un
>   humano. Nunca autónomo — lo ve PO/negocio, y un comentario mal escrito ahí pesa más que uno
>   corto. Mismo principio que ya aplicamos del lado QA en `jira/update-rules.md`.
>
> **Cómo usar**: pegale esto a tu asistente de IA cuando termines de implementar una HU/bug, antes
> de pasarla a QA. Si el repo ya tiene instalado el template de MR de
> [`gitlab-mr-template-para-qa.md`](gitlab-mr-template-para-qa.md), la sección `## Para QA` ya va
> a estar precargada (vacía) en la descripción — este prompt es lo que la completa.

---

## PROMPT A PEGAR

```
Terminé de implementar <TICKET-KEY> — <título breve>. Necesito que redactes la nota para QA de
este cambio, en dos partes:

### Parte 1 — agregar a la descripción de la MR (podés hacerlo directo)

Agregá al final de la descripción de la MR una sección `## Para QA` con:

- **Qué cambió (en términos de negocio, no de archivos)**: 1-3 líneas, sin jerga interna de la
  clase/método — pensado para alguien que no vio el código.
- **Cómo probarlo**: pasos concretos y verificables — ambiente, precondición (qué cuenta/estado
  necesita), acción exacta (endpoint + payload, o pantalla + botón), resultado esperado exacto
  (incluido el mensaje/código de error si es un caso negativo).
- **Qué NO cambió / fuera de alcance**: para que QA no asuma cobertura de algo que este ticket no
  tocó.
- **Riesgos o casos límite que vos ya identificaste** al programarlo (si hay alguno que no sea
  obvio desde el ticket).

Si el cambio agrega o modifica un endpoint, variable de entorno, código de error o estado nuevo,
usá el nombre EXACTO tal como quedó en el código — no lo parafrasees.

### Parte 2 — borrador de comentario para Jira (NO lo publiques, solo mostralo)

Con la misma información de arriba pero más corto (3-6 líneas), armá un comentario listo para
pegar en <TICKET-KEY>. Mostrámelo en la respuesta para que yo lo revise y lo pegue manualmente en
Jira — no lo publiques vos ni uses ninguna API de Jira para esto.

Formato del borrador:

**Qué se hizo**: ...
**Cómo probarlo**: ...
**Fuera de alcance**: ... (solo si aplica)
```

---

## Reglas

- **Nunca publicar el comentario de Jira de forma autónoma** — ni con token propio, ni con MCP, ni
  con ningún script. Es texto para que un humano lo revise y decida si lo pega tal cual, lo edita,
  o no lo pega.
- La sección `## Para QA` de la MR sí se puede escribir/editar directo — es la propia MR del dev,
  no un sistema de terceros.
- Si el ticket tiene criterios de aceptación en Jira, contrastar "cómo probarlo" contra esos
  criterios explícitamente — no inventar pasos que no correspondan a ningún CA.
