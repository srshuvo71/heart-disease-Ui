import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/heart-disease-Ui/",
  plugins: [react(), tailwindcss()],
});
