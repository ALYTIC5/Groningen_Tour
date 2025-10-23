// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/Groningen_Tour/", // 👈 add this line
  plugins: [react()],
});