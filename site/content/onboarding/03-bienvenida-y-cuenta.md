---
sidebar_position: 4
---

# 02 · Bienvenida y cuenta

Ana recibe la comunicación de bienvenida y habilita su acceso a la webapp.

Después de contratar, Ana recibe una confirmación y, más adelante, el mail de bienvenida con los
accesos a su plan. A partir de ahí, todo lo que Ana hace día a día pasa por la **webapp** — la
aplicación logueada de Vetify.

## Qué hay detrás de la webapp

- 🐾 **Frontend** — la experiencia web que usa Ana desde el navegador. Es una aplicación Next.js
  multi-tenant (o sea, la misma base de código sirve para más de una marca/segmento a la vez).
- 🐾 **Webview** — la app que Ana se descarga en el teléfono (disponible en Google Play y App
  Store). Técnicamente es una capa que envuelve la misma experiencia web dentro de un contenedor
  nativo.
- 🐾 **Backend** — el conjunto de microservicios que resuelven toda la lógica de negocio detrás de
  la webapp: autenticación, catálogo de marcas, usuarios, vehículos (si aplica a otra línea de
  Iké), notificaciones, subida de archivos. Son varios servicios chicos, cada uno con su
  responsabilidad, coordinados por un gateway.
- 🐾 **Pet Services** — el servicio específico de mascotas: turnos, videollamadas, franjas horarias
  disponibles. Es la pieza que sabe todo lo relacionado puntualmente con Puki (no con el resto del
  negocio de Iké).

## Cómo probarlo vos

Para entrar a la webapp necesitás un usuario de prueba en el ambiente que corresponda (desarrollo,
QA o producción). **No vamos a publicar contraseñas reales acá** — pedile a tu buddy o al
Technical Owner un usuario de prueba del ambiente que te toque usar. Lo importante para el
onboarding es que entiendas la arquitectura, no que memorices una credencial que puede rotar en
cualquier momento.

> 💡 **Qué mirar.** Al entrar por primera vez, fijate en qué diferencia a un usuario "Adquirente"
> (compró directo) de uno "Capitado" (llegó por convenio) — la experiencia visual es parecida, pero
> por dentro cada uno trae datos distintos.
