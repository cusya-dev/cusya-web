import { defineConfig } from "@playwright/test";
// Server uji memakai secret sendiri agar tes bisa membuat cookie verifikasi yang sah.
const env = { NEXT_PUBLIC_TURNSTILE_SITE_KEY: "e2e-site", TURNSTILE_SECRET_KEY: "e2e-secret" };
Object.assign(process.env, env);
export default defineConfig({
  testDir: "e2e",
  use: { baseURL: "http://localhost:3000" },
  webServer: { command: "npm run dev", url: "http://localhost:3000/verify", reuseExistingServer: false, env },
});
