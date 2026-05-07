import { defineConfig } from "vite-plus";
import { fileURLToPath, URL } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import { fakeFormsEndpointPlugin } from "./scripts/fakeFormsEndpointPlugin.ts";

export default defineConfig({
  plugins: [vue(), tailwindcss(), fakeFormsEndpointPlugin()],
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
