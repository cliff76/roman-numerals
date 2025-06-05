import { test, expect } from '@playwright/test';

test.describe('Roman Numeral Converter', () => {
  test('should convert 3943 to MMMCMXLIII', async ({ page }) => {
    // Navigate to the application
    await page.goto('/');

    // Get the input field and enter 3943
    const input = page.locator('input[type="text"]');
    await input.fill('3943');

    // Click the convert button
    const convertButton = page.getByRole('button');
    await convertButton.click();

    // Wait for the result to appear
    const result = page.getByTestId('converted-number');
    await expect(result).toBeVisible();

    // Verify the result is MMMCMXLIII
    await expect(result).toHaveText('MMMCMXLIII');
  });
});
