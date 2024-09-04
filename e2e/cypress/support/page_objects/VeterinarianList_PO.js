/// <reference types="cypress" />

import BaseList_PO from "./BaseList_PO";

const initialVets= ["James Carter", "Helen Leary", "Linda Douglas", "Rafael Ortega","Henry Stevens", "Sharon Jenkins"];

class VeterinarianList_PO extends BaseList_PO {

    validateInitialVets() {
        super.validateInitialArray(initialVets);
    }

    addVeterinarian() {
        cy.contains("Add Vet").click();
    }

    deleteVeterinarian(name){
        super.deleteListElement(name);
    }

    editVeterinarian(name){
        super.editListElement("Edit Vet", name);
    }

    validateVetHasSpeciality(name,specialty){

        
        cy.get('table tr').filter(':contains("'+name+'")').then($nameRow => {
            if ($nameRow.length) {     
                cy.wrap($nameRow).within(() => {   
                    let specialtyFound = false;           // Work within the found row
                    cy.get('div').each($div => {
                        cy.wrap($div)
                        .invoke('text')          // Get the text of the div
                        .then((text) => {
                            if (text.trim()  === specialty){
                                specialtyFound = true;
                            }
                            
                        });
                    })
                    .then(() => {
                        expect(specialtyFound).to.be.true;
                      });
                  });
            };
        });
    }
}

export default VeterinarianList_PO;