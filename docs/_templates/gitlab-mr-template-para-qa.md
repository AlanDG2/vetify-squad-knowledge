# Template de MR — sección "Para QA"

> **Qué es esto**: el contenido de abajo va en el archivo `.gitlab/merge_request_templates/Default.md`
> de CADA repo de dev (no de este repo de automation). GitLab lo precarga solo en la descripción de
> toda MR nueva de ese repo — sin IA, sin hook, sin automatización real, es una feature nativa de
> GitLab (`.gitlab/merge_request_templates/`). El dev completa la sección a mano o pegándole el
> prompt de [`dev-hu-testing-note.prompt.md`](dev-hu-testing-note.prompt.md) a su asistente de IA.
>
> **Cómo instalarlo en un repo de dev**: crear el archivo `.gitlab/merge_request_templates/Default.md`
> en la raíz de ese repo con el contenido de la sección "Contenido del template" de más abajo, y
> commitear/mergear a la rama por defecto. GitLab lo aplica automáticamente a partir de ahí — no
> hace falta configurar nada más en el proyecto.

---

## Contenido del template

```markdown
## Ticket

<!-- Key de Jira, ej. IMAS-4152 -->

## Para QA

**Qué se hizo** (en términos de negocio, no de archivos):
<!-- 1-3 líneas -->

**Cómo probarlo**:
<!-- Pasos concretos: ambiente, precondición, acción exacta (endpoint+payload o pantalla+botón),
     resultado esperado exacto (incluido mensaje/código si es un caso negativo). -->

**Fuera de alcance**:
<!-- Qué NO cambia este ticket, para que QA no asuma cobertura de más de lo que hay -->

**Riesgos / casos límite conocidos**:
<!-- Opcional: algo que vos ya identificaste al programar y no es obvio desde el ticket -->

## Checklist

- [ ] Sección "Para QA" completa (a mano o con el prompt `dev-hu-testing-note.prompt.md`)
- [ ] Tests unitarios/IT actualizados si aplica
- [ ] Sin secretos/tokens reales en el diff (ver `dev-repo-context-for-qa.prompt.md`)
```

---

## Por qué esta forma y no otra

- **Es una feature nativa de GitLab, no una automatización nueva que mantener** — cero riesgo,
  cero costo de infraestructura, y no reintroduce el problema de "quién revisa lo que escribe la
  IA" (acá no escribe nada sola, solo deja el espacio vacío listo para completar).
- Mantiene consistencia con la decisión ya tomada sobre las notas de QA: MR sí, Jira con revisión
  humana antes de publicar — este template es literalmente donde vive la mitad "MR" de esa
  decisión.
- Si con el tiempo completar esto a mano se vuelve tedioso, recién ahí evaluar un job de CI que lo
  complete solo (ver la comparación de opciones que quedó en el chat) — no antes de confirmar que
  el paso manual no alcanza.
