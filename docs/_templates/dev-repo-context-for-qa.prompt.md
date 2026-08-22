# Prompt para devs — dejar el README a nivel de contexto para QA + IA

> **Para qué sirve esto**: el equipo de QA usa un agente de IA (Claude Code) que certifica HUs
> contrastando el ticket de Jira contra el código real. Cuando el README de un repo es denso y
> real (no un "cómo instalar" genérico), el agente arranca con contexto útil en un solo read en
> vez de tener que reconstruirlo leyendo archivo por archivo vía API. Probado en este mismo
> proyecto: el README de `reintegros-backend` dio en un solo read (contrato HTTP, roles, catálogo
> de errores, nombre real de un feature flag) lo que hubiera costado leer ~20 clases para
> reconstruir a mano.
>
> **Deliberadamente NO incluye** un archivo de changelog de negocio mantenido por devs en cada
> repo (se consideró y se descartó): sumaría una tercera fuente de verdad, mantenida por gente sin
> ese incentivo, con alto riesgo de quedar desactualizada sin que nadie lo note. La síntesis de
> cada MR la escribe el propio agente de QA en `docs/conocimiento-sistema.md` al certificar cada
> HU — un solo lugar, un solo dueño.
>
> **Cómo usar este archivo**: pegale el bloque de abajo a tu asistente de IA (Claude Code, Cursor,
> Copilot Chat, etc.) parado en la raíz de TU repo. Si no usás un asistente de IA, sirve como
> checklist para hacerlo a mano. Es un pedido puntual (una vez por repo, o cuando el README quedó
> viejo) — no un proceso nuevo por cada PR.

---

## PROMPT A PEGAR

```
Actualizá (o creá) el README.md de la raíz de este repo para que responda, sin que haga falta
abrir código, estas preguntas — está pensado para que lo lea un agente de IA sin contexto previo
del repo, no solo un dev nuevo:

- ¿Qué hace este servicio/app? ¿Qué NO hace (límites del dominio)?
- Contrato de API real: rutas base, método, y qué rol/permiso exige cada una (si aplica).
- Arquitectura: capas/paquetes principales y qué responsabilidad tiene cada uno.
- Seguridad/auth: qué exige, cómo se valida, qué pasa si falta o es inválido.
- Variables de entorno reales que lee el servicio (nombre exacto, para qué sirve, valor por
  defecto/ejemplo) — no inventar, listar las que el código realmente lee.
- Catálogo de errores/códigos de negocio si el servicio los tiene (código, HTTP, cuándo ocurre,
  qué debería revisar quien lo recibe) — esto es oro para diseñar casos negativos de QA.
- Cómo correrlo local (comando real, dependencias — DB, colas, cachés, mocks).
- Cómo y dónde se despliega (pipeline, ambientes, ramas → ambiente).

Nivel de detalle de referencia: el README de `reintegros-backend` (repo
`grupo-ike-arg/webapp-mascotas/reintegros-backend`, rama `develop`) — tiene tabla de contrato
HTTP con roles, tabla de ~50 códigos de error con HTTP+causa+qué revisar, tabla completa de env
vars, y sección de seguridad/deploy. Ese nivel de densidad es el objetivo.

Reglas:
- NUNCA pegar secretos, tokens, API keys, contraseñas ni JWTs reales — ni siquiera "de ambiente
  bajo". Usar placeholders (`<tu-api-key>`). Ya hubo un caso real de un token pegado en una
  colección Postman compartida — no repetirlo.
- Denso > extenso. Preferir una tabla compacta a tres párrafos narrativos.
- Nombres exactos (paths, variables) en vez de descripciones vagas ("el endpoint de pago" no
  sirve, el path real sí).
```

---

## Lo único adicional que sí vale la pena pedir por ticket

No un archivo nuevo — solo el hábito de **linkear la MR real** al pasar algo a QA. Con eso, el
agente lee el diff/los archivos tocados directo del repo (ya lo hace hoy, vía API de GitLab) sin
depender de que nadie escriba un resumen aparte.
