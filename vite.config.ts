import { defineConfig } from "vite-plus";
import { fileURLToPath, URL } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import { fakeFormsEndpointPlugin } from "./scripts/fakeFormsEndpointPlugin.ts";

export default defineConfig({
  plugins: [vue(), tailwindcss(), fakeFormsEndpointPlugin()],
  server: {
    allowedHosts: ["local.teltonika-networks.com"],
  },
  resolve: {
    alias: {
      src: fileURLToPath(new URL("./src", import.meta.url)),
      public: fileURLToPath(new URL("./public", import.meta.url)),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
  },
  staged: {
    "*": "vp fmt --write",
  },
  lint: { options: { typeAware: true, typeCheck: false } },
  define: {
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development"),
  },
});
