import { expect, Page, test } from '@playwright/test';

const owner = {
  id: 1,
  firstName: 'George',
  lastName: 'Franklin',
  address: '110 W. Liberty St.',
  city: 'Madison',
  telephone: '6085551023',
  pets: [
    {
      id: 1,
      name: 'Leo',
      birthDate: '2010-09-07',
      type: { id: 1, name: 'cat' },
      visits: []
    }
  ]
};

const vets = [
  {
    id: 1,
    firstName: 'James',
    lastName: 'Carter',
    specialties: [{ id: 1, name: 'radiology' }]
  }
];

async function mockBackend(page: Page) {
  await page.route('http://localhost:9966/petclinic/api/**', async route => {
    const url = new URL(route.request().url());
    const resource = url.pathname.replace('/petclinic/api/', '');

    if (resource === 'owners' || resource.startsWith('owners?')) {
      await route.fulfill({ json: [owner] });
      return;
    }
    if (resource === 'owners/1') {
      await route.fulfill({ json: owner });
      return;
    }
    if (resource === 'vets') {
      await route.fulfill({ json: vets });
      return;
    }
    if (resource === 'specialties') {
      await route.fulfill({ json: [{ id: 1, name: 'radiology' }] });
      return;
    }

    await route.fulfill({ json: [] });
  });
}

test.beforeEach(async ({ page }) => {
  await mockBackend(page);
});

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
test('desktop dropdowns open and navigate to owners and veterinarians', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('button', { name: 'Owners' }).click();
  const ownersMenu = page.getByRole('button', { name: 'Owners' }).locator('..').locator('.dropdown-menu');
  await expect(ownersMenu).toBeVisible();
  await ownersMenu.getByRole('link', { name: 'Search' }).click();
  await expect(page).toHaveURL(/\/petclinic\/owners$/);
  await expect(page.getByRole('heading', { name: 'Owners' })).toBeVisible();

  await page.getByRole('button', { name: 'Veterinarians' }).click();
  const vetsMenu = page.getByRole('button', { name: 'Veterinarians' }).locator('..').locator('.dropdown-menu');
  await expect(vetsMenu).toBeVisible();
  await vetsMenu.getByRole('link', { name: 'All' }).click();
  await expect(page).toHaveURL(/\/petclinic\/vets$/);
  await expect(page.getByRole('heading', { name: 'Veterinarians' })).toBeVisible();
});

test('mobile navbar toggler expands and collapses the menu', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  const toggler = page.getByRole('button', { name: 'Toggle navigation' });
  const menu = page.locator('#petclinicNavbar');
  await expect(toggler).toBeVisible();
  await expect(menu).not.toHaveClass(/show/);

  await toggler.click();
  await expect(toggler).toHaveAttribute('aria-expanded', 'true');
  await expect(menu).toHaveClass(/show/);

  await toggler.click();
  await expect(toggler).toHaveAttribute('aria-expanded', 'false');
  await expect(menu).not.toHaveClass(/show/);
});

test('owner form displays Bootstrap invalid state and feedback', async ({ page }) => {
  await page.goto('/petclinic/owners/add');

  const firstName = page.getByLabel('First Name');
  await firstName.fill('123');
  await firstName.blur();

  await expect(firstName).toHaveClass(/is-invalid/);
  await expect(page.getByText('First name must consist of letters only')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Add Owner' })).toBeDisabled();
});

for (const viewport of [
  { name: 'desktop', width: 1280, height: 900 },
  { name: 'mobile', width: 390, height: 844 }
]) {
  test(`welcome, list, detail, and form pages are usable on ${viewport.name}`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });

    const pages = [
      { path: '/', heading: 'Welcome to Petclinic' },
      { path: '/petclinic/owners', heading: 'Owners' },
      { path: '/petclinic/owners/1', heading: 'Owner Information' },
      { path: '/petclinic/owners/add', heading: 'New Owner' }
    ];

    for (const target of pages) {
      await page.goto(target.path);
      await expect(page.getByRole('heading', { name: target.heading })).toBeVisible();
      await expect(page.locator('main')).toBeVisible();
    }

    await testInfo.attach(`petclinic-${viewport.name}.png`, {
      body: await page.screenshot({ fullPage: true }),
      contentType: 'image/png'
    });
  });
}
