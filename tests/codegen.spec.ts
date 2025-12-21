import { test, expect } from "@playwright/test";


test.describe('Codegen test for login', () => {

    test("Positive Login", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/login");
    await page.getByRole("textbox", { name: "Username" }).click();
    await page.getByRole("textbox", { name: "Username" }).fill("tomsmith");
    await page.getByRole("textbox", { name: "Password" }).click();
    await page.getByRole("textbox", { name: "Password" }).fill("SuperSecretPassword!");
    await page.getByRole("button", { name: " Login" }).click();
    await expect(page.locator("#flash")).toContainText("You logged into a secure area! ×");
    });

    test("Negative Login", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/login");
    await page.getByRole("textbox", { name: "Username" }).click();
    await page.getByRole("textbox", { name: "Username" }).fill("failuser");
    await page.getByRole("textbox", { name: "Password" }).click();
    await page.getByRole("textbox", { name: "Password" }).fill("failpass");
    await page.getByRole("button", { name: " Login" }).click();
    await expect(page.locator("#flash")).toContainText("Your username is invalid! ×");
    });

});