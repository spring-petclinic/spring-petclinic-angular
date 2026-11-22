import { expect, Page, test } from '@playwright/test';

const initialOwners = [
  {
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
        ownerId: 1,
        visits: [] as { id: number; date: string; description: string; petId?: number }[]
      }
    ]
  }
];

const initialVets = [
  {
    id: 1,
    firstName: 'James',
    lastName: 'Carter',
    specialties: [{ id: 1, name: 'radiology' }]
  }
];

const initialPetTypes = [
  { id: 1, name: 'cat' },
  { id: 2, name: 'dog' }
];

const initialSpecialties = [
  { id: 1, name: 'radiology' },
  { id: 2, name: 'surgery' }
];

async function mockBackend(page: Page) {
  const owners = structuredClone(initialOwners);
  const vets = structuredClone(initialVets);
  const petTypes = structuredClone(initialPetTypes);
  const specialties = structuredClone(initialSpecialties);
  let nextPetId = 2;
  let nextVisitId = 1;
  let nextPetTypeId = 3;
  let nextSpecialtyId = 3;

  await page.route('http://localhost:9966/petclinic/api/**', async route => {
    const request = route.request();
    const method = request.method();
    const url = new URL(request.url());
    const resource = url.pathname.replace('/petclinic/api/', '');

    if (resource === 'owners') {
      if (method === 'GET') {
        const lastName = url.searchParams.get('lastName');
        if (lastName !== null) {
          const matches = owners.filter(o => o.lastName.startsWith(lastName));
          await route.fulfill(matches.length > 0 ? { json: matches } : { status: 404 });
          return;
        }
        await route.fulfill({ json: owners });
        return;
      }
      if (method === 'POST') {
        const body = request.postDataJSON();
        const created = { ...body, id: owners.length + 1, pets: [] };
        owners.push(created);
        await route.fulfill({ status: 201, json: created });
        return;
      }
    }

    const ownerMatch = resource.match(/^owners\/(\d+)$/);
    if (ownerMatch) {
      const ownerId = Number(ownerMatch[1]);
      const existing = owners.find(o => o.id === ownerId);
      if (method === 'GET') {
        await route.fulfill(existing ? { json: existing } : { status: 404 });
        return;
      }
      if (method === 'PUT' && existing) {
        Object.assign(existing, request.postDataJSON(), { id: existing.id, pets: existing.pets });
        await route.fulfill({ status: 204, json: existing });
        return;
      }
    }

    const ownerPetsMatch = resource.match(/^owners\/(\d+)\/pets$/);
    if (ownerPetsMatch && method === 'POST') {
      const ownerId = Number(ownerPetsMatch[1]);
      const targetOwner = owners.find(o => o.id === ownerId);
      const body = request.postDataJSON();
      const createdPet = {
        id: nextPetId++,
        name: body.name,
        birthDate: body.birthDate,
        type: body.type,
        ownerId,
        visits: []
      };
      targetOwner?.pets.push(createdPet);
      await route.fulfill({ status: 201, json: createdPet });
      return;
    }

    const petMatch = resource.match(/^pets\/(\d+)$/);
    if (petMatch) {
      const petId = Number(petMatch[1]);
      const ownerWithPet = owners.find(o => o.pets.some(p => p.id === petId));
      const existingPet = ownerWithPet?.pets.find(p => p.id === petId);
      if (method === 'GET' && existingPet && ownerWithPet) {
        await route.fulfill({ json: { ...existingPet, ownerId: ownerWithPet.id } });
        return;
      }
      if (method === 'PUT' && existingPet) {
        const body = request.postDataJSON();
        Object.assign(existingPet, { name: body.name, birthDate: body.birthDate, type: body.type });
        await route.fulfill({ status: 204, json: existingPet });
        return;
      }
    }

    const petVisitsMatch = resource.match(/^owners\/(\d+)\/pets\/(\d+)\/visits$/);
    if (petVisitsMatch && method === 'POST') {
      const ownerId = Number(petVisitsMatch[1]);
      const petId = Number(petVisitsMatch[2]);
      const targetPet = owners.find(o => o.id === ownerId)?.pets.find(p => p.id === petId);
      const body = request.postDataJSON();
      const createdVisit = {
        id: nextVisitId++,
        date: body.date,
        description: body.description,
        petId
      };
      targetPet?.visits.push(createdVisit);
      await route.fulfill({ status: 201, json: createdVisit });
      return;
    }

    if (resource === 'vets') {
      if (method === 'GET') {
        await route.fulfill({ json: vets });
        return;
      }
      if (method === 'POST') {
        const body = request.postDataJSON();
        const created = { ...body, id: vets.length + 1 };
        vets.push(created);
        await route.fulfill({ status: 201, json: created });
        return;
      }
    }

    const vetMatch = resource.match(/^vets\/(\d+)$/);
    if (vetMatch) {
      const vetId = Number(vetMatch[1]);
      const existingVet = vets.find(v => v.id === vetId);
      if (method === 'GET' && existingVet) {
        await route.fulfill({ json: existingVet });
        return;
      }
      if (method === 'PUT' && existingVet) {
        Object.assign(existingVet, request.postDataJSON(), { id: existingVet.id });
        await route.fulfill({ status: 204, json: existingVet });
        return;
      }
    }

    if (resource === 'pettypes') {
      if (method === 'GET') {
        await route.fulfill({ json: petTypes });
        return;
      }
      if (method === 'POST') {
        const body = request.postDataJSON();
        const created = { id: nextPetTypeId++, name: body.name };
        petTypes.push(created);
        await route.fulfill({ status: 201, json: created });
        return;
      }
    }

    const petTypeMatch = resource.match(/^pettypes\/(\d+)$/);
    if (petTypeMatch) {
      const typeId = Number(petTypeMatch[1]);
      const index = petTypes.findIndex(t => t.id === typeId);
      if (method === 'GET' && index !== -1) {
        await route.fulfill({ json: petTypes[index] });
        return;
      }
      if (method === 'PUT' && index !== -1) {
        Object.assign(petTypes[index], request.postDataJSON(), { id: typeId });
        await route.fulfill({ status: 204, json: petTypes[index] });
        return;
      }
      if (method === 'DELETE' && index !== -1) {
        petTypes.splice(index, 1);
        await route.fulfill({ status: 204 });
        return;
      }
    }

    if (resource === 'specialties') {
      if (method === 'GET') {
        await route.fulfill({ json: specialties });
        return;
      }
      if (method === 'POST') {
        const body = request.postDataJSON();
        const created = { id: nextSpecialtyId++, name: body.name };
        specialties.push(created);
        await route.fulfill({ status: 201, json: created });
        return;
      }
    }

    const specialtyMatch = resource.match(/^specialties\/(\d+)$/);
    if (specialtyMatch) {
      const specId = Number(specialtyMatch[1]);
      const index = specialties.findIndex(s => s.id === specId);
      if (method === 'GET' && index !== -1) {
        await route.fulfill({ json: specialties[index] });
        return;
      }
      if (method === 'PUT' && index !== -1) {
        Object.assign(specialties[index], request.postDataJSON(), { id: specId });
        await route.fulfill({ status: 204, json: specialties[index] });
        return;
      }
      if (method === 'DELETE' && index !== -1) {
        specialties.splice(index, 1);
        await route.fulfill({ status: 204 });
        return;
      }
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
  await expect(page.getByText('First name may only contain letters')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Add Owner' })).toBeDisabled();
});

test('creates a new owner and displays it in the owners list', async ({ page }) => {
  await page.goto('/petclinic/owners/add');

  await page.getByLabel('First Name').fill('Betty');
  await page.getByLabel('Last Name').fill('Davis');
  await page.getByLabel('Address').fill('638 Cardinal Ave.');
  await page.getByLabel('City').fill('Sun Prairie');
  await page.getByLabel('Telephone').fill('6085551749');
  await page.getByRole('button', { name: 'Add Owner' }).click();

  await expect(page).toHaveURL(/\/petclinic\/owners$/);
  await expect(page.getByRole('link', { name: 'Betty Davis' })).toBeVisible();
  await expect(page.locator('#ownersTable')).toContainText('638 Cardinal Ave.');
  await expect(page.locator('#ownersTable')).toContainText('Sun Prairie');
  await expect(page.locator('#ownersTable')).toContainText('6085551749');
});

test('edits an existing owner and displays updated details', async ({ page }) => {
  await page.goto('/petclinic/owners/1');
  await page.getByRole('button', { name: 'Edit Owner' }).click();
  await expect(page).toHaveURL(/\/petclinic\/owners\/1\/edit$/);

  await expect(page.getByLabel('First Name')).toHaveValue('George');
  await page.getByLabel('First Name').fill('Gregory');
  await page.getByLabel('Address').fill('220 E. Washington Ave.');
  await page.getByLabel('City').fill('Middleton');
  await page.getByLabel('Telephone').fill('6085559999');
  await page.getByRole('button', { name: 'Update Owner' }).click();

  await expect(page).toHaveURL(/\/petclinic\/owners\/1$/);
  await expect(page.locator('.ownerFullName')).toHaveText('Gregory Franklin');
  await expect(page.locator('table').first()).toContainText('220 E. Washington Ave.');
  await expect(page.locator('table').first()).toContainText('Middleton');
  await expect(page.locator('table').first()).toContainText('6085559999');
});

test('displays message when owner search returns no results', async ({ page }) => {
  await page.goto('/petclinic/owners');

  await page.locator('#lastName').fill('Unknown');
  await page.getByRole('button', { name: 'Find Owner' }).click();

  await expect(page.getByText('No owners with LastName starting with "Unknown"')).toBeVisible();
  await expect(page.locator('#ownersTable')).toHaveCount(0);
});

test('adds and edits a pet from the owner detail page', async ({ page }) => {
  await page.goto('/petclinic/owners/1');
  await page.getByRole('button', { name: 'Add New Pet' }).click();
  await expect(page).toHaveURL(/\/petclinic\/owners\/1\/pets\/add$/);

  await expect(page.locator('#owner_name')).toHaveValue('George Franklin');
  await expect(page.locator('#typeId option')).toHaveCount(2);
  await page.getByLabel('Name').fill('Rosy');
  await page.getByLabel('Birth Date').fill('2023/05/15');
  await page.getByLabel('Type').selectOption({ label: 'dog' });
  await page.getByRole('button', { name: 'Save Pet' }).click();

  await expect(page).toHaveURL(/\/petclinic\/owners\/1$/);
  await expect(page.locator('app-pet-list')).toHaveCount(2);
  await expect(page.locator('app-pet-list').nth(1)).toContainText('Rosy');
  await expect(page.locator('app-pet-list').nth(1)).toContainText('2023-05-15');
  await expect(page.locator('app-pet-list').nth(1)).toContainText('dog');

  await page.locator('app-pet-list').first().getByRole('button', { name: 'Edit Pet' }).click();
  await expect(page).toHaveURL(/\/petclinic\/pets\/1\/edit$/);
  await expect(page.locator('#owner_name')).toHaveValue('George Franklin');
  await expect(page.getByLabel('Name')).toHaveValue('Leo');
  await page.getByLabel('Name').fill('Leo II');
  await page.getByRole('button', { name: 'Update Pet' }).click();

  await expect(page).toHaveURL(/\/petclinic\/owners\/1$/);
  await expect(page.locator('app-pet-list').first()).toContainText('Leo II');
});

test('adds a visit for a pet from the owner detail page', async ({ page }) => {
  await page.goto('/petclinic/owners/1');
  await page.getByRole('button', { name: 'Add Visit' }).click();
  await expect(page).toHaveURL(/\/petclinic\/pets\/1\/visits\/add$/);

  await expect(page.locator('table').first()).toContainText('George Franklin');
  await page.getByLabel('Date').fill('2024/03/10');
  await page.getByLabel('Description').fill('rabies shot');
  await page.getByRole('button', { name: 'Add Visit' }).click();

  await expect(page).toHaveURL(/\/petclinic\/owners\/1$/);
  await expect(page.locator('app-visit-list')).toContainText('2024-03-10');
  await expect(page.locator('app-visit-list')).toContainText('rabies shot');
});

test('adds and edits a veterinarian including specialties selection', async ({ page }) => {
  await page.goto('/petclinic/vets');
  await page.getByRole('button', { name: 'Add Vet' }).click();
  await expect(page).toHaveURL(/\/petclinic\/vets\/add$/);

  await expect(page.locator('#specialties option')).toHaveCount(2);
  await page.getByLabel('First Name').fill('Helen');
  await page.getByLabel('Last Name').fill('Leary');
  await page.getByLabel('Specialty').selectOption({ label: 'radiology' });
  await page.getByRole('button', { name: 'Save Vet' }).click();

  await expect(page).toHaveURL(/\/petclinic\/vets$/);
  await expect(page.locator('#vets tbody > tr')).toHaveCount(2);
  await expect(page.locator('#vets')).toContainText('Helen Leary');

  await page.locator('#vets tbody > tr').first().getByRole('button', { name: 'Edit Vet' }).click();
  await expect(page).toHaveURL(/\/petclinic\/vets\/1\/edit$/);
  await expect(page.getByLabel('First Name')).toHaveValue('James');
  await page.getByLabel('Last Name').fill('CarterJr');
  await page.locator('#spec').click();
  await page.getByRole('option', { name: 'surgery' }).click();
  await page.keyboard.press('Escape');
  await page.getByRole('button', { name: 'Save Vet' }).click();

  await expect(page).toHaveURL(/\/petclinic\/vets$/);
  await expect(page.locator('#vets tbody > tr').first()).toContainText('James CarterJr');
  await expect(page.locator('#vets tbody > tr').first()).toContainText('radiology');
  await expect(page.locator('#vets tbody > tr').first()).toContainText('surgery');
});

test('adds, edits, and deletes a pet type', async ({ page }) => {
  await page.goto('/petclinic/pettypes');
  await expect(page.locator('#pettypes tbody > tr')).toHaveCount(2);

  await page.getByRole('button', { name: 'Add' }).click();
  await page.getByLabel('Name').fill('hamster');
  await page.getByRole('button', { name: 'Save' }).click();

  await expect(page.locator('#pettypes tbody > tr')).toHaveCount(3);
  await expect(page.locator('#pettypes tbody > tr').nth(2).locator('input')).toHaveValue('hamster');

  await page.locator('#pettypes tbody > tr').first().getByRole('button', { name: 'Edit' }).click();
  await expect(page).toHaveURL(/\/petclinic\/pettypes\/1\/edit$/);
  await expect(page.getByLabel('Name')).toHaveValue('cat');
  await page.getByLabel('Name').fill('feline');
  await page.getByRole('button', { name: 'Update' }).click();

  await expect(page).toHaveURL(/\/petclinic\/pettypes$/);
  await expect(page.locator('#pettypes tbody > tr').first().locator('input')).toHaveValue('feline');

  await page.locator('#pettypes tbody > tr').first().getByRole('button', { name: 'Delete' }).click();
  await expect(page.locator('#pettypes tbody > tr')).toHaveCount(2);
  await expect(page.locator('#pettypes tbody > tr').first().locator('input')).toHaveValue('dog');
});

test('adds, edits, and deletes a specialty', async ({ page }) => {
  await page.goto('/petclinic/specialties');
  await expect(page.locator('#specialties tbody > tr')).toHaveCount(2);

  await page.getByRole('button', { name: 'Add' }).click();
  await page.getByLabel('Name').fill('dentistry');
  await page.getByRole('button', { name: 'Save' }).click();

  await expect(page.locator('#specialties tbody > tr')).toHaveCount(3);
  await expect(page.locator('#specialties tbody > tr').nth(2).locator('input')).toHaveValue('dentistry');

  await page.locator('#specialties tbody > tr').first().getByRole('button', { name: 'Edit' }).click();
  await expect(page).toHaveURL(/\/petclinic\/specialties\/1\/edit$/);
  await expect(page.getByLabel('Name')).toHaveValue('radiology');
  await page.getByLabel('Name').fill('imaging');
  await page.getByRole('button', { name: 'Update' }).click();

  await expect(page).toHaveURL(/\/petclinic\/specialties$/);
  await expect(page.locator('#specialties tbody > tr').first().locator('input')).toHaveValue('imaging');

  await page.locator('#specialties tbody > tr').first().getByRole('button', { name: 'Delete' }).click();
  await expect(page.locator('#specialties tbody > tr')).toHaveCount(2);
  await expect(page.locator('#specialties tbody > tr').first().locator('input')).toHaveValue('surgery');
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
