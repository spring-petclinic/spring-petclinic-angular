/// <reference types="cypress" />

import BaseClass_PO from "./BaseClass_PO";

const baseClassPage = new BaseClass_PO();

class OwnerAdd_PO extends BaseClass_PO {
    
    constructor() {
        super(); // Call the parent class constructor
        this.addSelector('firstName','#firstName');
        this.addSelector('lastName','#lastName');
        this.addSelector('address','#address');
        this.addSelector('city','#city');
        this.addSelector('telephone','#telephone');
        this.addSelector('button','button.btn');
        this.addSelector('addButton','Add Owner');
        this.addSelector('updateButton','Update Owner');
    }
        


    setFirstName(name){
        cy.typeAndVerify(this.selector('firstName'),name);
    }

    setLastName(name){
        cy.typeAndVerify(this.selector('lastName'),name);
    }

    setAddress(value){
        cy.typeAndVerify(this.selector('address'),value);
    }

    setCity(name){
        cy.typeAndVerify(this.selector('city'),name);
    }

    setTelephone(numberstring){
        cy.typeAndVerify(this.selector('telephone'),numberstring);
    }


    clearFirstName() {
        cy.get(this.selector('firstName')).clear();
    }

    clearLastName() {
        cy.get(this.selector('lastName')).clear();
    }

    clearAddress() {
        cy.get(this.selector('address')).clear();
    }

    clearCity() {
        cy.get(this.selector('city')).clear();
    }

    clearTelephone() {
        cy.get(this.selector('telephone')).clear();
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


    // Old 
    addOwner(){
        cy.get(this.selector('button')).contains(this.selector('addButton')).click();
    }

    verifyAddOwnerButtonDisabled(){
        cy.get(this.selector('button')).contains(this.selector('addButton')).should('be.disabled');
    }

    updateOwner(){
        cy.get(this.selector('button')).contains(this.selector('updateButton')).click();
    }

    verifyUpdateOwnerButtonDisabled(){
        cy.get(this.selector('button')).contains(this.selector('updateButton')).should('be.disabled');
    }
}


export default OwnerAdd_PO;
