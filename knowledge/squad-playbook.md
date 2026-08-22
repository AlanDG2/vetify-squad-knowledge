# Squad Playbook

> Cómo se trabaja en este squad: convenciones operacionales, flujos repetidos. Complementa las
> skills (que son el "cómo" técnico paso a paso).

## Onboarding de una persona nueva

1. Leer `knowledge/project-context.md` (producto, organigrama, arquitectura).
2. Leer `knowledge/glossary.md`.
3. Leer `knowledge/system-knowledge.md` (Fase 2 — todavía se está sembrando).
4. Si es dev: revisar `docs/_templates/dev-repo-context-for-qa.prompt.md` para saber qué se espera
   del README de su propio repo.

## Cerrar una HU (dev → QA)

1. Dev completa la sección "Para QA" de su MR (`docs/_templates/gitlab-mr-template-para-qa.md` +
   `dev-hu-testing-note.prompt.md`).
2. Dev revisa y pega a mano el borrador de comentario en Jira (nunca automático).
3. QA certifica en `automation`, usando el MR + el conocimiento acumulado acá.
4. Si la certificación genera conocimiento nuevo de sistema, QA lo promueve acá
   (`scripts/promote-knowledge.mjs`, Fase 2).

## Redactar una HU nueva (PO/PM/SM)

Hasta que exista la skill `hu-epic-feature-authoring` (Fase 3): consultar
`knowledge/system-knowledge.md` + `knowledge/known-issues.md` antes de escribir, para no pedir algo
que ya se sabe que es un gap conocido, y completar explícitamente alcance/fuera de alcance.
