# ike-fiera-upload-manager

**Qué hace:** multipart upload (RepoImage + proxy pets), list/update expediente/SISE.

**Qué no hace:** JWT/Api-Key en código (no SecurityConfig). Gateway `/files/**` → `/upload*`.

| Método | Path | Auth código |
| --- | --- | --- |
| POST | `/upload` `/upload/pets` | no encontrado |
| GET | `/upload/{expedientId}` | no encontrado |
| PUT | `/upload/{repoimg_id}` | no encontrado |
| POST | `/upload/updateSise/{id}` | no encontrado |

Errores: RuntimeException / IllegalArgumentException.

Env: `UPLOAD_MANAGER_AWS_*`, `REPOIMG_*`, `mascotas.upload.url`.

Deploy: overlays mt-arg-*. ECR `webapp-ike/upload-manager`. K8s `fiera-upload-manager`.
