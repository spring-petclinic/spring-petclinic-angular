import { SpringPetclinicAngular2Page } from './app.po';

describe('spring-petclinic-angular2 App', function() {
  let page: SpringPetclinicAngular2Page;

  beforeEach(() => {
    page = new SpringPetclinicAngular2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
