import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import compression from "vite-plugin-compression";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/shri-perf/",
  plugins: [react(), compression({ algorithm: "brotliCompress" })],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        },
      },
    },
  },
  terserOptions: {
    compress: {
      drop_console: true,
      drop_debugger: true,
    },
  },
  optimizeDeps: {
    include: ["react", "react-dom"],
  },
});
