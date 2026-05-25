import test, { expect } from "@playwright/test";

test.describe("Add - Approve - Delete Comments",  () => {

    const commentContents = "playwright";

    test(" Add - Approve Comments", async ({ page }) => {
        // add comment
        await page.goto("https://shop.congcu.org/2024/02/25/kinh-nghiem-chon-va-thuong-thuc-bia-doc-dao-tren-toan-the-gioi/");
        await page.locator("//textarea[@id='comment']").fill("playwright");
        await page.locator("//input[@id='author']").fill("tuando");
        await page.locator("//input[@id='email']").fill("tdohoang@rbbn.com");
        await page.locator("//input[@id='submit']").click();
        const commentWaiting = page.locator("//em[@class='comment-awaiting-moderation']");
        await expect(commentWaiting).toBeVisible();

        // login admin
        await page.goto("https://shop.congcu.org/wp-login.php");
        await page.locator("//input[@id='user_login']").fill("admin");
        await page.locator("//input[@id='user_pass']").fill("%R4d$Jeafp");
        await page.locator("//input[@id='rememberme']").check();
        await page.locator("//input[@id='wp-submit']").click();
        const welcomeMessageLoc = page.locator("//div[@class='welcome-panel-header']//h2");
        await expect(welcomeMessageLoc).toBeVisible();

        //filter comment đang ở trạng thái chờ
        await page.locator("//li[@class='moderated']//a").click();
        await page.locator(`//tr[@id and contains(normalize-space(), ${commentContents}) and contains(normalize-space(), 'tuando')]//p`).hover();

        // Approve comment
        await page.locator(`//tr[@id and contains(normalize-space(), ${commentContents}) and contains(normalize-space(), 'tuando')]//span[@class='approve']//a`).click();
    });

    test.afterEach(async ({ page }) => {
        // Filter comment được phê duyệt
        await page.locator("//li[@class='approved']//a").click();

        // Hover vào comment muốn xóa
        await page.locator(`//tr[@id and contains(normalize-space(), ${commentContents}) and contains(normalize-space(), 'tuando')]//p`).hover();

        // Xóa comment
        await page.locator(`//tr[@id and contains(normalize-space(), ${commentContents}) and contains(normalize-space(), 'tuando')]//span[@class='trash']//a`).click();
    });
});