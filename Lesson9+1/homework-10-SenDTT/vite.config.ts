import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), "");
  return defineConfig({
    plugins: [react()],
    // vite config
    define: {
      API_ENDPOINT: JSON.stringify(env.API_ENDPOINT),
      API_KEY: JSON.stringify(env.API_KEY),
      CITY: JSON.stringify(env.CITY),
    },
  });
});
