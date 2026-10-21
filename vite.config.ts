import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";

// The site is a single marketing page with no server-side data, so it is
// pre-rendered to static HTML at build time (output: dist/client).
// That folder can be served by any static host — see netlify.toml.
export default defineConfig({
  server: { port: 8080 },
  css: { transformer: "lightningcss" },
  resolve: {
    tsconfigPaths: true,
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"],
  },
  plugins: [
    tailwindcss(),
    tanstackStart({
      server: { entry: "server" },
      prerender: { enabled: true, crawlLinks: false, failOnError: true },
      pages: [{ path: "/" }],
    }),
    viteReact(),
  ],
});
