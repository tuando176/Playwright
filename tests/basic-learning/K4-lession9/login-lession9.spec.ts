import test, { expect } from "@playwright/test";
import { LoginPage } from "../../../POM/login.page";
import { CommentPage } from "../../../POM/comment.page";

test("login success", async ({ page }) => {
  // Khai bao POM
  const loginPage = new LoginPage(page);

  // Dung action trong POM de xu ly
  await loginPage.gotoLogin();
  await loginPage.fillInformation("admin", "%R4d$Jeafp");
  await loginPage.checkRememberMe(false);
  await loginPage.clickLogin();

  // Verify welcome message: "Xin chào! Bạn đã đăng nhập vào khu vực Quản trị của WordPress!"
  const welcomeMessageLoc = page.locator("//div[@class='welcome-panel-header']//h2");
  await expect(welcomeMessageLoc).toHaveText("Xin chào! Bạn đã đăng nhập vào khu vực Quản trị của WordPress!")
});

test("check comment- thao", async ({ page }) => {
  // Khai bao POM
  const commentPage = new CommentPage(page);

  // login
  await commentPage.login('tuando','RAPtor1234',);
  await expect(commentPage.welcomeMsgLoc).toBeVisible();

  // goto comments
  // await dashboardPage.gotoMenu("Phản hồi");
  await commentPage.gotoMenuComment();

  // search comment: "thao"
  await commentPage.fillSearchContent("thao");

  await page.waitForLoadState("networkidle");

  // verify: tất cả các comment: bao gồm Thao ở comment hoặc ở tên tác giả hoawcj noi dung
  // B1: lay ra all comment
  const allComments = await commentPage.listCommentLocs.all();

  // B2: tach: comment, ten tac gia, noi dung
  for (let i = 0; i < allComments.length; i++) {
    const comment = allComments[i];
    const commentChilds = await comment.locator("td").all();
    const commentAuthorAndEmail = commentChilds[0];
    const commentContent = commentChilds[1];

    const author = await commentAuthorAndEmail.locator("strong").textContent() || "";
    const email = await commentAuthorAndEmail.locator("//a[contains(@href, 'mailto')]").textContent() || "";
    const content = await commentContent.textContent() || "";

    const isContainThao = author.toLowerCase().includes("thao")
      || email.toLowerCase().includes("thao")
      || content.toLowerCase().includes("thao");

    // expect(isContainThao).toBeTruthy();
    console.log(`stt: ${i}, content: ${content}`);
    expect(isContainThao).toEqual(true);
  }
  // B3: verify

  // B4: count keyword "vinh"

});



// // Login POM
//  - username
//  - pwd
//  - ...
// // DashboardPOM
//  - welcomeLoc
//  - logoutLoc
//  - menuItemLoc

//  - clickLogout
//  - gotoMenu(name:string)

//  // {Item}POM
//  // CommentPOM


// TC: Verify chức năng search của trang admin:
// - search text: "thao"
// - verify: tất cả các comment: bao gồm Thao ở comment hoặc ở tên tác giả