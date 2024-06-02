import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components": `${path.resolve(__dirname, "./src/components")}`,
      "@styles": `${path.resolve(__dirname, "./src/styles")}`,
      "@routes": `${path.resolve(__dirname, "./src/routes")}`,
      "@layout": `${path.resolve(__dirname, "./src/layout")}`,
      "@services": `${path.resolve(__dirname, "./src/services")}`,
      "@context": `${path.resolve(__dirname, "./src/context")}`,
      "@pages": `${path.resolve(__dirname, "./src/pages")}`,
      "@api": `${path.resolve(__dirname, "./src/api")}`,
    },
  },
  build: {
    chunkSizeWarningLimit: 1600,
    outDir: "dist",
    rollupOptions: {
      output: { manualChunks: { vendor: ["react", "react-router-dom"] } },
    },
  },
  server: { historyApiFallback: true },
});
