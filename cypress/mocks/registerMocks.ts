export const registerMocks = {

    mockSuccess: () => {
        cy.intercept('POST', '**/users/signup', {
            statusCode: 201
        })
    },

    mockUserAlreadyExists: () => {
        cy.intercept('POST', '**/users/signup', {
            statusCode: 400,
            body: {
                message: 'Username is already in use'
            }
        })
    }

}