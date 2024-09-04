/// <reference types="cypress" />

import BaseClass_PO from "./BaseClass_PO";


class PetTypeEdit_PO extends BaseClass_PO {
    constructor() {
        super(); // Call the parent class constructor
        this.addSelector('name','#name');
        this.addSelector('button','button.btn');
        this.addSelector('updateButton','Update');
    }
    
    changeNameTo(name){
        cy.typeAndVerify(this.selector('name'),name);
        cy.get(this.selector('button')).contains(this.selector('updateButton')).click();
    }

    setName(name){
       
        cy.typeAndVerify(this.selector('name'),name);
    }

    clearPetType() {
        cy.get(this.selector('name')).clear();
    }

    validateEditButtonDisabled() {
        cy.get('button[type="submit"]').should('be.disabled');
    }

    validateEditButtonEnabled() {
        cy.get('button[type="submit"]').should('be.enabled');
    }

    validateErrorMessage(message){
        cy.get('.help-block').should('contain',message);
    }
}


export default PetTypeEdit_PO;