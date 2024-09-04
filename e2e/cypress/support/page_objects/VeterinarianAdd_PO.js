/// <reference types="cypress" />

import BaseClass_PO from "./BaseClass_PO";

const baseClassPage = new BaseClass_PO();

class VeterinarianAdd_PO extends BaseClass_PO {
    
    constructor() {
        super(); // Call the parent class constructor
        this.addSelector('firstName','#firstName');
        this.addSelector('lastName','#lastName');
        this.addSelector('specialties','#specialties');
        this.addSelector('button','button.btn');
        this.addSelector('saveButton','Save Vet');
      }


    setFirstName(name){
        cy.typeAndVerify(this.selector('firstName'),name);
    }

    setLastName(name){
        cy.typeAndVerify(this.selector('lastName'),name);
    }

    clearFirstName() {
        cy.get(this.selector('firstName')).clear();
    }

    clearLastName() {
        cy.get(this.selector('lastName')).clear();
    }

    verifySaveButtonDisabled() {
        cy.get(this.selector('button')).contains(this.selector('saveButton')).should('be.disabled');
    }

    verifySaveButtonEnabled() {
        cy.get(this.selector('button')).contains(this.selector('saveButton')).should('be.enabled');
    }

    selectType(typename){
        cy.get(this.selector('specialties')).select(typename);
    }

    verifyErrorMessage(message){
        cy.get('.help-block').should('contain',message);
    }

    addVeterinarian(){
        cy.get(this.selector('button')).contains(this.selector('saveButton')).click();
    }

}


export default VeterinarianAdd_PO;
