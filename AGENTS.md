<!--VITE PLUS START-->

# Using Vite+, the Unified Toolchain for the Web

This project is using Vite+, a unified toolchain built on top of Vite, Rolldown, Vitest, tsdown, Oxlint, Oxfmt, and Vite Task. Vite+ wraps runtime management, package management, and frontend tooling in a single global CLI called `vp`. Vite+ is distinct from Vite, and it invokes Vite through `vp dev` and `vp build`. Run `vp help` to print a list of commands and `vp <command> --help` for information about a specific command.

Docs are local at `node_modules/vite-plus/docs` or online at https://viteplus.dev/guide/.

## Review Checklist

- [ ] Run `vp install` after pulling remote changes and before getting started.
- [ ] Run `vp check` and `vp test` to format, lint, type check and test changes.
- [ ] Check if there are `vite.config.ts` tasks or `package.json` scripts necessary for validation, run via `vp run <script>`.

## Code Placement Rules

Use this order when choosing where new code should live:

1. Keep related code close to the feature/domain that owns behavior.
2. Only extract shared code when at least two consumers need it or a near-term second consumer is expected.
3. Prefer extending existing modules over creating new top-level directories.

Directory decisions:

- Put reusable UI primitives in `src/components`.
- Put product-facing composition logic in `src/features`.
- Put domain logic, API clients, and domain-specific transformations in `src/domains`.
- Put migration-safe compatibility code in `src/legacy`.
- Do not add new code to `src/core` unless modifying existing `src/core` implementation is required.
- For custom element runtime/build concerns, use `src/form-build` (entrypoint: `src/form-build/wix-forms.ts`).

When editing existing behavior:

- Follow the nearest existing pattern in that module first.
- Keep public API shape unchanged unless the task explicitly requires an API change.
- If both `src/core` and non-core paths exist, prefer non-core paths for new logic and only mirror changes into `src/core` when required by current imports/tests.

<!--VITE PLUS END-->
