# Third-party skills — atribución

Las 50 skills listadas abajo (carpetas `.claude/skills/<nombre>/SKILL.md`) fueron adaptadas del
repositorio [`phuryn/pm-skills`](https://github.com/phuryn/pm-skills) ("PM Skills Marketplace"),
traídas el 2026-08-23 a pedido de Alan para nutrir el soporte a PO/PM/SM de este hub, que hasta
ese momento solo tenía `hu-epic-feature-authoring` + el gate de DoR.

**Licencia**: MIT, Copyright (c) 2026 Pawel Huryn.

```
MIT License

Copyright (c) 2026 Pawel Huryn

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## Qué se trajo y qué se dejó afuera

Se evaluaron 9 repos externos de skills de Claude Code (ver el detalle completo en la sesión que
promovió esto). Solo `phuryn/pm-skills` calificó — formato ya compatible (`SKILL.md` con
frontmatter `name`+`description`, sin dependencias de código) y contenido genuinamente aplicable a
lo que hace este squad (entrega de producto: descubrimiento, estrategia, ejecución), a diferencia
de los otros 8 (infraestructura genérica, metodologías de desarrollo desde cero que duplican
skills ya hechas a medida acá, o herramientas que no aplican — ver nota de exclusión explícita de
`watermarks-remover`, descartado por función de evasión de detección de contenido generado por IA,
no por falta de tiempo).

De las 68 skills del repo origen (9 plugins), se trajeron **46 completas** de los 5 plugins que
mapean al trabajo real de este squad, más **4 sueltas** de plugins que en general le corresponden a
otro equipo (marketing/growth):

- `pm-product-discovery` (13) — completo
- `pm-product-strategy` (12) — completo
- `pm-execution` (16) — completo
- `pm-data-analytics` (3) — completo
- `pm-ai-shipping` (2) — completo
- sueltas: `north-star-metric` (de `pm-marketing-growth`), `customer-journey-map`,
  `user-personas`, `user-segmentation` (de `pm-market-research`)

**Se dejó afuera** (18 skills, no son remit de un squad de entrega de producto): `pm-go-to-market`
completo (6), `pm-toolkit` completo (4 — trámites de oficina genéricos, no de producto), y el resto
de `pm-market-research`/`pm-marketing-growth` (competitor-analysis, market-sizing, marketing-ideas,
etc.) — si en algún momento hace falta alguna de estas, están en el repo origen con el mismo
formato, se pueden traer igual que las demás.

## Nota de uso

Estas skills cargan on-demand igual que las propias del proyecto (solo su `description` se
precarga). Ninguna requiere instalación adicional — son markdown puro, sin scripts ni
dependencias.

---

## 2026-09-19 — `mermaid-diagrams` y `theme-factory`, de `davila7/claude-code-templates`

A pedido de Alan, evaluadas tras explorar el catálogo de skills de [aitmpl.com](https://www.aitmpl.com/skills/)
(la vidriera web del repo [`davila7/claude-code-templates`](https://github.com/davila7/claude-code-templates),
300+ skills de comunidad) pensando en la idea de armar una página propia del proyecto (documentación +
organigrama, servida como sitio estático). Se trajeron **2 de las ~20 candidatas revisadas**:

- **`mermaid-diagrams`** (MIT, repo raíz — sin `LICENSE.txt` propio): guía completa de diagramas Mermaid
  (clases, secuencia, flowcharts, ERD, C4, estados, git graphs, gantt) — texto versionable junto al
  markdown, directamente aplicable para el organigrama y los diagramas de arquitectura de la futura
  página. 6 archivos de referencia + `README.md`, sin dependencias de código.
- **`theme-factory`** (Apache 2.0, `LICENSE.txt` propio incluido): 10 temas de color/tipografía
  preseteados (hex codes + font pairings) para aplicar a cualquier artifact/página sin tener que
  diseñar de cero. Se omitió `theme-showcase.pdf` del origen (binario, preview visual) — los 10
  `.md` de `themes/` ya traen la especificación completa en texto, alcanza para aplicar el tema sin
  necesitar el PDF.

**Evaluadas y descartadas** (no se trajeron, mismo criterio de "no duplicar algo ya mejor resuelto
acá" del resto de este archivo): `senior-qa`, `playwright-e2e-builder`, `e2e-testing-patterns` — las
3 del lado QA/testing de ese mismo catálogo. Contenido genérico/boilerplate (`senior-qa` asume stack
React/Next/Node con Docker/K8s, scripts Python de scaffolding sin sustancia real) o pensado para
**setear Playwright desde cero** en un proyecto que todavía no lo tiene (`playwright-e2e-builder`,
`e2e-testing-patterns`) — este proyecto hermano (`automation`) ya tiene un framework Playwright
maduro y hecho a medida (POMs de 3 niveles, pool de usuarios, convenciones `TS-XX`/`TC-XX`, 10
skills QA propias) muy por encima de lo genérico que ofrecen esas 3. Ninguna aportaba algo que no
estuviera ya mejor resuelto — quedó documentado acá en vez de en `automation` porque no se copió
nada de ahí.
