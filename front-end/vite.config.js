
// import path from "path"; 
// import { fileURLToPath } from "url"; 
// import { defineConfig } from "vite";
// import react, { reactCompilerPreset } from "@vitejs/plugin-react";
// import babel from "@rolldown/plugin-babel";
// import tailwind from "@tailwindcss/postcss";
// import autoprefixer from "autoprefixer";


// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
//   css: {
//     postcss: {
//       plugins: [tailwind, autoprefixer],
//     },
//   },
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
// });

import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import autoprefixer from "autoprefixer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],

  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  build: {
    outDir: "dist",
  },
});