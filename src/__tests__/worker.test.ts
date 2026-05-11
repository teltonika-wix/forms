import worker from "src/worker";

const MANIFEST_PATH = "/custom-elements/form-build/wix-forms-manifest.json";
const UNHASHED_ENTRY_PATH = "/custom-elements/form-build/wix-forms.js";

describe("worker custom-elements routing", () => {
  it("resolves unhashed custom-element path to hashed bundle", async () => {
    const assetsFetch = vi.fn(async (request: Request) => {
      const { pathname } = new URL(request.url);
      if (pathname === MANIFEST_PATH) {
        return new Response(JSON.stringify({ entry: "wix-forms.abc12345.js" }), { status: 200 });
      }

      return new Response(pathname, { status: 200 });
    });

    const response = await worker.fetch(
      new Request("https://example.com/custom-elements/form-build/wix-forms.js?lang=en"),
      { ASSETS: { fetch: assetsFetch } },
    );

    const requestedPaths = assetsFetch.mock.calls.map(
      ([request]) => new URL((request as Request).url).pathname,
    );

    expect(response.ok).toBe(true);
    expect(requestedPaths).toEqual([
      MANIFEST_PATH,
      "/custom-elements/form-build/wix-forms.abc12345.js",
    ]);
  });

  it("falls back to unhashed path when manifest is unavailable", async () => {
    const assetsFetch = vi.fn(async (request: Request) => {
      const { pathname } = new URL(request.url);
      if (pathname === MANIFEST_PATH) {
        return new Response("missing", { status: 404 });
      }

      return new Response(pathname, { status: 200 });
    });

    await worker.fetch(new Request("https://example.com/custom-elements/form-build/wix-forms.js"), {
      ASSETS: { fetch: assetsFetch },
    });

    const requestedPaths = assetsFetch.mock.calls.map(
      ([request]) => new URL((request as Request).url).pathname,
    );

    expect(requestedPaths).toEqual([MANIFEST_PATH, UNHASHED_ENTRY_PATH]);
  });

  it("passes through other paths untouched", async () => {
    const assetsFetch = vi.fn(async (request: Request) => {
      const { pathname } = new URL(request.url);
      return new Response(pathname, { status: 200 });
    });

    await worker.fetch(new Request("https://example.com/assets/index.js"), {
      ASSETS: { fetch: assetsFetch },
    });

    const requestedPaths = assetsFetch.mock.calls.map(
      ([request]) => new URL((request as Request).url).pathname,
    );

    expect(requestedPaths).toEqual(["/assets/index.js"]);
  });
});
