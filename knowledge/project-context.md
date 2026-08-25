# Contexto del proyecto

> Qué es el producto, sus módulos, sus actores, sus reglas macro, y quién es quién en el squad.
> Sembrado desde `vetify-automation/automation/qa-workspace/project-context.md` (2026-08-21),
> generalizado para todo el squad — se sacó el detalle específico de tooling QA (Allure,
> adaptadores internos de Playwright) que no aplica fuera de QA. Ver `system-knowledge.md` para el
> conocimiento funcional/técnico profundo del producto.

## Qué es el producto

**Iké Asistencia** es una compañía de asistencia con 30+ años de trayectoria en Latinoamérica.
**Vetify** es su marca de Iké Asistencia Argentina orientada al cuidado integral de perros y
gatos, con foco en medicina preventiva — combina atención veterinaria, urgencias 24h, videollamadas,
red de prestadores y reintegros.

Plataforma de venta y gestión de planes de mascotas/salud veterinaria, con **4 canales de alta**:
e-commerce (compra directa con tarjeta), Agente IA, CDS (Call Center), y Capitado (el usuario no
compra directo — el beneficio viene integrado por un acuerdo con un tercero, ej. OSDE).

## Quiénes somos — organigrama del squad

| Persona | Rol |
|---|---|
| Luciana Godoy | Scrum Master |
| Liliana Picinotti | Product Owner |
| Juan Cruz Triventi | Developer |
| **Oscar Tello** | **Technical Owner** |
| Mariana Navarro | Developer |
| Cyntia Ferrari | Analista CX (Customer Experience) |
| Paula Scalzo | Developer (también opera como Calidad/QA manual en demos) |
| Belen Gonzalez | Content Designer |
| Alan David Guzman | QA |
| Hernan Casabella | Product Designer |
| Mariana Minutella | Business Owner |
| Gadia Trenes | Business Expert |

**Referentes adicionales**: Alexis Castellano (Consultor técnico Vetify — es "Alex"/
`acastellano@ikeasistencia.com.ar`, la cuenta QA real que se usa para Reintegros/Prestadores, no
solo una cuenta de test) · Laura De Carli (Base de Datos) · Andres Vergani (IT) · Gerardo Sireix
(Infra) · Lucía Cabaña (CDS) · Agustín Calcagno (Marketing) · Jonathan Peña (Salesforce) · Milagros
Sce (Campañas) · Fatima Fernandez (Finanzas) · Ariamis Cadenas (Calidad) · Melisa Lorea
(Prestadores) · Leandro Segovia (Capital Humano) · Damián Franco (Core).

## Convenciones de Jira del equipo

**Flujo de estados** (5): `Tareas por hacer` → `En progreso` → `En validación` (dev mandó a QA) →
`Pending Validation` (validado, esperando deploy) → `Hecho` (en Producción **y** cumple DoD — las
dos condiciones a la vez).

**Por qué un ticket queda "atascado" en `Pending Validation`**: no es un error ni un ticket mal
cerrado — significa exactamente lo que dice, ya validado, con la subtarea "Deploy a Prod" todavía
en Backlog. Confirmado como patrón real y recurrente, no una excepción.

**Tipos de tarjeta** (4): Historia de usuario, Bug (interno), Incidente productivo (reportado por
cliente en Prod), Tarea.

**Acuerdos del equipo**: linkear cada tarjeta con su épica · no subir trabajo a un sprint sin
consultar antes con la PO · crear las subtareas necesarias. Una buena tarjeta incluye: Objetivo,
Descripción, Criterios de aceptación, DoD, Evidencias con imágenes, links a Figma,
subtareas/dependencias. **Gap conocido y confirmado repetidas veces**: en la práctica, muchas HUs
no cumplen este estándar (ver `knowledge/known-issues.md` y la motivación de la Fase 3 — el gate
de Definition of Ready).

**Ceremonias**: Daily · Refinamiento · Planning · Review · Retrospectiva.

## Arquitectura — repos y apps

| Componente | Repo / referencia | Nombre real del servicio (confirmado 2026-08-25, ver `repos/00-indice.md`) |
|---|---|---|
| E-commerce / landing institucional | `ike-asistencia/ike-bapi-vetify` · `ike-asistencia/ike-platform-vetify-institucional` | `web-backend` (BFF checkout, Express) + `web-frontend` (SPA Vite+React) |
| Webapp frontend (Vetify WebApp) | `webapp-ike/ike-webapp` (Bitbucket) | `ike-app-autogestion-web` (Next.js multi-tenant) |
| Webview / app mobile del tutor | `grupo-flux/webapp/ike-webapp-mobile` (GitLab) | — (no relevado en el pack de repos de 2026-08-25) |
| Backend / microservicios core | `webapp-ike/services-service` · `webapp-ike/brands-service` · `webapp-ike/users-service` · `webapp-ike/ike-service` (Bitbucket) | `ike-bapi-autogestion-gateway` (Spring Cloud Gateway) · `ike-bapi-autogestion-servicios` (`services-service`) · `ike-sapi-core-brands`/`-usuarios`/`-vehiculos` (`brand`/`users`/`vehicle`-service) · `ike-xapi-autogestion-web` (`ike-service`, XAPI) · `ike-svc-notificaciones` (mail/push async) · `ike-fiera-upload-manager` (uploads — ⚠️ sin auth, ver `known-issues.md`) · `ike-svc-monitoreo-central` (librería, no es servicio) |
| Pet Services (mascotas/prestaciones/credenciales) | `grupo-ike-arg/webapp-mascotas/backend` (GitLab) | `backend-mascotas` (FastAPI: turnos/videollamadas/slots — ⚠️ 3 endpoints sin auth, ver `known-issues.md`) |
| App Prestadores (mobile nativa, Expo) | `grupo-ike-arg/webapp-mascotas/app-mobile` | — (no relevado en el pack de repos de 2026-08-25) |
| Webapp Prestadores (`qa.prestadores.ike.ar`) | `grupo-ike-arg/webapp-mascotas/webapp-proveedores-mascotas` + `backend-prestadores` | `webapp-proveedores-mascotas` (SPA) + `backend-prestadores` (Django, TOTP/Auth0) |
| Reintegros | `grupo-ike-arg/webapp-mascotas/reintegros-terraform` · `.../reintegros-backoffice` · `.../reintegros-backend` | `reintegros-backend` (Spring, contrato HTTP completo en `repos/reintegros-backend.md`) + `reintegros-backoffice` (Next.js, UI Calidad/Finanzas) |

**Detalle técnico completo de cada servicio** (contrato HTTP con roles, catálogo de errores,
variables de entorno reales, seguridad, local/deploy): `repos/00-indice.md` en la raíz de este
repo — pack armado por un dev el 2026-08-25 corriendo el prompt de README denso
(`docs/_templates/dev-repo-context-for-qa-general.prompt.md`) contra 19 repos reales.

**No confundir App Prestadores con Webapp Prestadores**: son dos apps distintas — la App (mobile)
recibe la notificación de videollamada agendada; la Webapp valida el token de atención presencial.

## Viaje del usuario (resumen — ver `system-knowledge.md` para el detalle técnico completo)

Alta (uno de los 4 canales) → activación de cuenta en la webapp → carga obligatoria de credencial
de la mascota → desde ahí puede: agendar videollamada (autogestionado) · ir a atención presencial
(hoy requiere pasar por CDS, no autogestionado en la webapp) · pedir un reintegro (circuito de 3
pasos: solicitud del tutor → Calidad → Finanzas).

## Cadencia y KPIs de producto

Sprints de 2 semanas, review con demo seguida de pase a Producción. KPIs por feature (CES, escala
1-7, objetivo mínimo 6): Compra 6,5, Videollamadas 4 (veniendo de meses "con mucho ruido"),
Credenciales "muy buen número", Reintegros sin métrica todavía (en migración/implementación). NPS
compañía: 75. CSAT: 100% (base 33 encuestas).
