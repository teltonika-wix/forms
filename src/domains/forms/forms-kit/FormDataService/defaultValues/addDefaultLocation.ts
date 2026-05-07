import type { FormInputComponentData } from "../../types";
import type { IPAddressInfo } from "../ipInfo";

export type AddDefaultLocationParams = {
  formInputComponents: FormInputComponentData[];
  ipInfo: IPAddressInfo;
};

export const addDefaultLocation = ({
  formInputComponents,
  ipInfo,
}: AddDefaultLocationParams): FormInputComponentData[] => {
  return formInputComponents.map((input) => {
    if (input.component === "LocationSelectComponent") {
      input.defaultValue = ipInfo.countryName;
    }

    return input;
  });
};
