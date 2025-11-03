import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SERVER_PORT = process.env.SERVER_PORT ?? 3000;

export default defineConfig({
  root: __dirname,
  plugins: [vue()],
  server: {
    proxy: {
      // anything starting with /api goes to your API server
      "/api": {
        target: `http://localhost:${SERVER_PORT}`,
        changeOrigin: true,
        // if the API is self-signed https in dev, add `secure: false`
      },
    },
  },
});
