export const toast = {

    verifySuccess: (message: string) => {
        cy.get('._description_gmcqp_50').should('have.text', message)
    }

}