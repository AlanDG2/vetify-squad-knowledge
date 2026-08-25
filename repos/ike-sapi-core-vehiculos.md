# ike-sapi-core-vehiculos (`vehicle-service`)

**Qué hace:** CRUD productos/vehículos + catálogo marcas/tipos. Feign users/brand/ike.

**Qué no hace:** users, brands UI, notificaciones, upload.

Gateway `/vehicle/...`. Casi todo JWT `get:category`. `/job/test` autenticado. Actuator/swagger permitAll.

## Errores (400)

`Producto no pertenece a cliente`, `Marca inválida`, `Tipo inválido`, `Vehículo inexistente`, `Ya existe un vehículo con la misma patente`, etc.

## Env

`VEHICLE_DB_PASSWORD`, `VERSION`, JWT issuer Auth0.

## Deploy

ECR `webapp-ike/vehicle-service`.
