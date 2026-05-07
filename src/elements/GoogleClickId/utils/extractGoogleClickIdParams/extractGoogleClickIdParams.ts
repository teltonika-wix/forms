import { extractSearchParams, getUrlFromBrowser } from "src/utilities";
import type { GoogleClickIdUrlParams } from "../../types";

export const GOOGLE_CLICK_ID_PARAMS = ["gclid", "gclsrc"];

export const extractGoogleClickIdParams = (): GoogleClickIdUrlParams | undefined => {
  try {
    const currentUrl = getUrlFromBrowser();

    if (!currentUrl) {
      return;
    }

    const [googleClickId, googleClickIdSource] = extractSearchParams(
      currentUrl,
      GOOGLE_CLICK_ID_PARAMS,
    );

    const isValidClickIdSource =
      !googleClickIdSource || (googleClickIdSource ?? "").indexOf("aw") !== -1;

    if (!googleClickId || !isValidClickIdSource) {
      return;
    }

    return { googleClickId, googleClickIdSource };
  } catch (error) {
    return;
  }
};
