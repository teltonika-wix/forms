import type { FormRenderingDataResponse } from "src/domains/forms/forms-kit";
import { BaseMemoryCache } from "src/utilities";

export const FormRenderingDataCache = new BaseMemoryCache<FormRenderingDataResponse>();
