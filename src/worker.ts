type AssetsBinding = {
  fetch: (request: Request) => Promise<Response>;
};

type Env = {
  ASSETS: AssetsBinding;
};

const UNHASHED_WIX_FORMS_PATH = "/custom-elements/form-build/wix-forms.js";
const WIX_FORMS_MANIFEST_PATH = "/custom-elements/form-build/wix-forms-manifest.json";
const WIX_FORMS_BASE_PATH = "/custom-elements/form-build/";

const getWixFormsRequestPath = async (request: Request, assets: AssetsBinding) => {
  const requestUrl = new URL(request.url);
  if (requestUrl.pathname !== UNHASHED_WIX_FORMS_PATH) {
    return requestUrl.pathname;
  }

  const manifestUrl = new URL(request.url);
  manifestUrl.pathname = WIX_FORMS_MANIFEST_PATH;

  try {
    const manifestResponse = await assets.fetch(manifestUrl);
    if (!manifestResponse.ok) {
      return requestUrl.pathname;
    }

    const manifest = (await manifestResponse.json()) as { entry?: string };
    if (!manifest.entry) {
      return requestUrl.pathname;
    }

    return `${WIX_FORMS_BASE_PATH}${manifest.entry}`;
  } catch {
    return requestUrl.pathname;
  }
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (!env.ASSETS || typeof env.ASSETS.fetch !== "function") {
      return new Response('ASSETS binding is missing. Configure [assets].binding = "ASSETS".', {
        status: 500,
      });
    }

    const requestUrl = new URL(request.url);
    requestUrl.pathname = await getWixFormsRequestPath(request, env.ASSETS);

    return env.ASSETS.fetch(requestUrl);
  },
};
