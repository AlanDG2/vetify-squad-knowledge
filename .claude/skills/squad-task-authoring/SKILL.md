---
name: squad-task-authoring
description: Ayuda a redactar subtareas de Jira o comentarios de seguimiento con un estándar consistente, evitando comentarios vagos tipo "ya está" que obligan a otra persona a perseguir el contexto después. Se invoca al crear una subtarea nueva o al comentar el avance/cierre de un ticket.
---

# Autoría de tareas y comentarios (estándar de squad)

## Principio

Se confirmó repetidas veces (ver `knowledge/system-knowledge.md`, ej. los comentarios de la épica
de Reintegros) que la calidad de los comentarios de Jira es muy dispareja — algunos con pasos y
evidencia, otros una línea suelta ("ya avisé a Core"). Este skill no crea nada solo: da la
estructura para que la persona redacte bien y decida qué publicar.

## Procedimiento — subtareas nuevas

1. **Título accionable**: verbo + qué, no un sustantivo suelto ("Validar horarios CDS reintegros",
   no "Horarios CDS").
2. **Criterio de éxito explícito**: cómo se sabe que la subtarea está terminada, en una frase.
3. **Quién la ejecuta** (rol o persona), si ya se sabe.
4. Si el proyecto usa el adaptador `jira`, la subtarea se crea con `createStoryDraft({ projectKey,
   summary, description, parentKey, issueType: 'Tarea' })` (o `'Subtarea'` si cuelga de una Tarea en
   vez de una épica) — **siempre con preview + OK explícito antes**, igual que cualquier escritura
   (ver `adapters/jira/update-rules.md`). Pasar el `issueType` correcto es importante: sin
   especificarlo, `createStoryDraft` crea por default una "Historia de usuario", no una Tarea.

## Procedimiento — comentarios de seguimiento/cierre

1. **Qué se hizo** (concreto, no "avancé con esto").
2. **Qué falta**, si algo queda pendiente.
3. **Evidencia** si aplica — link a MR, captura, log. Si la evidencia es una imagen/video, dejar
   igual una descripción en texto de qué muestra (no asumir que quien lo lea después la va a
   poder ver bien, ver la lección de `automation` sobre comentarios de Jira con imágenes
   descartadas por herramientas de extracción de texto).
4. **Próximo paso**, si corresponde.
5. Redactar el borrador y **mostrarlo completo a la persona**. Si el adaptador `jira` está activo,
   la persona puede pedir que se publique con `addComment(key, text)` — pero **solo tras preview +
   OK explícito en esa misma conversación** (ver `adapters/jira/update-rules.md`); nunca de forma
   autónoma. Si prefiere pegarlo a mano en Jira, eso también es válido (mismo principio que
   `docs/_templates/dev-hu-testing-note.prompt.md`).

## Reglas duras

1. 🚫 **NUNCA publicar un comentario en Jira sin preview + OK explícito previo** — `addComment`
   existe, pero eso no cambia la disciplina: mostrar el borrador completo primero, siempre.
2. 🚫 **NUNCA crear una subtarea sin preview + OK explícito** si se usa `createStoryDraft`.
3. 🚫 **NUNCA dejar un comentario de cierre sin al menos "qué se hizo"** — un comentario que diga
   solo "listo" no cumple el estándar de este skill.

## Output Contract

```
### Borrador de subtarea
**Título**: <verbo + qué>
**Criterio de éxito**: ...
**Asignado a**: ...

### Borrador de comentario
**Qué se hizo**: ...
**Qué falta**: ... (si aplica)
**Evidencia**: ... (si aplica)
**Próximo paso**: ... (si aplica)
```
