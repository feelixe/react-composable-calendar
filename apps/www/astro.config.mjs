import * as path from "node:path";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import astroTypesafeRoutes from "astro-typesafe-routes";
// @ts-check
import { defineConfig } from "astro/config";

export default defineConfig({
  integrations: [react(), mdx({}), astroTypesafeRoutes()],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  },
});
