import { Locator, Page } from "@playwright/test";

export class LoginPage {
  page: Page;

  // Property
  loginUrl!: string;

  emailLoc: Locator;
  passwordLoc: Locator;
  remberLoc: Locator;
  loginLoc: Locator;

  constructor(page: Page, loginUrl: string) {
    this.page = page;
    this.emailLoc = page.locator("//input[@id='user_login']")
    this.passwordLoc = page.locator("//input[@id='user_pass']")
    this.remberLoc = page.locator("//input[@id='rememberme']")
    this.loginLoc = page.locator("//input[@id='wp-submit']")
  }

  // MEthod / function
  async gotoLogin() {
    await this.page.goto("https://shop.congcu.org/wp-login.php");
  }

  async fillInformation(email: string, password: string, isRemember: boolean) {
    await this.emailLoc.fill(email);
    await this.passwordLoc.fill(password);
    if (isRemember) {
      await this.remberLoc.check();
    }
  }

  async login() {
    await this.loginLoc.click();
  }

  async performLogin(username: string, password: string, isRemember: boolean) {
    await this.gotoLogin();
    await this.fillInformation(username, password, isRemember);
    await this.login();
  }

  async chooseLanguage(languageName: string) {
    // Select language with name
    await this.page.locator("//select[@id='language-switcher-locales']").selectOption({
      label: languageName,
    });
  }

}