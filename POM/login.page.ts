import { Locator, Page } from "@playwright/test";

export class LoginPage {
  page: Page;

  // Property
  loginUrl!: string;
  emailLoc: Locator;
  passwordLoc: Locator;
  rememberMeLoc: Locator;
  loginButtonLoc: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailLoc = page.locator("//input[@id='user_login']")
    this.passwordLoc = page.locator("//input[@id='user_pass']")
    this.rememberMeLoc = page.locator("//input[@id='rememberme']")
    this.loginButtonLoc = page.locator("//input[@id='wp-submit']")
  };

  // MEthod / function
  async gotoLogin() {
    await this.page.goto("https://shop.congcu.org/wp-login.php");
  };

  async fillInformation(email: string, password: string) {
    await this.emailLoc.fill(email);
    await this.passwordLoc.fill(password);
  };

  async checkRememberMe(isCheck: boolean = true) {
    if (isCheck) {
      await this.rememberMeLoc.check();
    }
  }

  async clickLogin() {
    await this.loginButtonLoc.click();
  };

  async login(username: string, password: string, isRemember: boolean = true) {
    await this.gotoLogin();
    await this.fillInformation(username, password);
    await this.checkRememberMe(false);
    await this.clickLogin();
  };

  async chooseLanguage(languageName: string) {
    // Select language with name
    await this.page.locator("//select[@id='language-switcher-locales']").selectOption({
      label: languageName,
    });
  };

};