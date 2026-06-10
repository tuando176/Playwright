import { Locator, Page } from "@playwright/test";
import { LoginPage } from "./login.page";

export class DashboardPage extends LoginPage {
  welcomeMsgLoc: Locator;

  constructor(page: Page) {
    console.log('Ham tao cuar DashboardPage');
    // gọi vào hàm tạo của class con, ex: LoginPage
    super(page);
    this.welcomeMsgLoc = page.locator("//div[@class='welcome-panel-header']//h2");
  }

  async gotoMenu(text: string) {
    // Text ~> locator tuowng ung
    let menuId = '';

    switch (text) {
      case 'Phản hồi':
        menuId = 'menu-comments';
        break;
      case 'Comments':
        menuId = 'menu-comments';
        break;
      case 'Comentaris':
        menuId = 'menu-comments';
        break;
    }

    await this.page.locator(`//li[@id='${menuId}']//a`).click();
  }

  async gotoMenuComment() {
    await this.page.locator(`//li[@id='menu-comments']//a`).click();
  }

  async gotoSetting() {
    await this.page.locator(`//li[@id='menu-tools']//a`).click();
  }


}