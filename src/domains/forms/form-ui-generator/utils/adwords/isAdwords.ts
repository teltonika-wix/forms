import { getCookie } from "../getCookie";

export const isAdwords = (): number => {
  try {
    return getCookie("_gcl_aw") !== "" || isWixAdwords() ? 1 : 0;
  } catch {
    return 0;
  }
};

const isWixAdwords = (): boolean => {
  try {
    const wixUTM: string | null = localStorage.getItem("utm_campaign");

    if (!wixUTM) return false;

    const utmValues = JSON.parse(wixUTM);

    if (!Array.isArray(utmValues)) return false;

    if (utmValues.length === 0) return false;

    return true;
  } catch (ex) {
    return false;
  }
};
