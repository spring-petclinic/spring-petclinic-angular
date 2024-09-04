/// <reference types="cypress" />


import BaseClass_PO from "./BaseClass_PO";


class VeterinarianEdit_PO extends BaseClass_PO{
    
    constructor() {
        super(); // Call the parent class constructor
        this.addSelector('firstName','#firstName');
        this.addSelector('lastName','#lastName');
        this.addSelector('specialtyOpenButton','svg.ng-tns-c3393473648-1');
        this.addSelector('selectionPanel','#spec-panel');
        this.addSelector('selectionPanelOption','.mdc-list-item__primary-text');
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

    verifyErrorMessage(message){
        cy.get('.help-block').should('contain',message);
    }

    selectType(typename){
        
       // open the selection panel
       cy.get(this.selector('specialtyOpenButton')).click({force: true} );
      
       cy.get(this.selector('selectionPanel'))
       .should('be.visible');

       cy.get(this.selector('selectionPanelOption')).each(($item) => {
        cy.wrap($item).invoke('text')            // Get the text of the span
            .then((text) => {
                if (text.trim() === typename){
                    cy.wrap($item).click();
                }
            });
       })

       cy.get(this.selector('firstName')).click( {force: true} );
    }
    
    updateVeterinarian(){
        cy.get(this.selector('button')).contains(this.selector('saveButton')).click({force: true} );
    }

}


export default VeterinarianEdit_PO;