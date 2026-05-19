import test, { expect } from "@playwright/test";

test("comment and approve", async ({ page }) => {
  // Comment
  await page.goto("https://shop.congcu.org/")
  await page.locator("//a[normalize-space()='Kinh Nghiệm Chọn và Thưởng Thức Bia Độc Đáo Trên Toàn Thế Giới']").click()
  await page.locator("//textarea [@id='comment'] ").fill("Tuan Do say: Uống bia ra đường công an tóm");
  await page.locator("//input [@id='author']").fill("Tuan Do");
  await page.locator("//input [@id='email']").fill("dhtuan1@tma.com.vn");
  await page.locator("//input [@id='url']").fill("facebook.com");
  await page.locator("//input[@id='wp-comment-cookies-consent']").check();
  await page.locator("//input [@id='submit']").click();

  const commentWaiting = page.locator("//em[@class='comment-awaiting-moderation']");
  await expect(commentWaiting).toBeVisible();

  // Approve
  // Goto  login page
  await page.goto("https://shop.congcu.org/wp-login.php");

  // Fill username
  await page.locator("//input[@id='user_login']").fill("admin");

  // Fill password
  await page.locator("//input[@id='user_pass']").fill("%R4d$Jeafp");

  // Check remember me
  await page.locator("//input[@id='rememberme']").check();

  // Click login button
  await page.locator("//input[@id='wp-submit']").click();

  // Click Comments
  await page.locator("//a[@href='edit-comments.php']").first().click();

  // Click Pending
  await page.locator("//li[@class='moderated']//a").click();

  // Hover Approve button
  await page.locator("//tr[@id and contains(normalize-space(), 'Tuan Do') and contains(normalize-space(), 'Tuan Do say: Uống bia ra đường công an tóm')]//p").hover();

  // Click Approve button
  await page.locator("//tr[@id and contains(normalize-space(), 'Tuan Do') and contains(normalize-space(), 'Tuan Do say: Uống bia ra đường công an tóm')]//span[@class= 'approve']//a").click();

  // Go to shop.congcu.org
  await page.goto("https://shop.congcu.org/")
  await page.locator("//a[normalize-space()='Kinh Nghiệm Chọn và Thưởng Thức Bia Độc Đáo Trên Toàn Thế Giới']").click();
  
  const commentDisplay = page.locator("//li[@id and contains(normalize-space(), 'Tuan Do') and contains(normalize-space(), 'Tuan Do say: Uống bia ra đường công an tóm')]");
  await expect(commentDisplay).toBeVisible();

  await page.close();
});