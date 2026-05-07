# Architecture Governance

This repository currently contains duplicate UI implementation trees:

- `src/components`
- `src/core/components`

The target architecture is:

- `src/foundation`: tokens, themes, tailwind presets
- `src/shared`: reusable primitives and generic libs
- `src/domains`: domain modules (forms, content, etc.)
- `src/features`: composed product features
- `src/entrypoints`: public package APIs
- `src/legacy`: compatibility exports during migration

## Guardrails

- New imports from `src/core` outside `src/core` and `src/legacy` are blocked.
- Existing violations are tracked in a baseline file and must only decrease over time.
- Non-core modules must consume core compatibility exports via `src/legacy/core`.
- Forms feature components must be imported from `src/features/forms/components`.
- Form UI generator module must be imported from `src/domains/forms/form-ui-generator`.
- Forms data/service module must be imported from `src/domains/forms/forms-kit`.
- Hyperlink features must be imported from `src/features/navigation/hyperlinks`.

## Commands

- `vp run arch:check`: fails on new architecture violations.
- `vp run arch:baseline`: refreshes baseline after an intentional migration step.

## Rollout Rule

Do not add new code to `src/core` unless it is required for temporary compatibility.
Do not import from `src/core` outside `src/core` and `src/legacy`.
