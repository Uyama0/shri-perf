import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import compression from "vite-plugin-compression";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/shri-perf/",
  plugins: [preact(), compression({ algorithm: "brotliCompress" })],
  build: {
    minify: "terser",
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
  server: {
    warmup: {
      clientFiles: ["./src/components/devices.jsx", "./src/static.json"],
    },
  },
});
