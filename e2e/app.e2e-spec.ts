import { expect, test } from '@playwright/test';

test('displays the Petclinic welcome page', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Welcome to Petclinic' })).toBeVisible();
});

test('displays backend data on list pages', async ({ page }) => {
  const vets = [
    { id: 1, firstName: 'James', lastName: 'Carter', specialties: [] },
    { id: 2, firstName: 'Helen', lastName: 'Leary', specialties: [{ id: 1, name: 'radiology' }] },
    { id: 3, firstName: 'Linda', lastName: 'Douglas', specialties: [] },
    { id: 4, firstName: 'Rafael', lastName: 'Ortega', specialties: [] },
    { id: 5, firstName: 'Henry', lastName: 'Stevens', specialties: [] },
    { id: 6, firstName: 'Sharon', lastName: 'Jenkins', specialties: [] }
  ];
  const petTypes = ['bird', 'cat', 'dog', 'hamster', 'lizard', 'snake']
    .map((name, index) => ({ id: index + 1, name }));
  const specialties = ['dentistry', 'radiology', 'surgery']
    .map((name, index) => ({ id: index + 1, name }));
  const owners = [
    {
      id: 1,
      firstName: 'George',
      lastName: 'Franklin',
      address: '110 W. Liberty St.',
      city: 'Madison',
      telephone: '6085551023',
      pets: []
    },
    {
      id: 2,
      firstName: 'Betty',
      lastName: 'Davis',
      address: '638 Cardinal Ave.',
      city: 'Sun Prairie',
      telephone: '6085551749',
      pets: []
    },
    {
      id: 4,
      firstName: 'Harold',
      lastName: 'Davis',
      address: '563 Friendly St.',
      city: 'Windsor',
      telephone: '6085553198',
      pets: []
    }
  ];

  await page.route('**/petclinic/api/vets', route => route.fulfill({ json: vets }));
  await page.route('**/petclinic/api/pettypes', route => route.fulfill({ json: petTypes }));
  await page.route('**/petclinic/api/specialties', route => route.fulfill({ json: specialties }));
  await page.route(
    url => url.pathname.endsWith('/petclinic/api/owners'),
    (route, request) => {
      const lastName = new URL(request.url()).searchParams.get('lastName');
      const response = lastName === null
        ? owners
        : owners.filter(owner => owner.lastName.startsWith(lastName));
      return route.fulfill({ json: response });
    }
  );

  await page.goto('/petclinic/vets');
  await expect(page.locator('#vets tbody > tr')).toHaveCount(6);
  await expect(page.locator('#vets')).toContainText('James Carter');
  await expect(page.locator('#vets')).toContainText('radiology');

  await page.goto('/petclinic/pettypes');
  await expect(page.locator('#pettypes tbody > tr')).toHaveCount(6);
  const renderedPetTypes = await page.locator('#pettypes input').evaluateAll(
    inputs => inputs.map(input => (input as HTMLInputElement).value)
  );
  expect(renderedPetTypes).toEqual(expect.arrayContaining(['cat', 'dog']));

  await page.goto('/petclinic/specialties');
  await expect(page.locator('#specialties tbody > tr')).toHaveCount(3);
  const renderedSpecialties = await page.locator('#specialties input').evaluateAll(
    inputs => inputs.map(input => (input as HTMLInputElement).value)
  );
  expect(renderedSpecialties).toEqual(expect.arrayContaining(['dentistry', 'surgery']));

  await page.goto('/petclinic/owners');
  await page.locator('#lastName').fill('Davis');
  await page.getByRole('button', { name: 'Find Owner' }).click();
  await expect(page.getByRole('link', { name: 'Betty Davis' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Harold Davis' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'George Franklin' })).toHaveCount(0);
});
