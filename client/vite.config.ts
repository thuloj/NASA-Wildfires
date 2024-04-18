import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
// export default defineConfig({
//   server: {
//     proxy: {
//       "/energy": {
//         target: "http://localhost:3000",
//       },
//       "/heatmaps": {
//         target: "http://localhost:3000",
//       },
//     }
//   },
//   plugins: [react()],
//   base: '/ITWS4500-S23-CosmicComets/nasa-project/client/dist/'
// })

export default defineConfig({
  plugins: [react()],
  base: "./",
});
