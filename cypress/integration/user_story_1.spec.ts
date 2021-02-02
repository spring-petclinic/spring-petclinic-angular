const userStoryOneUrl = Cypress.config().baseUrl + "petclinic/owners";


beforeEach(() => {
    cy.intercept('owners').as('getOwners');    
    cy.visit(userStoryOneUrl);  
  })

describe('User Story 1 Delete Owner', () => {
    it('Should be able to reach owner page', () => {
      cy.url().should('eq', userStoryOneUrl);
    });

    it('Table should contain George Franklin', () => {
        cy.wait('@getOwners').then(({request, response}) => {
        cy.get(':nth-child(1) > .ownerFullName > a').contains('George Franklin');                
        });
    });

    it('Should Create Owner', () => {
        cy.wait('@getOwners').then(({request, response}) => {
            cy.get(':nth-child(1) > .ownerFullName > a').contains('George Franklin');    
            cy.get('.btn').click();
            cy.url().should('eq', userStoryOneUrl + '/add')
            cy.get('#firstName').type('Max');
            cy.get('#lastName').type('Mustermann');
            cy.get('#address').type('Bremer Str.');
            cy.get('#city').type('Bremen');
            cy.get('#telephone').type('0157157815203');
            cy.get('[type="submit"]').click();
        });    
    });

    it('Should Owner be created', () => {
        cy.wait('@getOwners').then(({request, response}) => {
            cy.get('.ownerFullName').last().contains('Max Mustermann');
            cy.get('.ownerFullName').last().get('a').last().click();
        });
    });

    it('Should delete Owner', () => {
        cy.get('.ownerFullName').last().get('a').last().click();
        cy.get('.container > :nth-child(5)').click();
    });
});