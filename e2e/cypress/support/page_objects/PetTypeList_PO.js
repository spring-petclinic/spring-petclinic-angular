/// <reference types="cypress" />

import BaseInputList_PO from "./BaseInputList_PO";

const initialPetTypes = ["cat", "dog", "lizard", "snake", "bird", "hamster"];

class PetTypeList_PO extends BaseInputList_PO {

    validateInitialPetTypes() {
     super.validateInitialArray(initialPetTypes);
    }

   

    beginEditPetType(name) {
 
        cy.get('table tbody tr').each(($row, index, $rows) => {

            cy.wrap($row).as('currentRow');

            cy.get('@currentRow').find('input').invoke('val').then((inputValue) => {
                if (inputValue == name) {
                
                    cy.wrap($row).contains('Edit') .should('exist').as('editButton');

                  }
                });
              });

              cy.get('@editButton').click();
    }


    deletePetType(name){
        super.deleteListElement(name);
    }

    addPetType() {
        super.beginAdd()
    }

    setName(name) { 
        super.setName(name);
    }

    clearPetType() {
        super.clearElement();
     }
 
    validateErrorMessage(message){
     
        cy.get('.help-block').should('contain',message);
    }

    validateSaveButtonDisabled(){
        cy.get('button[type="submit"]').should('be.disabled');
    }

   
    validateAddButtonEnabled(){
        cy.get('button').contains('Save').should('be.enabled');
    }

    validateAddButtonDisabled() {
        cy.get('button').contains('Save').should('be.disabled');
    }

 
}


export default PetTypeList_PO;