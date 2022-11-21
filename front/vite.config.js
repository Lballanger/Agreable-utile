import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { parse } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/styles/main.scss";',
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        chunkFileNames: "front/src/assets/img/shop/articles/[name]-[hash].js",
        entryFileNames: "front/src/assets/img/shop/articles/[name]-[hash].js",

        assetFileNames: ({ name }) => {
          if (/\.(gif|jpe?g|png|svg|jpg)$/.test(name ?? "")) {
            return "assets/[name]-[hash][extname]";
          }

          if (/\.css$/.test(name ?? "")) {
            return "assets/css/[name]-[hash][extname]";
          }

          // default value
          // ref: https://rollupjs.org/guide/en/#outputassetfilenames
          return "assets/[name]-[hash][extname]";
        },
      },
    },
  },
});
