# Pack QA / agente IA — servicios IKE (Vetify + autogestión)

Documento **aparte** de los README de cada repo. Pensado para armar casos (incluye negativos) sin abrir código.

Fuentes: código, OpenAPI, pipelines y `.env.example` al 25-ago-2026. **No inventar** lo marcado como *no encontrado*.

## Cómo usar

1. Abrí el `.md` del servicio que vas a probar.
2. Tabla **Contrato HTTP** = matriz de métodos/rutas/roles.
3. Tabla **Errores** = casos negativos (código, HTTP, causa, qué revisar).
4. Tabla **Env** = qué tiene que estar seteado para que el escenario tenga sentido.
5. **Seguridad / local / deploy** = precondiciones y en qué rama/ambiente corre.

## Índice

| Archivo | Servicio | Tipo |
| --- | --- | --- |
| [reintegros-backend.md](./reintegros-backend.md) | Reintegros API | Spring |
| [reintegros-backoffice.md](./reintegros-backoffice.md) | Backoffice reintegros | Next.js |
| [backend-mascotas.md](./backend-mascotas.md) | Turnos / videollamadas | FastAPI |
| [backend-prestadores.md](./backend-prestadores.md) | API prestadores | Django |
| [web-backend.md](./web-backend.md) | BFF checkout Vetify | Express |
| [web-frontend.md](./web-frontend.md) | Sitio / checkout Vetify | Vite |
| [webapp-proveedores-mascotas.md](./webapp-proveedores-mascotas.md) | Front prestadores | Vite |
| [ike-app-autogestion-web.md](./ike-app-autogestion-web.md) | Webapp autogestión | Next.js |
| [ike-xapi-autogestion-web.md](./ike-xapi-autogestion-web.md) | ike-service | Spring Kotlin |
| [ike-bapi-autogestion-gateway.md](./ike-bapi-autogestion-gateway.md) | API Gateway | Spring Cloud |
| [ike-bapi-autogestion-servicios.md](./ike-bapi-autogestion-servicios.md) | services-service | Spring Kotlin |
| [ike-sapi-core-brands.md](./ike-sapi-core-brands.md) | brand-service | Spring Kotlin |
| [ike-sapi-core-usuarios.md](./ike-sapi-core-usuarios.md) | users-service | Spring Kotlin |
| [ike-sapi-core-vehiculos.md](./ike-sapi-core-vehiculos.md) | vehicle-service | Spring Kotlin |
| [ike-svc-notificaciones.md](./ike-svc-notificaciones.md) | notifications-service | Spring Kotlin |
| [ike-fiera-upload-manager.md](./ike-fiera-upload-manager.md) | upload / files | Spring |
| [ike-platform.md](./ike-platform.md) | Config Server, Eureka, webapp-config (deprecado) | plataforma |
| [ike-svc-monitoreo-central.md](./ike-svc-monitoreo-central.md) | observability-starter | librería |
| [benefi.md](./benefi.md) | Promociones (WIP) | Nest + Next |
