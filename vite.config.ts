import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { Plugin } from "vite";
import { builtinModules } from "module";

function nativePlugin(): Plugin {
  return {
    name: "native-plugin",
    async transform(src, id) {
      console.log(id);
      
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

const commonjsPackages = [...builtinModules] as const;

export default defineConfig({
  plugins: [nativePlugin(), react()],
  build: {
    outDir: "./dist",
    sourcemap: false,
    minify: false,
    rollupOptions: {
      input: resolve(__dirname, "./src/index.tsx"),
      output: {
        dir: "./dist",
        format: "cjs",
        entryFileNames: (chunk) => {
          return `${chunk.name}.js`;
        }
      },
      external: ["@nodegui/nodegui", "@nodegui/react-nodegui", "@nodegui/qode", "react", ...commonjsPackages]
    }
  }
});
