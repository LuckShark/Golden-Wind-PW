//PRIMEIRA AUTOMAÇÃO - SEM POM

import { test, expect } from "@playwright/test";

test.describe("Login test in PTA website", () => {
  const webPageTest = "https://practicetestautomation.com/practice-test-login/";

  test("Positive Login", async ({ page }) => {
    await page.goto(webPageTest);

    const loginHeaderText = page.getByText("Test Login");
    await expect(loginHeaderText).toBeVisible();

    await page.locator("#username").fill("student");
    await page.locator("#password").fill("Password123");

    const submitButton = page.getByRole("button", { name: /Submit/i });
    await expect(submitButton).toBeVisible();

    await submitButton.click();

    const loginSucess = page.getByRole("heading", {
      name: /Logged In Successfully/i,
    });
    await expect(loginSucess).toBeVisible();

    await expect(page).toHaveURL(/logged-in-successfully/);
  });

  test("Negative Login", async ({ page }) => {
    await page.goto(webPageTest);

    const loginHeaderText = page.getByText("Test Login");
    await expect(loginHeaderText).toBeVisible();

    await page.locator("#username").fill("incorrectUser");
    await page.locator("#password").fill("Password123");

    const submitButton = page.getByRole("button", { name: /Submit/i });
    await expect(submitButton).toBeVisible();

    await submitButton.click();

    const loginFail = page.locator("#error");
    await expect(loginFail).toBeVisible();
    await expect(loginFail).toHaveText(/Your username is invalid!/i);
  });

  test("CODEGEN Login", async ({ page }) => {});
});
