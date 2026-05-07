# wix-form

Vue 3 + TypeScript component library focused on form UI, built with Vite+ and Tailwind CSS.

## Requirements

- Node.js (LTS recommended)
- `pnpm` (project uses `pnpm@10.33.3`)
- `vp` CLI (provided through `vite-plus`)

## Getting Started

```bash
vp install
vp dev
```

`vp dev` starts the local development server.

## Common Commands

```bash
vp dev                # Start dev server
vp run build          # Production build
vp run build:custom-elements # Build custom elements bundle
vp preview            # Preview production build
vp run preview:custom-elements # Open custom elements preview page
vp test --run         # Run tests once
vp test --watch       # Run tests in watch mode
vp check              # Format + lint + type checks (Vite+)
vp run arch:check     # Architecture guardrail checks
vp run arch:baseline  # Update architecture baseline
```

You can also use `make help` to see equivalent Makefile targets.

## Make Commands

```bash
make setup         # Stable project checks
make bootstrap     # Install deps and run setup
make install       # Install dependencies
make check         # Format check + tests
make check-strict  # Full Vite+ check + TypeScript noEmit
make fmt-check     # Formatting check
make lint          # Lint only
make test          # Run tests
make test-run      # Run tests once
make test-watch    # Run tests in watch mode
make build         # Build project
make build-custom-elements # Build custom elements bundle
make dev           # Start dev server
make preview       # Preview production build
make preview-custom-elements # Open custom elements preview page
make arch-check    # Run architecture checks
make arch-baseline # Update architecture baseline
```

## Project Structure

- `src/components`: primary reusable UI components
- `src/features`: composed product-facing features
- `src/domains`: domain modules (forms, content, etc.)
- `src/shared`: shared primitives/utilities
- `src/foundation`: design tokens/themes/tailwind presets
- `src/legacy`: compatibility exports during migration
- `src/core`: legacy duplicate tree under migration constraints
- `docs/architecture`: architecture governance and migration docs

## Architecture Notes

The repository is in an active migration away from `src/core` duplicate implementations.

- Prefer new code in `src/foundation`, `src/shared`, `src/domains`, and `src/features`.
- Avoid introducing new dependencies on `src/core` outside `src/core` and `src/legacy`.
- Run `vp run arch:check` before merging changes.
