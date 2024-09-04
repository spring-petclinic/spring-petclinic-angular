

    class OwnerDetails_PO {

        validateOwner(fullname,address, city, phone){
            cy.contains("Owner Information")
            cy.contains(fullname);
            cy.contains(address);
            cy.contains(city);
            cy.contains(phone);
        }

        validatePet(petname,pettype,birthdate){
            cy.contains("Pets and Visits")
            cy.contains(petname);
            cy.contains(pettype);
            cy.contains(birthdate);
        }

        validatePetNotListed(petname){
            cy.get('table').should('not.contain', petname);
        }

        validatePetVisit(visitDate,description,petname){
            // TODO: zu ungenau
            cy.contains("Visits")
            cy.contains(visitDate);
            cy.contains(description);
            cy.contains(petname);
        }

        validateNoPetVisit(visitDate,description,petname) {

            cy.get('table').should('not.contain', visitDate);
            cy.get('table').should('not.contain', description);
        }

        editOwner() {
            cy.get('button').contains('Edit Owner').click();

        }

        addNewPet() {
            cy.get('button').contains('Add New Pet').click();
        }

       
        selectPetEdit(petname){
            cy.get('table .table-striped tr').filter(':contains("'+petname+'")').then($nameRow => {
                if ($nameRow.length) {     
                    cy.wrap($nameRow).within(() => {              // Work within the found row
                        cy.get('td').contains('.btn', 'Edit Pet').then($editCell => {
                          if ($editCell.length) {        
                             cy.wrap($editCell).contains('Edit Pet').click();
                          }
                        });
                      });
                }
            })
        }


        selectPetDelete(petname){
            cy.get('table .table-striped tr').filter(':contains("'+petname+'")').then($nameRow => {
                if ($nameRow.length) {     
                    cy.wrap($nameRow).within(() => {              // Work within the found row
                        cy.get('td').contains('.btn', 'Delete Pet').then($deleteCell => {
                          if ($deleteCell.length) {        
                             cy.wrap($deleteCell).contains('button', 'Delete Pet').click();
                          }
                        });
                      });
                }
            })
        }
    
        addNewVisit(petname) {
            cy.get('table .table-striped tr').filter(':contains("'+petname+'")').then($nameRow => {
                if ($nameRow.length) {     
                    cy.wrap($nameRow).within(() => {              // Work within the found row
                        cy.get('td').contains('.btn', 'Add Visit').then($addVisitCell => {
                          if ($addVisitCell.length) {        
                             cy.wrap($addVisitCell).contains('button', 'Add Visit').click();
                          }
                        });
                      });
                }
            })
        }

  //      TODO: Das korrekte Datum finden und dann den Button klicken

        selectDeleteVisit(visitDate,petname){
            cy.get('table .table-striped tr').filter(':contains("'+petname+'")').then($nameRow => {
                if ($nameRow.length) {     
                    cy.wrap($nameRow).within(() => {              // Work within the found row
                        cy.get('td').contains('.btn', 'Delete Visit').then($deleteVisitCell => {
                          if ($deleteVisitCell.length) {        
                             cy.wrap($deleteVisitCell).contains('button', 'Delete Visit').click();
                          }
                        });
                      });
                }
            })
        }

   //     TODO: Das korrekte Datum finden und dann den Button klicken

        selectEditVisit(visitDate,petname){
            cy.get('table .table-striped tr').filter(':contains("'+petname+'")').then($nameRow => {
                if ($nameRow.length) {     
                    cy.wrap($nameRow).within(() => {              // Work within the found row
                        cy.get('td').contains('.btn', 'Edit Visit').then($editVisitCell => {
                          if ($editVisitCell.length) {        
                             cy.wrap($editVisitCell).contains('button', 'Edit Visit').click();
                          }
                        });
                      });
                }
            })
        }
    }

    export default OwnerDetails_PO;