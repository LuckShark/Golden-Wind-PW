import { test, expect } from "@playwright/test";

//para atualizar um snapshot alterado: npx playwright test --update-snapshots

test.describe("Visual Testing", () => {
  test("Plain screenshot captured of Login page", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/login");
    await expect(page).toHaveScreenshot();
    console.log("Baseline screenshot captured sucessfully");
  });

  test("Full page screenshot captured of Login page", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/login");
    await expect(page).toHaveScreenshot({ fullPage: true });
  });

  //Visual check specific element
  test("Visual check of login button", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/login");
    const loginButton = page.getByRole("button", { name: "Login" });
    await expect(loginButton).toHaveScreenshot("login-button-screenshot.png");
  });

  //Masking sensitive information in screenshots
  test("Masking screenshot of login page", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/login");
    await expect(page).toHaveScreenshot("login-info-masked.png", {
      fullPage: true,
      mask: [page.locator("#username"), page.locator("#password")],
    });
  });
});
