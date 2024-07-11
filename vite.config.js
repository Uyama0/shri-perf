import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import compression from "vite-plugin-compression";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/shri-perf/",
  plugins: [react(), compression({ algorithm: "brotliCompress" })],
  build: {
    minify: "terser",
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
