import { isSuccessfulStatusCode } from "src/utilities";
import { createFullFormUrl } from "./createFullFormUrl";
import type { FormWebClientParams } from "./types";

export type GetIpLocationInfoParams = Pick<FormWebClientParams, "formWebClientEndpoint" | "isDev">;

export const getIpLocationInfo = async ({
  formWebClientEndpoint,
  isDev,
}: GetIpLocationInfoParams): Promise<Response> => {
  const locationUrl = createFullFormUrl({
    endpoint: "/location",
    searchParams: {},
    formWebClientEndpoint,
    isDev,
  });

  const response = await fetch(locationUrl);

  if (!isSuccessfulStatusCode(response.status)) {
    throw new Error("Failed to fetch IP location");
  }

  return response;
};
