# Reglas de Arquitectura y Desarrollo — `restobar-backend` (NestJS + TypeORM + Supabase)

Este repositorio contiene el Backend transaccional y en tiempo real del sistema **RestoBar & Billar**.

---

## 🚨 REGLA DE ORO #1: CERO DATOS MOCKEADOS (ZERO MOCK POLICY)
Queda **TERMINANTEMENTE PROHIBIDO** devolver arreglos estáticos hardcodeados o datos simulados en los controladores o servicios.
- Todo servicio debe inyectar su repositorio de **TypeORM** (`@InjectRepository(Entity)`) y consultar/persistir en **PostgreSQL (Supabase)**.
- Los datos iniciales de desarrollo solo pueden insertarse mediante **Seeds de TypeORM** en `src/database/seeds/`.

---

## 🏛️ REGLA DE ORO #2: ESTRUCTURA OBLIGATORIA DE CADA MÓDULO
Cada módulo del negocio (`auth`, `users`, `floor-plan`, `billiards`, `pos`, `kds`, `inventory`, `cash-register`, `tournament`, `reports`, `media`, `printers`) debe ubicarse en `src/modules/<module-name>/` con las siguientes subcarpetas obligatorias:

```text
src/modules/<module-name>/
├── controllers/
│   └── <module-name>.controller.ts
├── services/
│   └── <module-name>.service.ts
├── entities/
│   └── <module-name>.entity.ts
├── dtos/
│   ├── create-<module-name>.dto.ts
│   └── update-<module-name>.dto.ts
├── tests/
│   ├── <module-name>.service.spec.ts
│   └── <module-name>.controller.spec.ts
├── gateways/                  # (Opcional) Si emite/recibe eventos Socket.io
└── <module-name>.module.ts
```

---

## 💰 REGLA DE ORO #3: PRECISIÓN FINANCIERA, BASE DE DATOS E IMÁGENES
1. **Dinero y Tiempo:** Usa siempre `decimal.js` para cálculos de tarifas por minuto/hora de billar, cuentas divididas, impuestos y totales. En las entidades de TypeORM usa `@Column({ type: 'numeric', precision: 12, scale: 2, default: 0 })`.
2. **Entidad Base:** Todas las entidades deben extender `CustomBaseEntity` (`src/common/entities/base.entity.ts`).
3. **Cloudinary:** Todas las imágenes se suben a través de `MediaService` hacia Cloudinary (`CLOUDINARY_FOLDER=restobar-dev` o `restobar-prod`). En PostgreSQL solo se guarda `imageUrl` e `imagePublicId`.
4. **Skills:** Antes de crear o modificar un módulo, lee y aplica `.agents/skills/create-backend-module/SKILL.md`.
