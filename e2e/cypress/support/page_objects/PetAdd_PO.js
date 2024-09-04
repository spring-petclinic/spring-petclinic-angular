// <reference types="cypress" />

import BaseClass_PO from "./BaseClass_PO";

const baseClassPage = new BaseClass_PO();

class PetAdd_PO extends BaseClass_PO {
    
    constructor() {
        super(); // Call the parent class constructor
        this.addSelector('name','#name');
        this.addSelector('birthDate','[name="birthDate"]');
        this.addSelector('type','#type');
        this.addSelector('button','button.btn');
        this.addSelector('addButton','Save Pet');
        this.addSelector('updateButton','Update Pet');
      }

      setName(name){
        cy.typeAndVerify(this.selector('name'),name);
    }

    setBirthDate(dateString){
        cy.typeAndVerify(this.selector('birthDate'),dateString);
    }

    setPetType(typename){
        if (typename != "EMPTY") {
        cy.get(this.selector('type')).select(typename);
        } 

    }

    clearName() {
        cy.get(this.selector('name')).clear();
    }

    clearBirthDate() {
        cy.get(this.selector('birthDate')).clear();
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

    addPet(){
        cy.get(this.selector('button')).contains(this.selector('addButton')).click();
    }

    updatePet(){
        cy.get(this.selector('button')).contains(this.selector('updateButton')).click();
    }
}


export default PetAdd_PO;
    