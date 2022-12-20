import { test, expect } from '@playwright/test';

test('Should add item to cart', async ({ page }) => {
    await page.goto('https://ecommerce-playground.lambdatest.io/');

    await page.locator('span.title', { hasText: 'Mega Menu' }).hover();
    await page.locator('a[title=Desktop]').click();

    await page
        .locator("div.carousel-item.active > img[title='HTC Touch HD']")
        .click();
    await page.locator("#container button[title='Add to Cart']").click();

    await page
        .locator('a.btn.btn-primary.btn-block', { hasText: 'View Cart' })
        .click();
    await expect(
        page.locator('td.text-left', { hasText: 'HTC Touch HD' }),
    ).toBeVisible();
    await expect(page.locator("div[class$='flex-nowrap'] > input")).toHaveValue(
        '1',
    );
});

test('Should add item to cart using API', async ({ page }) => {
    const Url = 'https://ecommerce-playground.lambdatest.io/index.php/';
    await page.goto(Url);
    const response = await page.request.post(Url, {
        params: {
            route: 'checkout/cart/add',
        },
        form: {
            product_id: 28,
            quantity: 1,
        },
    });
    await page.goto(`${Url}?route=checkout/cart`);
    await expect(
        page.locator('td.text-left', { hasText: 'HTC Touch HD' }),
    ).toBeVisible();
    await expect(page.locator("div[class$='flex-nowrap'] > input")).toHaveValue(
        '1',
    );
});
