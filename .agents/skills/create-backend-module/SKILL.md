---
name: create-backend-module
description: >-
  Standardized procedure and architecture rules for creating or modifying any backend module in restobar-backend (NestJS + TypeORM + PostgreSQL/Supabase). Use this skill whenever creating a new feature module (e.g., tournament, billiards, pos, inventory, floor-plan, cash-register) or adding endpoints, entities, services, controllers, DTOs, or tests in the backend.
---

# Skill: Create Backend Module (`restobar-backend`)

Use this skill whenever you create or expand a domain module in `restobar-backend`. Every teammate and agent must follow this exact structure so the codebase remains uniform, scalable, and production-ready.

---

## 1. Mandatory Directory Structure

Every module MUST live in `src/modules/<module-name>/` (using `kebab-case` for folder and file prefixes, e.g., `tournament`, `floor-plan`, `cash-register`) and MUST contain these exact subfolders:

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
├── gateways/                          # Optional: Only if real-time Socket.io events are needed
│   └── <module-name>.gateway.ts
└── <module-name>.module.ts
```

---

## 2. Step-by-Step Implementation Rules

### Step 1: Create the TypeORM Entity (`entities/<module-name>.entity.ts`)
1. Always extend `CustomBaseEntity` from `../../../common/entities/base.entity` (which provides `id` UUID, `createdAt`, `updatedAt`, and `deletedAt` for soft-deletes).
2. For money, prices, rates, or inventory quantities (ml, grams), ALWAYS use `numeric`:
   ```typescript
   @Column({ type: 'numeric', precision: 12, scale: 2, default: 0 })
   entryFee: number;
   ```
3. Never store images as Base64 in PostgreSQL. Store `imageUrl` (`varchar`, nullable) and `imagePublicId` (`varchar`, nullable) pointing to Cloudinary.

### Step 2: Create the DTOs (`dtos/create-<module-name>.dto.ts` & `update-<module-name>.dto.ts`)
1. Annotate every field with both `class-validator` decorators (`@IsString()`, `@IsNotEmpty()`, `@IsOptional()`, `@IsNumber()`, `@Min(0)`, `@IsEnum()`) and `@nestjs/swagger` decorators (`@ApiProperty()`, `@ApiPropertyOptional()`).
2. Use `PartialType(CreateDto)` from `@nestjs/swagger` for `UpdateDto`.

### Step 3: Create the Service (`services/<module-name>.service.ts`)
1. **ZERO MOCK DATA:** Never return hardcoded arrays or in-memory lists. Always inject the TypeORM repository via `@InjectRepository(Entity)`.
2. For financial or time calculations (e.g., billiard minute rates, split bill, tournament prize pools), ALWAYS use `Decimal` from `decimal.js`:
   ```typescript
   import Decimal from 'decimal.js';
   const total = new Decimal(hourlyRate).div(60).mul(minutesPlayed).toDecimalPlaces(2).toNumber();
   ```
3. For operations that modify multiple tables at once (e.g., charging an order + deducting inventory + closing a billiard session), wrap the logic in `this.dataSource.transaction(async (manager) => { ... })`.
4. Throw standard NestJS HTTP exceptions (`NotFoundException`, `BadRequestException`, `ConflictException`) with clear Spanish messages for the POS user interface.

### Step 4: Create the Controller (`controllers/<module-name>.controller.ts`)
1. Decorate with `@ApiTags('<ModuleName>')` and `@Controller('<module-name>')` (global prefix `/api/v1` is applied automatically in `main.ts`).
2. Use `@ParseUUIDPipe()` on `:id` route parameters (`@Param('id', ParseUUIDPipe) id: string`).
3. Expose standard REST endpoints:
   - `POST /` -> `create(@Body() dto: CreateDto)`
   - `GET /` -> `findAll()`
   - `GET /:id` -> `findOne(@Param('id', ParseUUIDPipe) id: string)`
   - `PATCH /:id` -> `update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateDto)`
   - `DELETE /:id` -> `remove(@Param('id', ParseUUIDPipe) id: string)`

### Step 5: Create the Unit Tests (`tests/*.spec.ts`)
1. Create `<module-name>.service.spec.ts` and `<module-name>.controller.spec.ts` inside `tests/`.
2. Use `@nestjs/testing` (`Test.createTestingModule`) and `getRepositoryToken(Entity)` to verify service methods (`create`, `findAll`, `findOne`, `update`, `remove`). Note: Mocking the repository *inside unit test `.spec.ts` files* is standard for Jest, but **NEVER** inside actual services or controllers.

### Step 6: Wire the Module (`<module-name>.module.ts` & `src/app.module.ts`)
1. Import `TypeOrmModule.forFeature([Entity])` in `<module-name>.module.ts`.
2. Export `<ModuleName>Service` if other modules need to inject it.
3. Register `<ModuleName>Module` in the `imports` array of `src/app.module.ts`.

---

## 3. Verification Checklist Before Finishing

Before reporting completion to the user, always run:
1. `npm run build` — Must compile with 0 TypeScript errors.
2. `npm test` — All unit tests inside `src/modules/<module-name>/tests/` must pass.
3. Verify that no mock data exists in `controllers/` or `services/`.
