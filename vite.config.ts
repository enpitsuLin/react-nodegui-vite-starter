import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { Plugin } from "vite";

function nativePlugin(): Plugin {
  return {
    name: "native-plugin",
    async transform(src, id) {
      if (id.endsWith(".node")) {
        return `
            try {
                global.process.dlopen(module, '${id}');
            } catch(exception) {
                throw new Error('Cannot open  ${id} :'+ exception);
            }
            export default module.exports;
        `;
      }
    }
  };
}

export default defineConfig({
  plugins: [react(), nativePlugin()],
  build: {
    outDir: "./dist",
    sourcemap: false,
    minify: false,
    rollupOptions: {
      input: resolve(__dirname, "./src/index.tsx"),
      output: [
        {
          dir: "./dist",
          format: "cjs",
          entryFileNames: () => {
            return `[name].js`;
          }
        }
      ],
      external: ["@nodegui/nodegui"]
    }
  }
});
