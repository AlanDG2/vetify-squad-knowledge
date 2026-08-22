---
name: squad-bug-report
description: Ayuda a cualquier persona del squad (no solo QA) a reportar un bug encontrado fuera de una sesión formal de testing (en desarrollo, en una demo, en producción) de forma estructurada, distinguiendo un bug real de producto de un problema de ambiente antes de crear nada en Jira. Se invoca cuando alguien dice "encontré un bug" o "esto no funciona" fuera del flujo de certificación de QA.
---

# Reporte de bug (squad, no-QA)

## Principio

Un bug mal reportado (sin pasos, sin distinguir ambiente de producto) le cuesta el doble de tiempo
a quien lo tiene que investigar después. Este skill existe para que reportar bien no dependa de
tener experiencia previa en QA.

## Procedimiento

1. **Clasificar antes de escribir nada**: ¿es reproducible? ¿pasa en un ambiente conocido por ser
   inestable (ver `knowledge/known-issues.md`) o es un comportamiento real del producto?
   - Si es un problema de ambiente/config conocido → no crear un Defect en Jira. Si es nuevo,
     considerar agregarlo a `knowledge/known-issues.md` (requiere que QA lo promueva, ver
     `AGENTS.md` regla 2).
   - Si es un bug real de producto → seguir con el reporte.
2. **Armar el reporte** con: resumen corto, pasos exactos para reproducir, resultado actual,
   resultado esperado, ambiente (QA/dev/prod, URL, cuenta usada si aplica), evidencia (captura,
   link a log, o link a MR si se descubrió revisando código).
3. **Mostrar el reporte completo a la persona antes de crear nada** — preview, no ejecución
   directa.
4. **OK explícito de una persona.**
5. **Crear el Defect**: `createDefect({ projectKey, summary, description, parentKey? })` del
   adaptador `jira` (`adapters/jira/client.mjs`) — `parentKey` si el bug bloquea una HU puntual.
6. **Verificar** que se creó de verdad (`getIssue` del key devuelto) antes de darlo por reportado.

## Reglas duras

1. 🚫 **NUNCA crear el Defect sin preview + OK explícito previo** — ver
   `adapters/jira/update-rules.md`, sin excepciones.
2. 🚫 **NUNCA reportar como bug de producto algo que puede ser un problema de ambiente conocido**
   sin chequear primero `knowledge/known-issues.md`.
3. 🚫 **NUNCA inventar pasos de reproducción que no se confirmaron** — si no se pudo reproducir de
   forma consistente, decirlo explícito en el reporte ("intermitente, reproducido 1 de 3 intentos").
4. ✅ **SIEMPRE incluir el ambiente exacto** — un bug sin decir en qué ambiente ocurrió es
   prácticamente inútil para quien lo investiga.

## Output Contract

```
## Reporte de bug (borrador — no publicado todavía)

**Resumen**: ...
**Ambiente**: <QA/dev/prod, URL, cuenta si aplica>
**Pasos para reproducir**:
1. ...
2. ...
**Resultado actual**: ...
**Resultado esperado**: ...
**Evidencia**: ...
**HU/ticket que bloquea (si aplica)**: ...

¿Confirmás que cree este Defect en Jira con esta información? (esperando OK explícito)
```
