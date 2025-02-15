// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import astroTypesafeRoutes from "astro-typesafe-routes";
import * as path from "node:path";

// https://astro.build/config
export default defineConfig({
  integrations: [astroTypesafeRoutes()],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  },
});
