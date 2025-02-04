import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "localhost", // Replace with your system's local IP address
    port: 3000, // Optional, you can specify a port
    strictPort: true, // Ensures the port doesn't change
  },
});
