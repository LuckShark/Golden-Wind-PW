import { test, expect } from "@playwright/test";

test("Examples of PW locators", async ({ page }) => {
  //Navega para a pagina
  await page.goto("https://the-internet.herokuapp.com/login");

  //1 Get by role
  const loginButton = page.getByRole("button", { name: /Login/i });
  await expect(loginButton).toBeVisible();

  const loginHeader = page.getByRole("heading", { name: "Login Page" });
  await expect(loginHeader).toBeVisible();

  //2 Get by text
  const loginHeaderText = page.getByText("Login Page");
  await expect(loginHeaderText).toBeVisible();

  //3 Get by label
  await page.getByLabel("Username").fill("tomsmith");
  await page.getByLabel("Password").fill("SuperSecretPassword!");

  //CSS Selectors (id)
  await page.locator("#username").fill("selected_by_css");

  //tag attribute css
  await page.locator('input[name="password"]').fill("selected_by_attribute");

  //get by class name (also css)
  //EXAMPLE <button class="radius"type="submit"> ...</button>
  await page.locator(".radius").click();

  //finalização
  const errorMessage = page.locator("#flash");
  await expect(errorMessage).toContainText("Your username is invalid!");
});
