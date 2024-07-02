import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  esbuild: {
    jsxInject: `import React from 'react'`, // Ensure React is injected for JSX
    jsxFactory: "React.createElement", // Optional: Specify your JSX factory function
  },
  proxy: {
    "/api": {
      target: "http://localhost:4000",
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, ""),
    },
  },
});
