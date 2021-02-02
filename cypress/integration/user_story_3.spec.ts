const searchUrl = Cypress.config().baseUrl + "petclinic/search";

beforeEach(() => {
    cy.visit(searchUrl);  
});

describe('User Story 3 Search Funcitonality', () => {
    it('should find owner', ()=> {
        cy.get("#searchFormInput").type("coleman");
        cy.get("#submitButton").click();
        cy.get("app-owner-table").should("contain", "Jean Coleman");

        cy.get("#searchFormInput").clear();
        cy.get("#searchFormInput").type("maple");
        cy.get("#submitButton").click();
        cy.get("app-owner-table").should("contain", "Maria Escobito");

        cy.get("#searchFormInput").clear();
        cy.get("#searchFormInput").type("windsor");
        cy.get("#submitButton").click();
        cy.get("app-owner-table").should("contain", "Harold Davis");
    });

    it('should NOT find owner', ()=> {
            cy.get("#searchFormInput").type("coleman");
            cy.get("#submitButton").click();
            cy.get("app-owner-table").should("not.contain", "JeaColeman");
    });

    it('should have working limit in table', ()=> {
        cy.get("#searchFormInput").type("a");
        cy.get("#submitButton").click();
        cy.get("app-owner-table").should("not.contain", "Carlos Estaban");
        
        cy.get("#showAllOwnersLink").click();
        cy.get("app-owner-table").should("contain", "Carlos Estaban");
    });

    it('should only show selected tables', ()=> {
        cy.get("#ownerCheckbox").uncheck();
        cy.get("#visitCheckbox").uncheck();
        cy.get("#visitCheckbox").should('not.be.checked');
        cy.get("#ownerCheckbox").should('not.be.checked');
        cy.get("#petCheckbox").should("be.checked");
        cy.get("#searchFormInput").type("max");
        cy.get("#submitButton").click();
        cy.get("app-pet-table").should("exist")
        cy.get("app-owner-table").should("not.exist")
        cy.get("app-visit-table").should("not.exist")
        cy.get("app-pet-table").should("contain", "Max");
    });
    
    it('should direct to owner-detail on click', ()=> {
        cy.get("#searchFormInput").type("betty");
        cy.get("#submitButton").click();
        cy.get('.ownerFullName > a').first().click();
        cy.url().should('eq', Cypress.config().baseUrl + "petclinic/owners/2");      
    });

    it('should direct to vet-show-visits on click', ()=> {
        cy.get("#searchFormInput").type("carter");
        cy.get("#submitButton").click();
        cy.get('.vetFullName > a').first().click();
        cy.url().should('eq', Cypress.config().baseUrl + "petclinic/vets/visits/1/showVisits");      
    });
    
    it('all checkboxes should be selected', ()=> {
        cy.get("#ownerCheckbox").should("be.checked")
        cy.get("#petCheckbox").should("be.checked")
        cy.get("#visitCheckbox").should("be.checked")
    });

    it('should display no results found', ()=> {
        cy.get("#searchFormInput").type("(@*&@(*(*@&@&*@)))");
        cy.get("#submitButton").click();
        cy.get("#visitTableNoResult").should("exist");
        cy.get("#visitTableNoResult").should("have.text","Didn't find any visits matching your search.");
    });
});