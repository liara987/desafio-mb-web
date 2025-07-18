import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: resolve(__dirname, "src"),
      },
    ],
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/assets/scss/mixins" as *;
          @use "@/assets/scss/variables" as *;
        `,
      },
    },
  },
});
