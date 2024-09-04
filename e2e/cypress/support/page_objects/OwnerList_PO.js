/// <reference types="cypress" />

import BaseList_PO from "./BaseList_PO";

const initialOwner= ["George Franklin", "Betty Davis", "Eduardo Rodriquez", "Harold Davis","Peter McTavish", 
                    "Jean Coleman", "Jeff Black", "Maria Escobito", "David Schroeder", "Carlos Estaban"];


class OwnerList_PO extends BaseList_PO {

    validateInitialOwner() {
        super.validateInitialArray(initialOwner);
    }

    filterBy(filterString){
        cy.typeAndVerify('#lastName',filterString);
        cy.get('button[type="submit"]').click();
    }

    validateFiltered(filter){
        let filteredArray = initialOwner.filter(str => str.startsWith(filter));

        super.validateInitialArray(filteredArray);
    }

    hasNoResults() {
            cy.get("body").contains('No owners with LastName starting with');
    }

    addOwner() {
           cy.contains("Add Owner").click();
    }

    validateOwnerInList(fullName){
        super.validateInList(fullName);
    }
    
    selectOwner(fullName){
        cy.get('table tr td a').filter(':contains("'+fullName+'")').click();
    }

   

}

export default OwnerList_PO;