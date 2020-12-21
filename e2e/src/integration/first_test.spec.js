describe('First Cypress test petclinic angular', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/')
  })

  it('.should() - contain Welcome to Petclinic', () => {
    cy.get('h1')
      .should('contain', 'Welcome to Petclinic');
    });
})
