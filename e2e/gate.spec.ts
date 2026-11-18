import { test, expect } from "@playwright/test";
import { COOKIE, createToken } from "../lib/verify";

test("pengunjung baru diarahkan ke /verify dengan next", async ({ page }) => {
  await page.goto("/status");
  await expect(page).toHaveURL(/\/verify\?next=%2Fstatus/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

test("bot pratinjau lolos tanpa cookie", async ({ browser }) => {
  const ctx = await browser.newContext({ userAgent: "WhatsApp/2.23" });
  const res = await (await ctx.newPage()).goto("/");
  expect(res?.status()).toBe(200);
});

test("api/verify: tanpa token 400, token salah 403", async ({ request }) => {
  expect((await request.post("/api/verify", { data: {} })).status()).toBe(400);
  expect((await request.post("/api/verify", { data: { token: "x" } })).status()).not.toBe(200);
});

test("ganti bahasa tersimpan setelah refresh", async ({ page, context }) => {
  await context.addCookies([{ name: COOKIE, value: createToken(), url: "http://localhost:3000" }]);
  await page.goto("/");
  await page.getByRole("button", { name: "Bahasa Indonesia" }).click();
  await page.reload();
  await expect(page.getByRole("button", { name: "Bahasa Indonesia" })).toHaveAttribute("aria-pressed", "true");
});
