import { defineConfig } from "vite-plus";
import { fileURLToPath, URL } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import { fakeFormsEndpointPlugin } from "./scripts/fakeFormsEndpointPlugin.ts";

const inlineCssAssetsPlugin = () => ({
  name: "inline-css-assets",
  apply: "build" as const,
  enforce: "post" as const,
  generateBundle(
    _: unknown,
    bundle: Record<
      string,
      { type: string; fileName: string; source?: string | Uint8Array; code?: string }
    >,
  ) {
    const cssAssets = Object.entries(bundle).filter(([, file]) => {
      return file.type === "asset" && file.fileName.endsWith(".css");
    });

    if (cssAssets.length === 0) {
      return;
    }

    const combinedCss = cssAssets
      .map(([, file]) => file.source)
      .filter((source): source is string | Uint8Array => source !== undefined)
      .map((source) => (typeof source === "string" ? source : Buffer.from(source).toString("utf8")))
      .join("\n");

    const injectionSnippet =
      "\nconst __wixFormsInlineCss = " +
      JSON.stringify(combinedCss) +
      ';\nif (typeof document !== "undefined" && __wixFormsInlineCss && !document.querySelector("style[data-wix-forms-inline-build-css]")) {\n  const style = document.createElement("style");\n  style.setAttribute("data-wix-forms-inline-build-css", "true");\n  style.textContent = __wixFormsInlineCss;\n  document.head.appendChild(style);\n}\n';

    for (const file of Object.values(bundle)) {
      if (file.type === "chunk" && file.fileName.endsWith(".js") && typeof file.code === "string") {
        file.code += injectionSnippet;
      }
    }

    for (const [assetKey] of cssAssets) {
      delete bundle[assetKey];
    }
  },
});

export default defineConfig({
  plugins: [vue(), tailwindcss(), fakeFormsEndpointPlugin(), inlineCssAssetsPlugin()],
  resolve: {
    alias: {
      src: fileURLToPath(new URL("./src", import.meta.url)),
      public: fileURLToPath(new URL("./public", import.meta.url)),
    },
  },
  build: {
    lib: {
      entry: fileURLToPath(new URL("./src/entrypoints/custom-elements.ts", import.meta.url)),
      formats: ["es"],
      fileName: "wix-forms-custom-elements",
    },
    outDir: "dist/custom-elements",
    emptyOutDir: true,
    sourcemap: true,
  },
});
