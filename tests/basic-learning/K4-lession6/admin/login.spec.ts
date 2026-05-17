import test, { expect } from "@playwright/test";

test("login success", async ({ page }) => {
  // Goto login page
  await page.goto("https://shop.congcu.org/wp-login.php");

  // Fill username
  await page.locator("//input[@id='user_login']").fill("admin");

  // Fill password
  await page.locator("//input[@id='user_pass']").fill("%R4d$Jeafp");

  // Check remember me
  await page.locator("//input[@id='rememberme']").check();

  // Click login button
  await page.locator("//input[@id='wp-submit']").click();

  // Verify welcome message
  const welcomeMessage = page.locator("//div[@class='welcome-panel-header']//h2");
  await expect(welcomeMessage).toHaveText("Xin chào! Bạn đã đăng nhập vào khu vực Quản trị của WordPress!");
});

test("login failed", async ({ page }) => {
  // Goto login page
  await page.goto("https://shop.congcu.org/wp-login.php");

  // Fill username
  await page.locator("//input[@id='user_login']").fill("admin");

  // Fill password (sai)
  await page.locator("//input[@id='user_pass']").fill("%R4d$Jeafptt");

  // Click login button
  await page.locator("//input[@id='wp-submit']").click();

  // Verify error message
  const errorMsgBlock = page.locator("//div[@id='login_error']");
  await expect(errorMsgBlock).toBeVisible();
//   await expect(errorMsgBlock).toBeHidden();
});

test("logout success", async ({ page }) => {
  // Goto login page
  await page.goto("https://shop.congcu.org/wp-login.php");

  // Fill username
  await page.locator("//input[@id='user_login']").fill("admin");

  // Fill password
  await page.locator("//input[@id='user_pass']").fill("%R4d$Jeafp");

  // Check remember me
  await page.locator("//input[@id='rememberme']").check();

  // Click login button
  await page.locator("//input[@id='wp-submit']").click();

  // Verify welcome message
  const welcomeMessage = page.locator("//div[@class='welcome-panel-header']//h2");
  await expect(welcomeMessage).toHaveText("Xin chào! Bạn đã đăng nhập vào khu vực Quản trị của WordPress!");

  await page.locator("//li[@id='wp-admin-bar-my-account']").hover();

  // Verify logout link is visible
  const logoutLink = page.locator("//li[@id='wp-admin-bar-logout']");
  await expect(logoutLink).toBeVisible();

  // Click logout link
  await logoutLink.click();

  // Verify logout success
  const loginMessage = page.locator("//div[@id='login-message']");
  await expect(loginMessage).toHaveText("Bạn đã đăng xuất thành công.");
});