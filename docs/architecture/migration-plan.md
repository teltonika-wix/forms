# Migration Plan (Non-Breaking)

## Phase 1 (current)

- Add architecture guardrails and baseline tracking.
- Keep runtime behavior unchanged.
- Document target structure and migration policy.

## Phase 2 (started)

- Freeze `src/core` for new feature development.
- Move new shared primitives to `src/shared/ui`.
- Use compatibility re-exports in `src/legacy/core` for all non-core consumers.
- Keep behavior identical while import paths migrate.

## Phase 3 (started)

- Move forms modules into `src/domains/forms`.
- Move high-level composed UI into `src/features`.
- Migrate imports to new locations with codemods.
- `elements/form-components` moved to `features/forms/components` (legacy shim tree removed).
- `form-ui-generator` moved to `domains/forms/form-ui-generator` (legacy shim tree removed).
- `forms-kit` moved to `domains/forms/forms-kit` (legacy shim tree removed).
- `elements/hyperlinks` moved to `features/navigation/hyperlinks` (legacy shim tree removed).

## Phase 4

- Remove duplicate implementations.
- Remove temporary compatibility exports.
- Enforce strict architecture boundaries with zero baseline violations.
