/// <reference types="cypress" />

import { getRandomUser } from "../../../generators/userGenerator"
import { toast } from "../../../pages/components/toast"
import { registerPage } from "../../../pages/registerPage"

describe('Register tests in isolation', () => {
    beforeEach(() => {
        cy.visit('/register')
    })

    it('should successfully register new user', () => {
        // given
        const user = getRandomUser()

        // when
        registerPage.attemptRegister(user)

        // then
        toast.verifySuccess('Registration successful! You can now log in.')
        cy.url().should('contain', '/login')
    })

    it('should fail to register if user already exists', () => {
        // given
        const user = getRandomUser()
        cy.register(user)

        // when
        registerPage.attemptRegister(user)

        // then
        toast.verifyError('Username already exists')
        cy.url().should('contain', '/register')
    })
})
