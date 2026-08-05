import { expect, test } from '@playwright/test';

test('displays the Petclinic welcome page', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Welcome to Petclinic' })).toBeVisible();
});

test('displays backend data on list pages', async ({ page }) => {
  await page.goto('/petclinic/vets');
  await expect(page.locator('#vets tbody > tr')).toHaveCount(6);
  await expect(page.locator('#vets')).toContainText('James Carter');
  await expect(page.locator('#vets')).toContainText('radiology');

  await page.goto('/petclinic/pettypes');
  await expect(page.locator('#pettypes tbody > tr')).toHaveCount(6);
  const petTypes = await page.locator('#pettypes input').evaluateAll(
    inputs => inputs.map(input => (input as HTMLInputElement).value)
  );
  expect(petTypes).toEqual(expect.arrayContaining(['cat', 'dog']));

  await page.goto('/petclinic/specialties');
  await expect(page.locator('#specialties tbody > tr')).toHaveCount(3);
  const specialties = await page.locator('#specialties input').evaluateAll(
    inputs => inputs.map(input => (input as HTMLInputElement).value)
  );
  expect(specialties).toEqual(expect.arrayContaining(['dentistry', 'surgery']));

  await page.goto('/petclinic/owners');
  await page.locator('#lastName').fill('Davis');
  await page.getByRole('button', { name: 'Find Owner' }).click();
  await expect(page.getByRole('link', { name: 'Betty Davis' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Harold Davis' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'George Franklin' })).toHaveCount(0);
});
