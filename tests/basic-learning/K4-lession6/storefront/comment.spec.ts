import test, { expect } from "@playwright/test";

test(" add comment",async ({ page }) => {
    // go to page https://shop.congcu.org/
    await page.goto("https://shop.congcu.org/2024/02/25/kinh-nghiem-chon-va-thuong-thuc-bia-doc-dao-tren-toan-the-gioi/");

    // add bình luận
    await page.locator("//textarea[@id='comment']").fill("learning Playwright");

    // add tên
    await page.locator("//input[@id='author']").fill("tuando");

    //add email
    await page.locator("//input[@id='email']").fill("tdohoang@rbbn.com");

    // add trang web

    // click on phản hồi btn
    await page.locator("//input[@id='submit']").click();

    //verify cmt
    const blockCmtLoc = page.locator("//em[@class='comment-awaiting-moderation']");
    await expect(blockCmtLoc).toBeVisible();
});