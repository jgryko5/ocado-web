import * as path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [react()],
    base: env.VITE_SITE_PATH,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build:{
      rollupOptions:{
        input:{
          main: path.resolve(__dirname, "index.html"),
          confirm: path.resolve(__dirname, "confirm.html")
        }
      }
    }
  };
});
