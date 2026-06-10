import { Locator, Page } from "@playwright/test";
import { DashboardPage } from "./dashboard.page";

export class CommentPage extends DashboardPage {
  searchInputLoc: Locator;
  listCommentLocs: Locator;

  constructor(page: Page) {
    console.log('Step1: Khởi tạo Contructor của CommentPage');

    super(page);    // super(page) sẽ gọi vào hàm tạo của class con, ex: LoginPage
    this.searchInputLoc = page.locator("//input[@id='comment-search-input']");
    this.listCommentLocs = page.locator("//tbody[@id='the-comment-list']//tr[contains(@id, 'comment')]");
  }

  async fillSearchContent(comment: string) {
    await this.searchInputLoc.fill(comment);
    await this.page.keyboard.press("Enter");
  }
}