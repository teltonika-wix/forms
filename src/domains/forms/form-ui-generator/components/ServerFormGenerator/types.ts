import type {
  BrowserFormRenderingParams,
  ServerFormRenderingParams,
} from "src/domains/forms/forms-kit";
import type { FormsGeneratorBaseProps } from "../../types";

export type ServerFormGeneratorProps = ServerFormRenderingParams &
  FormsGeneratorBaseProps &
  BrowserFormRenderingParams & { clientFullUrl: string };
