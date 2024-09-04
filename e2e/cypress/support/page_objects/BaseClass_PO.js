/// <reference types="cypress" />

class BaseClass_PO {
    
    constructor() {
        this.selectors = new Map(); // Initialize the Map, but content will be added in child classes
      }

      addSelector(name,value){
        this.selectors.set(name,value);
      }
      selector(name){
        return this.selectors.get(name);
    }

      
}

export default BaseClass_PO;