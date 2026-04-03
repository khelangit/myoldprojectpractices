# Strapi v5 Migration Notes

This codebase has been scaffolded for Strapi v5.

## Important

- Strapi v5 does not support MongoDB (`mongoose`).
- You must migrate data to a SQL database (recommended: PostgreSQL).

## What was migrated

- Content-types from `api/*/models/*.settings.json` to `src/api/*/content-types/*/schema.json`.
- Components from `components/**/*.json` to `src/components/**/*.json`.
- Lifecycle logic moved to:
  - `src/api/blogs/content-types/blogs/lifecycles.js`
  - `src/api/projects/content-types/projects/lifecycles.js`
  - `src/api/technologies/content-types/technologies/lifecycles.js`
- Core config updated for v5:
  - `config/database.js`
  - `config/server.js`
  - `config/admin.js`
  - `config/middlewares.js`
  - `config/plugins.js`
- Dependencies moved to Strapi v5 packages in `package.json`.

## Required environment variables

Copy `.env.example` and set values:

- `APP_KEYS`
- `API_TOKEN_SALT`
- `ADMIN_JWT_SECRET`
- `TRANSFER_TOKEN_SALT`
- `JWT_SECRET`
- SQL database vars (`DATABASE_*`)

## Install and run

Use Node.js 20+ first:

```bash
nvm use 20
```

```bash
npm install
npm run build
npm run develop
```

## Manual checks after first boot

- Verify each relation in Content-Type Builder (auto-converted from v3 and may need direction tweaks).
- Verify media fields (`model/collection: file`) are correct as single/multiple.
- Reconfigure Users & Permissions role policies.
- Re-generate API documentation if you use documentation plugin.
