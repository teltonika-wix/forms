# Domains

Business/domain modules live here (forms, content, etc.).

## Forms Domain

The forms domain is split into two modules:

- `src/domains/forms/forms-kit`: form data/services layer (API handlers, constants, enums, data services, shared types).
- `src/domains/forms/form-ui-generator`: form rendering layer (browser/server form generators, form components, stores, composables, completion screens).

Use the domain entrypoint when importing from outside the domain:

```ts
import { ... } from "src/domains/forms";
```

Prefer `forms-kit` for business/data concerns and `form-ui-generator` for UI composition and form rendering behavior.
