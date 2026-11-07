# RestoBar & Billar — Backend (`restobar-backend`)

API Transaccional y Motor en Tiempo Real construido con **NestJS 11**, **TypeORM**, **PostgreSQL (Supabase)**, **Redis / BullMQ**, **Socket.io**, **Decimal.js** y **Cloudinary**.

## Estructura Obligatoria de Módulos
Cada módulo dentro de `src/modules/<module-name>/` sigue estrictamente la arquitectura:
- `controllers/` — Endpoints REST documentados con Swagger.
- `services/` — Lógica de negocio conectada a repositorios reales de TypeORM (Cero Mocks).
- `entities/` — Entidades TypeORM que extienden `CustomBaseEntity`.
- `dtos/` — Validación con `class-validator` y `@nestjs/swagger`.
- `tests/` — Pruebas unitarias con Jest (`*.spec.ts`).
- `gateways/` — (Opcional) Eventos en tiempo real con Socket.io.

## Comandos Principales
```bash
# Instalar dependencias
npm install

# Levantar PostgreSQL y Redis locales (opcional si no usas Supabase Dev aún)
docker compose up -d

# Iniciar en modo desarrollo
npm run start:dev

# Ejecutar pruebas unitarias
npm test

# Compilar para producción
npm run build
```
