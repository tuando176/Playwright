import { test, expect } from '@playwright/test';

// Check Title contains text "Xpath in Selenium"
test('check title', async ({ page }) => {
    await page.goto('https://www.guru99.com/xpath-selenium.html');
    await expect(page).toHaveTitle(/XPath in Selenium: Tutorial/);
});

test('check selenium text', async ({ page }) => {
    await page.goto('https://www.guru99.com/');
    // 2 identical elements, take one first() nth() take the first element
    await page.getByRole('link', { name: 'Selenium' }).nth(0).click();
    // check H2 has text "Selenium Tutorial Syllabus"
    await expect(page.getByRole('heading', { name: 'Selenium Tutorial Syllabus' })).toBeVisible();
});