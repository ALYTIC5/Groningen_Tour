// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/Groningen_Tour/", // MUST match GitHub repo name
  plugins: [react()],
});
