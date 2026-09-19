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

## 2026-08-28 - Sync de paridad manual: automation → squad-knowledge

**Decisión**: a pedido explícito de Alan ("que estén a la par"), comparar todo el conocimiento
nuevo acumulado en `automation` (varios días de trabajo sobre `IMAS-4356`, `IMAS-4408`, `IMAS-3610`
y hallazgos de ambiente) contra este hub, y promover lo que faltara — usando
`scripts/promote-knowledge.mjs` para las secciones de `system-knowledge.md` (reemplazo completo de
sección por heading, igual que en la Fase 2) y edición manual directa para `known-issues.md`,
`bugs-conocidos.md` y `sprint-2026-Q3-S5-Mascotas.md` (estos 3 no tienen script propio — se
mantienen como refresh de documento completo, no por sección con cabecera de procedencia; se
logueó igual cada cambio en `promotion-log.ndjson` a mano, para no romper la trazabilidad).

**Qué se promovió**: 6 llamadas al script (`Usuarios de prueba compartidos`, `Hallazgos
históricos`, `Estado oficial de automatización`, `Módulo: Vetify WebApp`, `Módulo: Vetify B2C +
OSDE Adquirente`, `Integración: backend Quantum`) + `BUG-017`-`BUG-023` en `bugs-conocidos.md` +
`IMP-014`/`IMAS-4464` y el gotcha de `customfield_11620` en `known-issues.md` + refresco de los
estados stale de `IMAS-4356`/`IMAS-4408`/`IMAS-3610` en el sprint activo. Detalle completo en
`current-state.md` § Sync de paridad 2026-08-28.

**Qué se dejó afuera a propósito**: el detalle del scaffold mobile Appium/WebdriverIO
(`IMP-008`-`IMP-011` de `automation`, incl. el hallazgo de chromedriver/WebView debug bridge) y la
sección "Hallazgos / gaps detectados durante el estudio de tests" — ambos son detalle de tooling
QA interno de `automation`, no conocimiento accionable para PO/PM/dev. Criterio aplicado: promover
solo lo que un lector no-QA del squad necesitaría para tomar una decisión o entender el producto,
no todo lo que `automation` documenta para su propio uso interno.

**Reabrir si**: se decide que el scaffold mobile SÍ debería tener visibilidad squad-wide (por
ejemplo, si dev necesita saber por qué la automatización mobile no cubre celular físico todavía) —
en ese momento, promover `IMP-008`-`IMP-011` como una sección nueva de `known-issues.md`.

## 2026-08-28 (más tarde el mismo día) — 2do sync de paridad, tras el re-intake completo de la épica Reintegros

A pedido de Alan ("compará conocimiento con el otro repo para llevarlo a la par"), 2do sync del mismo día — el anterior (ver entrada de arriba) fue antes de que QA hiciera un re-intake exhaustivo de la épica `IMAS-4101` en `automation` (analizó desde cero las 4 fases B/C/D/E + el bug insignia `IMAS-4354`, más un pull completo del sprint activo).

**Qué se promovió**:
- `Módulo: Reintegros` completo (`promote-knowledge.mjs`, reemplazo por sección) — ahora trae el contrato técnico real de las Fases B (`IMAS-4092`), C (`IMAS-4103`) y D (`IMAS-4104`), nunca antes documentado con este nivel de detalle (endpoints reales, catálogo de 7 estados `refund`, criterios de aceptación citados textual de cada ticket). Incluye el hallazgo más importante del día: `IMAS-4354`/BUG-015 fue retesteado 2 veces (sigue roto, contradice una captura "204" de dev) y su causa raíz quedó aislada en vivo — es 100% de `reintegros-backend`, confirmado llamando directo a la API de Nexus (Core acepta el rechazo sin problema).
- `bugs-conocidos.md`: `BUG-007` (ahora En Progreso con Mariana, reconfirmado 3 veces más), `BUG-015` (Pending Validation, causa raíz confirmada), `BUG-023`/`IMAS-4464` (ahora Cancelado, sin explicación).
- `known-issues.md`: actualización de `IMP-014` (Cancelado) + un 2do modo de falla del gotcha `customfield_11620` (esta vez el problema fue que el CLI de `automation` trunca descripciones largas en la salida de terminal, no que el campo esté escondido — encontrado porque Alan cuestionó una conclusión apresurada de "no hay nada que probar").
- `sprint-2026-Q3-S5-Mascotas.md`: refresh completo a día 5 (235 issues/24 top-level, vs. 32/155 del día 1) — 6 tickets nuevos de Reintegros (`IMAS-4471`-`4476`), incluido uno (`IMAS-4472`) que **contradice un supuesto ya documentado** ("ARCA funciona en Producción, no reportar salvo que falle ahí también" — ahora hay un ticket diciendo que sí falla en Producción, sin confirmar de forma independiente todavía).

**Qué se dejó afuera**: igual criterio que siempre — nada nuevo de tooling QA interno que promover esta vez, todo lo nuevo de `automation` era conocimiento de producto/proceso legítimamente squad-wide.

**No se commiteó a git en este pase** — Alan no pidió explícitamente commitear/pushear, y el sync anterior del mismo día (ver entrada de arriba) también quedó sin commitear. Quedan 3 syncs de trabajo acumulados sin commit; confirmar con Alan antes de commitear/pushear si se retoma esto.

## 2026-09-19 — 4to sync de paridad, gap de 3 semanas (34 commits + sesión sin commitear)

A pedido de Alan ("quiero que el repo de automatización y el repo de conocimiento del squad estén igualados en conocimientos, valida qué le falta al otro repo, actualízalo"). Desde el 3er sync (2026-08-28, commit `28ad700` en `automation`) habían pasado ~34 commits más el trabajo sin commitear de la sesión activa (IMAS-4644, IMAS-4657, IMAS-4471, IMAS-4310, IMAS-4546) — el gap más grande entre 2 syncs hasta ahora.

**Proceso**: se delegó la comparación (no la escritura) a un agente de investigación, con instrucción explícita de comparar `automation` completo (commits + working tree) contra `knowledge/*.md` y reportar gaps organizados por archivo destino, excluyendo mecánica QA interna ya establecida como no-promovible. El reporte volvió con 18 gaps concretos, priorizados.

**Qué se promovió** (aplicado a mano, no vía `promote-knowledge.mjs` salvo donde el heading coincidía exacto con la fuente — la mayoría del contenido nuevo de `automation` vive en `.tests.md`/`docs/impedimentos-bloqueos.md`/`docs/bugs/*.md`, no en secciones `##` de `conocimiento-sistema.md`):
- `system-knowledge.md`: límite de videollamadas por plan (`IMAS-4546`) — pasó de "todavía no implementado" a feature real, probada y automatizada; banner Cooper/menú "Beneficios" actualizado con `IMAS-4435`; migración de dominio de Quantum (`qa-quantum.ike.ar`); Engage como sistema central único de afiliados (`IMP-030`); estado real de ARCA (`BUG-031`); confirmación de `IMAS-4310` (edición desde confirmación de videollamada).
- `bugs-conocidos.md`: reescrito para pasar de 23 a 37+ bugs trackeados — `BUG-024` a `BUG-037` más 2 Defects nuevos sin `.md` local (`IMAS-4731`/`IMAS-4743`), reclasificación de varios como "no son bugs reales"/"reclasificados como impedimento de ambiente", `BUG-007` movido a Resuelto, `IMAS-4198`/`4199` marcados resueltos.
- `known-issues.md`: reescrita la entrada de `IMP-014` para reflejar que el síntoma **recurrió** como `IMP-017` bloqueo 1 (sigue abierto, mucho más transversal de lo que parecía) — el sync anterior lo había dejado como "resuelto" sin más seguimiento. Sumado `IMP-024` (3 ítems del roadmap que no existen en el producto) e `IMP-029` (checkout bloquea tras ~2 interacciones seguidas). Documentado el fix real de `customfield_11620` (arreglado en código 2026-08-31, ya no hace falta el workaround manual).
- `contenido-institucional.md`: aumento de precios ~6% (`IMAS-4644`) y cuadros de cobertura actualizados (`IMAS-4657`) en las 3 secciones con ambiente QA, más un **5to canal de venta nunca documentado** (Landing PAS, solo PROD, sin QA, acceso vía productor de seguros).
- `current-state.md`: resumen ejecutivo del sync con los 3 hallazgos más importantes.

**Qué quedó explícitamente pendiente, no resuelto en este pase**: `sprint-2026-Q3-S5-Mascotas.md` sigue mostrando el sprint que cerró hace 3 semanas — refrescarlo requiere un pull vivo de Jira (no solo comparar contra `automation`), no se hizo en este pase. Señalado en `current-state.md` para que no se cite como "sprint activo" sin confirmar primero.

**No se commiteó a git en este pase** — mismo criterio que syncs anteriores, no pedido explícitamente.
