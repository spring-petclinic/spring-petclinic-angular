// <reference types="cypress" />

import BaseClass_PO from "./BaseClass_PO";

const baseClassPage = new BaseClass_PO();

class VisitAdd_PO extends BaseClass_PO {

    constructor() {
        super(); // Call the parent class constructor
        this.addSelector('visitDate', '[name="date"]');
        this.addSelector('description', '#description');
        this.addSelector('button', 'button.btn');
        this.addSelector('addButton', 'Add Visit');
        this.addSelector('updateButton', 'Update Visit');
    }


    setVisitDate(dateString) {
        cy.typeAndVerify(this.selector('visitDate'), dateString);
    }

    setDescription(description) {
        cy.typeAndVerify(this.selector('description'), description);
    }
    clearVisitDate(){
        cy.get(this.selector('visitDate')).clear();
    }

    clearDescription(){
        cy.get(this.selector('description')).clear();
    }


    verifyAddSaveButtonDisabled() {
   
        cy.get(this.selector('button')).contains(this.selector('addButton')).should('be.disabled');
    }

    verifyAddSaveButtonEnabled() {
        cy.get(this.selector('button')).contains(this.selector('addButton')).should('be.enabled');
    }


    verifyEditSaveButtonDisabled() {

        cy.get(this.selector('button')).contains(this.selector('updateButton')).should('be.disabled');
    }

    verifyEditSaveButtonEnabled() {
      
        cy.get(this.selector('button')).contains(this.selector('updateButton')).should('be.enabled');
    }

    verifyErrorMessage(message){
        cy.get('.help-block').should('contain',message);
    }


    addVisit(){
        cy.get(this.selector('button')).contains(this.selector('addButton')).click();
    }

    updateVisit(){
        cy.get(this.selector('button')).contains(this.selector('updateButton')).click();
    }
}


export default VisitAdd_PO;
