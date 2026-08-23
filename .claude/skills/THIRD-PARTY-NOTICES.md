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
