# Decision log

> Registro de decisiones de proyecto. Formato por entrada: fecha + decisión + razón + cuándo
> reabrir.

## 2026-08-21 - Creación del proyecto `vetify-squad-knowledge`

**Decisión**: crear un proyecto nuevo y separado (no un fork de `automation` sin tests, no un
archivo paralelo dentro de `automation`) para servir de hub de conocimiento a todo el squad
(PO/PM/SM, devs, QA).

**Razón**: `automation` (QA) acumuló conocimiento genuinamente útil para todo el squad (contexto
de producto, arquitectura, gaps conocidos), pero mezclarlo con la automatización Playwright le
agrega ruido a quien no es QA. Se evaluaron y descartaron dos alternativas más simples:
- *Fork de `automation` sin tests*: pierde la trazabilidad de qué afirmación viene de qué
  evidencia real (test/código verificado) — se vuelve una wiki más, con el mismo riesgo de
  quedar desactualizada sin que nadie lo note.
- *Devs con su propia IA publicando comentarios en Jira de forma autónoma*: reintroduce el riesgo
  que `automation/jira/update-rules.md` ya existe para prevenir (escritura no revisada en un
  sistema que lee gente no técnica). Se decidió explícitamente en contra.

**Plan de 5 fases acordado**:
1. Scaffold + semilla (este commit) — estructura, `knowledge/` sembrado desde
   `automation/qa-workspace/project-context.md`, templates de devs movidos, validador adaptado.
2. Mecanismo de nutrición (`scripts/promote-knowledge.mjs` + `promotion-log.ndjson`) — sembrar
   `system-knowledge.md` con el contenido de `docs/conocimiento-sistema.md` de `automation` como
   primera promoción real.
3. Gate de Definition of Ready (`core/dor/`, adaptador `jira` completo con `checkReadiness`,
   hook de recordatorio — igual patrón que el DoD de `automation`, **solo recordatorio, no
   bloqueo real**, al menos al principio) + skill `hu-epic-feature-authoring`.
4. Consolidación dev-facing (`AGENTS.md` con "quién lee qué", skill `knowledge-lookup`).
5. Resto de skills (`squad-bug-report`, `squad-task-authoring`) + operaciones nuevas del adaptador
   (`createStoryDraft`, `listEpicChildren`).

**Decisiones operativas vigentes** (reabrir solo con decisión explícita del usuario):
- Repo local únicamente por ahora, sin remoto — pushear cuando se quiera compartir con el squad.
- Solo QA escribe en `knowledge/` hasta que las skills de autoría estén probadas.
- El gate de DoR arranca como recordatorio (como el DoD hoy), no como bloqueo técnico real.
- Devs reciben los 3 prompts portables + lectura del conocimiento acumulado — no acceso a
  `automation` completo.

**Reabrir si**: el squad empieza a usarlo activamente y el cuello de botella de "solo QA escribe"
se vuelve el problema real a resolver (en ese momento, evaluar dar escritura directa a PO/PM/SM
sobre `docs/user-stories/` en vez de `knowledge/`, manteniendo `knowledge/` como zona curada).

## 2026-08-22 - Fase 3 completa: gate de Definition of Ready

**Qué se construyó**: `core/dor/dor-core.md` (6 criterios universales, mismo formato que el DoD de
`automation`) + `adapters/jira/dor-ticket.md` (criterio 7, vínculo con épica) +
`.claude/hooks/dor-preflight-check.sh` (clon exacto del patrón de composición del DoD, probado
manualmente — compone bien los 6+1 criterios) + `adapters/jira/client.mjs` con `checkReadiness(id)`
real (probado sin credenciales: falla seguro con `NO_VERIFICADO_EN_VIVO`, nunca asume "lista") +
skill `hu-epic-feature-authoring`.

**Decisión tomada en el camino**: el adaptador `jira` de este repo NO reutiliza
`automation/scripts/jira/jira-client.mjs` vía import cross-repo — es una copia chica y consciente
del cliente REST (ver `adapters/jira/README.md`, nota de duplicación). Motivo: es código genérico
de ~150 líneas, no test code, así que la regla de "referenciar, no incrustar" (que aplica a
tests/POMs de `automation`) no se extiende acá. Si diverge de forma problemática con el tiempo, la
salida es extraer un paquete compartido — no antes de que eso pase.

**Nota de seguridad**: no se copió ningún secreto real de `automation/.env` a este repo — se dejó
`.env.example` con placeholders. Cualquiera que quiera correr `checkReadiness` en vivo acá necesita
cargar sus propias credenciales, a propósito.

**El adaptador `jira` quedó activo** (`none` desactivado) porque `checkReadiness` ya es funcional
— es la primera vez que este repo depende de una integración externa real, no solo de archivos
locales.

## 2026-08-22 - Fase 4 completa: consolidación dev-facing

**Qué se construyó**: skill `knowledge-lookup` (tabla de enrutamiento por tipo de pregunta +
chequeo de frescura vía `promotion-log.ndjson`, con la regla explícita de que un grep sin
resultados no prueba ausencia — mismo principio ya aprendido del lado QA en `automation`) + tabla
"Quién lee qué" en `AGENTS.md`, que deja explícito qué necesita cada rol y qué NO necesita (ej. un
dev no necesita `automation` completo ni `core/dor/`).

**Por qué esto y no más**: la consolidación dev-facing no requería construir nada nuevo del lado de
Jira ni de gestión de tickets — el gap real era de navegación (que alguien sepa a qué archivo ir),
no de funcionalidad. Se resolvió con documentación + un skill liviano, sin sobre-construir.

## 2026-08-22 - Fase 5 completa: adaptador jira completo + skills restantes

**Qué se construyó**: `fetchStory`, `listEpicChildren`, `createStoryDraft`, `createDefect` reales
en `adapters/jira/client.mjs` (probados sin credenciales: fallan con mensaje claro, no rompen) +
`adapters/jira/update-rules.md` (guardrail formal, mismo principio que `automation`) +
`adapters/jira/sync-log.ndjson` (auditoría de escrituras) + skills `squad-bug-report` y
`squad-task-authoring`.

**Con esto, el plan de 5 fases queda completo.** Todo lo construido pasó por el mismo filtro: se
reusó el patrón de `automation` donde aplicaba (skills, adaptador, gate, guardrail de escrituras) y
se descartó explícitamente todo lo que sumaba riesgo sin sumar valor proporcional (fork con tests,
IA de dev publicando sola en Jira, archivo de changelog paralelo mantenido por devs). Próximo paso:
adopción real por el squad, no más construcción de estructura.

## 2026-08-25 - Se pushea a un remoto real (GitLab)

**Decisión**: reabrir la decisión operativa "repo local únicamente" (ver arriba, 2026-08-21) —
Alan decidió empezar a compartirlo con el squad. Se agregó el remoto
`git@gitlab.com:alan-ike/vetify-squad-knowledge.git` y se pusheó `master` (commit `ac13ba6` en
adelante, historial completo incluido — se confirmó antes que ningún `.env` real quedó nunca
commiteado).

**Contexto**: en paralelo se empezó a nutrir el conocimiento del squad (12/14 secciones desde
`automation`, 50 skills de PM adaptadas de `phuryn/pm-skills`, resúmenes de sprint) y a repartir a
un primer dev los 3 prompts de `docs/_templates/` (README denso, template de MR, nota de HU) — el
push a GitLab es el paso natural una vez que hay contenido real para mostrar, no antes.

**Reabrir si**: hace falta volver a un esquema solo-local (poco probable una vez compartido).
