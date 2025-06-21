import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import vike from "vike/plugin";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), vike()],
  test: {
    environment: "jsdom",
    globals: false,
    setupFiles: "./src/setupTests.ts",
  },
});
