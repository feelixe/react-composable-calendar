import * as path from "node:path";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import astroTypesafeRoutes from "astro-typesafe-routes";
import { defineConfig } from "astro/config";

export default defineConfig({
  integrations: [react(), mdx({}), astroTypesafeRoutes()],
  vite: {
    plugins: [tailwindcss()],
    assetsInclude: ["**/*.txt"],
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dir, "src"),
      },
    },
  },
});
