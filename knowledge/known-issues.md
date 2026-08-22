# Issues conocidos

> Problemas conocidos del sistema/proceso que NO son un bug puntual de una HU — gaps
> estructurales, limitantes de ambiente, o problemas de proceso recurrentes. Distinto de un bug de
> producto (eso va en `docs/bugs/` o directo en Jira).

- **HUs frecuentemente incompletas** (confirmado repetidas veces por QA): faltan secciones de
  alcance/fuera de alcance, contradicen el diseño de Figma, o no tienen criterios de aceptación
  atómicos/testeables. Es la motivación directa de la Fase 3 de este proyecto (gate de Definition
  of Ready). No es culpa de una persona puntual — es un gap de proceso.
- **Reintegros — limitante multi-mascota, no confirmado con Core todavía**: `policy.key` en
  Mascotas identifica titular+producto, no la mascota puntual — con 2+ mascotas en la misma
  cuenta, no las distingue entre sí. Ver `system-knowledge.md` (Fase 2) para el detalle técnico
  completo una vez promovido.
