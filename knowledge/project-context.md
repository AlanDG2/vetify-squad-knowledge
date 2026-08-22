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

**Referentes adicionales**: Alexis Castellano (Consultor técnico Vetify) · Laura De Carli (Base de
Datos) · Andres Vergani (IT) · Gerardo Sireix (Infra) · Lucía Cabaña (CDS) · Agustín Calcagno
(Marketing) · Jonathan Peña (Salesforce) · Milagros Sce (Campañas) · Fatima Fernandez (Finanzas) ·
Ariamis Cadenas (Calidad) · Melisa Lorea (Prestadores) · Leandro Segovia (Capital Humano) · Damián
Franco (Core).

## Convenciones de Jira del equipo

**Flujo de estados** (5): `Tareas por hacer` → `En progreso` → `En validación` (dev mandó a QA) →
`Pending Validation` (validado, esperando deploy) → `Hecho` (en Producción **y** cumple DoD — las
dos condiciones a la vez).

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

| Componente | Repo / referencia |
|---|---|
| E-commerce / landing institucional | `ike-asistencia/ike-bapi-vetify` · `ike-asistencia/ike-platform-vetify-institucional` |
| Webapp frontend (Vetify WebApp) | `webapp-ike/ike-webapp` (Bitbucket) |
| Webview / app mobile del tutor | `grupo-flux/webapp/ike-webapp-mobile` (GitLab) |
| Backend / microservicios core | `webapp-ike/services-service` · `webapp-ike/brands-service` · `webapp-ike/users-service` · `webapp-ike/ike-service` (Bitbucket) |
| Pet Services (mascotas/prestaciones/credenciales) | `grupo-ike-arg/webapp-mascotas/backend` (GitLab) |
| App Prestadores (mobile nativa, Expo) | `grupo-ike-arg/webapp-mascotas/app-mobile` |
| Webapp Prestadores (`qa.prestadores.ike.ar`) | `grupo-ike-arg/webapp-mascotas/webapp-proveedores-mascotas` + `backend-prestadores` |
| Reintegros | `grupo-ike-arg/webapp-mascotas/reintegros-terraform` · `.../reintegros-backoffice` · `.../reintegros-backend` |

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
