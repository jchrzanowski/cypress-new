import { User } from "../types/user"

export const loginMocks = {

    mockSuccess: (user: User) => {
        cy.intercept('POST', '**/users/signin', {
            statusCode: 200,
            body: {
                token: "fakeCypressTestsToken",
                username: user.username,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                roles: user.roles
            }
        })
    },

    mockFail: () => {
        cy.intercept('POST', '**/users/signin', {
            statusCode: 422,
            body: {
                message: 'Invalid username/password supplied'
            }
        })
    }

}