# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
pnpm dev          # start dev server (localhost:3000)
pnpm build        # production build
pnpm lint         # ESLint
```

No test suite is configured.

## Architecture

**Next.js 16 / React 19** e-commerce site for "Ideal Core" — handmade gifts (bouquets, anchetas). Spanish-language UI.

### Data flow

```
Supabase (PostgreSQL)
  ├── lib/server/*.ts          — server-only DB queries (service role key, bypasses RLS)
  ├── lib/actions/*.ts         — "use server" Server Actions (call server/* + revalidatePath/redirect)
  └── app/api/customizer-config/route.ts  — public Route Handler for client-side customizer
```

`lib/supabase/server.ts` (`getSupabaseServerClient`) — singleton with **service role key**. Import only from server files.

`lib/supabase/auth-server.ts` (`getSupabaseAuthServerClient`) — session-aware client using anon key + cookies. Use for auth operations.

`lib/supabase/middleware.ts` (`updateSession`) — Edge runtime session refresh, called by `proxy.ts`.

### Middleware / auth guard

`proxy.ts` is the Next.js middleware. It protects every route under `ADMIN_BASE_PATH` (`/x9k4f7m2q8`). The admin path is intentionally obscure — keep it out of public links and sitemaps. Its value lives in `lib/admin-config.ts`.

### Client state

`lib/store/customizer.ts` — Zustand store for the multi-step ancheta customizer (`/customize`). Config (bases, items, ribbon colors) is fetched from `/api/customizer-config` then loaded via `setConfig`.

`lib/store/cart.ts` and `lib/store/theme.ts` — Zustand stores for cart and dark/light theme.

### Key directories

| Path | Purpose |
|------|---------|
| `app/x9k4f7m2q8/` | Admin panel (obfuscated path, no-index) |
| `app/x9k4f7m2q8/(dashboard)/` | Admin dashboard routes (products, customizer config) |
| `lib/server/` | DB read/write functions — **server only** |
| `lib/actions/` | Server Actions consumed by admin forms |
| `lib/data/` | Shared TypeScript types (`Product`, `CustomizerConfig`, etc.) |
| `supabase/` | SQL migrations |

### Environment variables

| Variable | Used by |
|----------|---------|
| `SUPABASE_URL` | `lib/supabase/server.ts` (service role) |
| `SUPABASE_SERVICE_ROLE_KEY` | `lib/supabase/server.ts` |
| `NEXT_PUBLIC_SUPABASE_URL` | middleware + auth client |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | middleware + auth client |

### Images

Remote images are served from Supabase Storage (`*.supabase.co/storage/v1/object/public/**`). Configured in `next.config.ts`.

### Supabase tables

`products`, `customizer_bases`, `customizer_items`, `customizer_ribbons`. See `supabase/migration.sql` and `supabase/migration_customizer_config.sql` for schema.
