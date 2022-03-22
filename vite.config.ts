import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { resolve } from "path";
import { builtinModules } from "module";

const commonjsPackages = [...builtinModules] as const;

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "./dist",
    sourcemap: false,
    minify: process.env.NODE_ENV === "production",
    lib: {
      entry: resolve(__dirname, "./src/index.tsx"),
      formats: ["cjs"],
      fileName: () => "index.js"
    },
    rollupOptions: {
      external: ["@nodegui/nodegui", "@nodegui/react-nodegui", "@nodegui/qode", "react", ...commonjsPackages],
      plugins: [nodeResolve]
    }
  }
});
