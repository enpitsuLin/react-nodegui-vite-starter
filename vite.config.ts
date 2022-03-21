import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
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
  plugins: [vue(), nativePlugin()],
  build: {
    outDir: "./dist",
    sourcemap: false,
    lib: {
      entry: resolve(__dirname, "./src/main.ts"),
      formats: ["cjs"],
      fileName: () => "index.js"
    },
    rollupOptions: {
      external: ["@nodegui/nodegui"]
    }
  }
});
