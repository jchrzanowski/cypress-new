import { User } from "../types/user";

export const meMocks = {

    mockSuccess: (user: User) => {
        cy.intercept('GET', '**/users/me', {
            statusCode: 200,
            body: {
                id: 2,
                username : user.username,
                email : user.email,
                roles : user.roles,
                firstName : user.firstName,
                lastName : user.lastName
              }
        })
    }

}