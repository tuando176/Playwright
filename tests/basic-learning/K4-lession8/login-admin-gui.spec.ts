import test, { expect } from "@playwright/test";
import { LoginPage } from "../../../POM/login.page";

function makeid(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
};

test.describe("Lesson 8 - POM",  () => {

    test(" Login Admin GUI", async ({ page }) => {
        // login admin
        const loginPage = new LoginPage(page);
        await loginPage.gotoLogin();
        await loginPage.fillInformation("productionuser", "production-account-password", true);
        await loginPage.login();

        await loginPage.performLogin("productionuser", "production-account-password", true);
    });
});