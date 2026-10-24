import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    setupFiles: ["./tests/setup.js"],
    // each file starts its own in-memory MongoDB; the first run downloads the binary
    hookTimeout: 120000,
    testTimeout: 20000,
  },
});
