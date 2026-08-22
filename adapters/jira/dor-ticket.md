# Criterios de DoR del adaptador `jira` (vetify-squad-knowledge)

> Estos criterios se **suman** a los 6 universales de `core/dor/dor-core.md` cuando este adaptador
> está activo. Con `jira` activo, el DoR final tiene **7 criterios**.

## Por qué solo 1 criterio extra

Los criterios 1-4 y 6 del core dependen de leer el texto de la HU — no son verificables solo con
una consulta a la API de Jira. El único criterio genuinamente verificable **en vivo** contra Jira,
sin ambigüedad, es el vínculo con la épica (campo `parent`). Por eso el adaptador suma uno solo,
igual que el adaptador `jira` de `automation` suma uno solo a su DoD (por el mismo motivo: no hay
Xray, así que no hay más estado objetivo que consultar).

## Criterio de entrada adicional (gestor de tickets)

7. **La HU está linkeada a una épica real en Jira.** Verificable en vivo con
   `adapters/jira/client.mjs → checkReadiness(id)`, que consulta `getIssue(id)` y chequea que
   `fields.parent` exista y sea de tipo Epic.
   - Si `checkReadiness()` no puede consultar Jira en vivo (sin red/credenciales) → debe devolver
     `{ready: false, missing: ['NO_VERIFICADO_EN_VIVO']}`, nunca asumir que está lista.

## Orden de validación (cuando este adaptador está activo)

1. Validar los 6 criterios universales (core) — lectura de la HU.
2. Validar el criterio 7 de arriba — `checkReadiness(id)` en vivo.
3. Recién entonces reportar la HU como lista para desarrollo.
