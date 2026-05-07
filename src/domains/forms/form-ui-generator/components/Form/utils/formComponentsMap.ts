import type { FormInputComponentNames } from "src/domains/forms/forms-kit";
import {
  CheckboxComponent,
  CheckboxesComponent,
  ContentComponent,
  FeedbackComponent,
  GclidComponent,
  GroupErrorComponent,
  HiddenComponent,
  LocationSelectComponent,
  SourceComponent,
  TextComponent,
  TextareaComponent,
} from "../../form-components";
import type { defineComponent } from "vue";

export type VueComponent = ReturnType<typeof defineComponent>;

export const formComponentsMap: Record<FormInputComponentNames, VueComponent> =
  {
    ContentComponent,
    GroupErrorComponent,
    LocationSelectComponent,
    SelectInput: LocationSelectComponent,
    SourceComponent,
    HiddenComponent,
    GclidComponent,
    TextComponent,
    TextareaComponent,
    CheckboxComponent,
    CheckboxesComponent,
    FeedbackComponent,
  };
