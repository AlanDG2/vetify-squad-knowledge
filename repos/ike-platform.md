# Plataforma (config / Eureka / webapp-config)

## ike-platform-config-central

Config Server (Git Bitbucket `configurations.git`). Puerto yaml 7000 / deploy 8080. **Sin APIs de negocio.** Health liveness/readiness públicos; resto HTTP Basic. Bitbucket `mt-develop|staging|master` → mt-arg-dev/staging/prod.

El repo webapp-config indica **deprecación** (0 réplicas prod). Verificar clúster.

## ike-platform-eureka

Eureka `:8761`. Sin Spring Security. Mismo pipeline Bitbucket. Posiblemente deprecado.

## ike-platform-webapp-config

**Solo archivos yml/properties. No hay app.** Editar este repo **no cambia** runtime. Config viva: ConfigMaps en cada servicio. Rutas históricas gateway: `/services|/users|/vehicle|/brand|/files/**`.
