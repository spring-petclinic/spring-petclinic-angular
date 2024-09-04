///<reference types="cypress" />

class BaseInputList_PO {


    navigateHome() {
        cy.get('button.btn').contains('Home').click();
    }

    validateNotInList(name){
        cy.get('table tbody tr').each(($row, index, $rows) => {
            cy.wrap($row).find('input').then($input => {
                cy.wrap($input).should('not.have.value', name);
            });
        });
    }

    validateInList(name){

        let textFound = false;

        cy.get('table input').each(($input) => {
            if ($input.val() === name) {
                textFound = true;
              }
        }).then(() => {
            // Assert that the text was found in at least one input field
            expect(textFound).to.be.true;
          });
    }

    validateInitialArray(dataArray) {

        cy.get('table tbody tr').each(($row, index, $rows) => {
            cy.wrap($row).find('input').then($input => {

                cy.wrap($input).should('have.value', dataArray[index]);
            });
        });
    }


    deleteListElement(name) {

        cy.get('table tbody tr').each(($row, index, $rows) => {

            cy.wrap($row).as('currentRow');

            cy.get('@currentRow').find('input').invoke('val').then((inputValue) => {
                if (inputValue == name) {
                
                    cy.wrap($row).contains('Delete') .should('exist').as('deleteButton');

                  }
                });
              });

              cy.get('@deleteButton').click();
      
    }

   

    beginAdd(){
        cy.get('button.btn').contains('Add').click();
    }

    clearElement() {
        cy.get('#name').clear();
       // cy.get("#name").type('{selectall}{backspace}{selectall}{backspace}');
    }

    setName(name){
        cy.typeAndVerify("#name", name);
    }
}


export default BaseInputList_PO;