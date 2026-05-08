import { defineConfig } from "vite-plus";
import { fileURLToPath, URL } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import { fakeFormsEndpointPlugin } from "./scripts/fakeFormsEndpointPlugin.ts";

const extractWixFormsStyles = (code: string): string | null => {
  const inlineTemplateMatch = code.match(
    /export const wixFormsStyles = String\.raw`([\s\S]*?)`;\s*$/,
  );
  if (inlineTemplateMatch) {
    return inlineTemplateMatch[1];
  }

  const wrappedLiteralMatch = code.match(/String\.raw`\$\{("(?:(?:\\.|[^"\\])*)")\}`/);
  if (!wrappedLiteralMatch) {
    return null;
  }

  try {
    return JSON.parse(wrappedLiteralMatch[1]) as string;
  } catch {
    return null;
  }
};

const escapeForRawTemplate = (styles: string) =>
  styles.replace(/`/g, "\\`").replace(/\$\{/g, "\\${");

const toWixFormsStyleInlineConstantCode = (identifier: string, styles: string) =>
  `const ${identifier} = String.raw\`${escapeForRawTemplate(styles)}\`;\n`;

const stripCssComments = (styles: string) => styles.replace(/\/\*[\s\S]*?\*\//g, "");

const addGlobalBuildShims = () => ({
  name: "add-global-build-shims",
  apply: "build" as const,
  enforce: "post" as const,
  generateBundle(
    _: unknown,
    bundle: Record<
      string,
      { type: string; fileName: string; source?: string | Uint8Array; code?: string }
    >,
  ) {
    const shimSnippet = `// It is necessary to define globalThis, MathMLElement, and WorkerGlobalScope for successful building of the wix-forms.js file before publishing the website.
if (typeof globalThis === "undefined") {
  var globalThis = this;
}

if (typeof MathMLElement === "undefined") {
  var MathMLElement = function MathMLElement() {};
}

if (typeof WorkerGlobalScope === "undefined") {
  var WorkerGlobalScope = function WorkerGlobalScope() {};
}

`;

    for (const file of Object.values(bundle)) {
      if (
        file.type === "chunk" &&
        file.fileName === "form-build/wix-forms.js" &&
        typeof file.code === "string"
      ) {
        file.code = shimSnippet + file.code;
      }
    }
  },
});

const finalizeWixFormsStyleBuild = () => ({
  name: "finalize-wix-forms-style-build",
  apply: "build" as const,
  enforce: "post" as const,
  generateBundle(
    _: unknown,
    bundle: Record<
      string,
      { type: string; fileName: string; source?: string | Uint8Array; code?: string }
    >,
  ) {
    const styleEntryKey = Object.keys(bundle).find((key) => {
      const file = bundle[key];
      return file?.type === "chunk" && file.fileName === "form-build/wix-forms-style.js";
    });
    const mainEntryKey = Object.keys(bundle).find(
      (key) =>
        bundle[key]?.type === "chunk" &&
        bundle[key]?.fileName === "form-build/wix-forms.js" &&
        typeof bundle[key]?.code === "string",
    );
    const sharedStyleChunkKey = Object.keys(bundle).find((key) => {
      const file = bundle[key];
      return (
        file?.type === "chunk" &&
        file.fileName !== "form-build/wix-forms-style.js" &&
        /^wix-forms-style-.*\.js$/.test(file.fileName) &&
        typeof file.code === "string"
      );
    });

    if (!styleEntryKey) {
      return;
    }

    const styleEntry = bundle[styleEntryKey];
    if (styleEntry.type !== "chunk" || typeof styleEntry.code !== "string") {
      return;
    }

    if (sharedStyleChunkKey) {
      const sharedStyleChunk = bundle[sharedStyleChunkKey];
      if (sharedStyleChunk?.type === "chunk" && typeof sharedStyleChunk.code === "string") {
        styleEntry.code = sharedStyleChunk.code.replace(/\/\/# sourceMappingURL=.*\n?$/, "");
      }

      if (mainEntryKey) {
        const mainEntry = bundle[mainEntryKey];
        if (mainEntry?.type === "chunk" && typeof mainEntry.code === "string") {
          mainEntry.code = mainEntry.code.replace(
            /from "\.\.\/wix-forms-style-[^"]+\.js";/,
            'from "./wix-forms-style.js";',
          );
        }
      }

      delete bundle[sharedStyleChunkKey];
      const sharedMapKey = `${sharedStyleChunkKey}.map`;
      if (bundle[sharedMapKey]) {
        delete bundle[sharedMapKey];
      }
    }

    const baseStyles = extractWixFormsStyles(styleEntry.code);
    if (baseStyles === null) {
      return;
    }

    const cssAssets = Object.entries(bundle).filter(
      ([, file]) => file.type === "asset" && file.fileName.endsWith(".css"),
    );

    const combinedCss = cssAssets
      .map(([, file]) => file.source)
      .filter((source): source is string | Uint8Array => source !== undefined)
      .map((source) => (typeof source === "string" ? source : Buffer.from(source).toString("utf8")))
      .join("\n");

    const finalStyles = combinedCss ? `${baseStyles}\n${combinedCss}` : baseStyles;
    const minifiedStyles = stripCssComments(finalStyles);

    if (mainEntryKey) {
      const mainEntry = bundle[mainEntryKey];
      if (mainEntry?.type === "chunk" && typeof mainEntry.code === "string") {
        mainEntry.code = mainEntry.code.replace(
          /^\s*import \{ ([$\w]+) as ([$\w]+) \} from "\.\/wix-forms-style\.js";/m,
          'import { wixFormsStyles as $2 } from "./wix-forms-style.js";',
        );

        const inlineStyleImportMatch = mainEntry.code.match(
          /^\s*import \{ wixFormsStyles as ([$\w]+) \} from "\.\/wix-forms-style\.js";\n?/m,
        );

        if (inlineStyleImportMatch) {
          const styleIdentifier = inlineStyleImportMatch[1];
          mainEntry.code = mainEntry.code.replace(
            /^\s*import \{ wixFormsStyles as ([$\w]+) \} from "\.\/wix-forms-style\.js";\n?/m,
            toWixFormsStyleInlineConstantCode(styleIdentifier, minifiedStyles),
          );
        }
      }
    }

    for (const [assetKey] of cssAssets) {
      delete bundle[assetKey];
    }

    delete bundle[styleEntryKey];
    const styleMapKey = `${styleEntryKey}.map`;
    if (bundle[styleMapKey]) {
      delete bundle[styleMapKey];
    }
  },
});

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    fakeFormsEndpointPlugin(),
    addGlobalBuildShims(),
    finalizeWixFormsStyleBuild(),
  ],
  resolve: {
    alias: {
      src: fileURLToPath(new URL("./src", import.meta.url)),
      public: fileURLToPath(new URL("./public", import.meta.url)),
    },
  },
  build: {
    target: "es2020",
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    lib: {
      entry: {
        "form-build/wix-forms": fileURLToPath(
          new URL("./src/form-build/wix-forms.ts", import.meta.url),
        ),
        "form-build/wix-forms-style": fileURLToPath(
          new URL("./src/form-build/wix-forms-style.ts", import.meta.url),
        ),
      },
      formats: ["es"],
      fileName: (_format, entryName) => `${entryName}.js`,
    },
    outDir: "dist/custom-elements",
    emptyOutDir: true,
    sourcemap: false,
  },
});
