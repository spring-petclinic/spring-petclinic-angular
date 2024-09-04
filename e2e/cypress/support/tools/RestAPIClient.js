


class RestAPIClient {

    findOwnerByFirstNameAndLastName(firstName, lastName) {

        return cy.request({
            method: 'GET',
            url: 'http://localhost:9966/petclinic/api/' + 'owners'
        }).then((response) => {
            let owners = response.body;
            return owners.find(owner => owner.firstName === firstName && owner.lastName === lastName);
        });

    }

    deleteOwnerByFirstNameAndLastName(firstName, lastName) {
        this.findOwnerByFirstNameAndLastName(firstName, lastName).then((owner) => {


            cy.log(" ### Delete - " + owner.id + " " + owner.firstName + " " + owner.lastName);
            if (owner === undefined) {
                return;
            }

            if (owner.id === undefined) {
                return;
            }

            cy.request({
                method: 'DELETE',
                url: 'http://localhost:9966/petclinic/api/' + 'owners/' + owner.id
            });
        })


    }

}

export default RestAPIClient;