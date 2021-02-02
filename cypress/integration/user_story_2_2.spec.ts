const ownersUrl = Cypress.config().baseUrl + "petclinic/owners";

beforeEach(() => {
  cy.intercept('owners').as('getOwners');    
  cy.visit(ownersUrl);  
})

describe('User Story 2_2 Create visit with vet', () => {
  
  it('Should be able to reach owner page', () => {
    cy.url().should('eq', ownersUrl);
  });

  it('Table should contain George Franklin', () => {
    cy.wait('@getOwners').then(({request, response}) => {
      cy.get(':nth-child(1) > .ownerFullName > a').contains('George Franklin');
      assert(true);
    });    
  });

  it('Should navigate to edit owner Betty Davis', () => {
    cy.wait('@getOwners').then(({request, response}) => {
      cy.get(':nth-child(2) > .ownerFullName > a').click();
      cy.url().should('eq', ownersUrl+ "/2");      
    });
  });

  it('Should navigate to add visit page for pet', () => {    
    cy.wait('@getOwners').then(({request, response}) => {
      cy.get(':nth-child(2) > .ownerFullName > a').click();
      cy.url().should('eq', ownersUrl+ "/2");      
      cy.get('.dl-horizontal > :nth-child(9)').click();
      cy.url().should('eq', 'http://localhost:4200/petclinic/pets/2/visits/add');
    });
  });

  it('Should add Visit for pet', () => {
    cy.wait('@getOwners').then(({request, response}) => {
      cy.get(':nth-child(2) > .ownerFullName > a').click();
      cy.url().should('eq', ownersUrl+ "/2");      
      cy.get('.dl-horizontal > :nth-child(9)').click();
      cy.url().should('eq', 'http://localhost:4200/petclinic/pets/2/visits/add');
      cy.get('.mat-datepicker-input').type('2021/01/10');
      cy.get('#description').type('Vaccination');
      cy.get('#vet').select("James Carter");
      cy.get('[type="submit"]').click();
      cy.wait(5000);
    });
  });

  it('Should Visit be added for pet', () => {
    cy.wait('@getOwners').then(({request, response}) => {
      cy.get(':nth-child(2) > .ownerFullName > a').click();
      cy.url().should('eq', ownersUrl+ "/2");
      cy.get('app-visit-list > .table > tr > :nth-child(1)').contains('2021/01/10');
      cy.get('app-visit-list > .table > tr > :nth-child(2)').contains('Vaccination');
      cy.get('app-visit-list > .table > tr > :nth-child(3)').contains('James Carter');
    });
  }); 

  it('Delete created Visit for pet', () => {
    cy.wait('@getOwners').then(({request, response}) => {
      cy.get(':nth-child(2) > .ownerFullName > a').click();
      cy.url().should('eq', ownersUrl+ "/2");      
      cy.get('.table > :nth-child(2) > :nth-child(4) > :nth-child(2)').click();
    });
  });
});


