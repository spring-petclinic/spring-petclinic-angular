/// <reference types="cypress" />

class Homepage_PO {

    navigate(path) {

        cy.fixture("config.json").then((data) => {
            cy.log("Navigating to: " + data.baseURL + path); 
            cy.visit(data.baseURL + path)
        })
       
    }

    selectPetTypesNavItem(){
        this.navigate("/pettypes");
    }

    selectSpecialtiesNavItem(){
        cy.contains('span', 'Specialties').click()
    }

    selectAddVeterinarianNavItem() {
        // Hint - we use the direct path because of the two drop downs with equal naming in the nav bar"
       this.navigate("/vets/add");
    }

    selectListVeterinarianNavItem() {
        this.navigate("/vets");
    }

    selectFindOwnerNavItem() {
        this.navigate("/owners");
    }
    
    selectAddOwnerNavItem() {
        this.navigate("/owners/add");
    }

    selectAddVisitNavItem() {
        this.navigate("/pets/8/visits/add");
    }

    verifyTitle() {
        cy.contains('h1','Welcome to Petclinic')
    }

    editOwnerGeorgeFranklin(){
        this.navigate("/owners/1/edit");
    }

    addPetToOwnerGeorgeFranklin(){  
        this.navigate("/owners/1/pets/add");
    }

    
    editPetLeoOfOwnerGeorgeFranklin(){
        this.navigate("/pets/1/edit");
    }
    
    editVisitOfPetMax(){
        this.navigate("/visits/3/edit");
    }

    contains(message){
        cy.contains(message);
    }
    
}



export default Homepage_PO;

