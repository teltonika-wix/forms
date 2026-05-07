import { createUrlWithParams } from "src/utilities";
import type { ExactFormUrlParameters } from "../../types";
import type { FormWebClientParams } from "./types";

export type CreateFullFormUrlParams = Pick<
  FormWebClientParams,
  "formWebClientEndpoint" | "isDev"
> & {
  searchParams: ExactFormUrlParameters;
};

export const createFullFormUrl = ({
  formWebClientEndpoint,
  searchParams,
  isDev,
}: CreateFullFormUrlParams): string => {
  let baseUrl = window && window?.location?.origin;
  let endpoint = formWebClientEndpoint;

  if (formWebClientEndpoint.includes("http")) {
    const url = new URL(formWebClientEndpoint);

    baseUrl = url?.origin ?? baseUrl;
    endpoint = url.pathname;
  }

  const finalSearchParams: Record<string, string> = isDev
    ? { ...searchParams, dev: "1" }
    : { ...searchParams };

  // Forward Wix branch-preview params (siteRevision, branchId) from the current page URL
  // so the Wix HTTP function runs on the branch context instead of `main`. Without this,
  // backend-side changes that haven't been merged to `main` (e.g. new form codes) are
  // unknown to the live HTTP function and the request fails validation.
  if (typeof window !== "undefined" && window?.location?.search) {
    const currentParams = new URLSearchParams(window.location.search);
    const branchId = currentParams.get("branchId");
    const siteRevision = currentParams.get("siteRevision");

    if (branchId && siteRevision) {
      finalSearchParams["branchId"] = branchId;
      finalSearchParams["siteRevision"] = siteRevision;
    }
  }

  return createUrlWithParams({
    baseUrl,
    endpoint,
    searchParams: finalSearchParams,
  });
};
