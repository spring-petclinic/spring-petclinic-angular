///<reference types="cypress" />


import BaseClass_PO from "./BaseClass_PO";

const baseClassPage = new BaseClass_PO();

class BaseList_PO  extends BaseClass_PO {
    
    constructor() {
        super(); // Call the parent class constructor
        this.addSelector('button','button.btn');
        this.addSelector('home','Home');
      }

    navigateHome() {
        cy.get(this.selector('button')).contains('Home').click();
    }

    validateNotInList(name){
        cy.get('table').should('not.contain', name);
    }

    validateInList(name){
        cy.get('table').contains(name);
    }

    validateInitialArray(dataArray) {

        dataArray.forEach((name) => {
            this.validateInList(name)
        });
    }


    deleteListElement(name) {

        cy.get('table tr').filter(':contains("'+name+'")').then($nameRow => {
            if ($nameRow.length) {     
                cy.wrap($nameRow).within(() => {              // Work within the found row
                    cy.get('td').contains('.btn', 'Delete').then($deleteCell => {
                      if ($deleteCell.length) {                  
                        cy.wrap($deleteCell).click()
                      }
                    });
                  });
            }
        })

    }

    editListElement(label,name) {

        cy.get('table tr').filter(':contains("'+name+'")').then($nameRow => {
            if ($nameRow.length) {     
                cy.wrap($nameRow).within(() => {              // Work within the found row
                    cy.get('td').contains('.btn', label).then($editCell => {
                      if ($editCell.length) {               
                        cy.wrap($editCell).click()
                      }
                    });
                  });
            }
        })

    }


    addElement(name) {
        cy.get(this.selector('button')).contains('Add').click();
        cy.typeAndVerify("#name", name);
        cy.get(this.selector('button')).contains('Save').click();

    }

}


export default BaseList_PO;