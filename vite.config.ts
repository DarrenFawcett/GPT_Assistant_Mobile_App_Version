import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",

      includeAssets: ["images/gpt-icon-brain.png"],

      manifest: {
        name: "KAI Mobile App",
        short_name: "KAI",
        start_url: "/",
        display: "standalone",
        background_color: "#000000",
        theme_color: "#000000",

        icons: [
          {
            src: "images/gpt-icon-brain.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any"
          }
        ]
      }
    })
  ],
  build: { outDir: "dist", emptyOutDir: true }
});
