import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { cloudflare } from "@cloudflare/vite-plugin";
import { glob } from "glob";
import path from "path";

export default defineConfig({
  plugins: [react(), cloudflare()],
  build: {
    rollupOptions: {
      input: Object.fromEntries(
        glob.sync('public/*.html').map(file => [
          // Use the filename without extension as the key
          path.basename(file, '.html'),
          // Use the full path as the value
          file
        ])
      )
    }
  },
  publicDir: 'public'
});
