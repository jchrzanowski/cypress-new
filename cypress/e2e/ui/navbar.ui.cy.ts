/// <reference types="cypress" />

import { getRandomUser } from "../../generators/userGenerator"
import { cartMocks } from "../../mocks/cartMocks"
import { navbar } from "../../pages/components/navbar"
import { User } from "../../types/user"

describe('Navbar tests', () => {
    let user: User

    beforeEach(() => {
        user = getRandomUser()
        cy.register(user)
        cy.login(user.username, user.password)
        cy.get('@token').then(token => {
            localStorage.setItem('token', `${token}`)
        })
    })

    afterEach(() => {
        cy.get('@token').then(token => {
            cy.deleteUser(user.username, `${token}`)
        })
    })

    it('should open products page', () => {
        // given
        cy.visit('')

        // when
        navbar.clickMenuItem('Products')

        // then
        cy.url().should('contain', '/products')
        cy.get('[data-testid="product-search"]').should('be.visible')
    })

    it('should open profile page', () => {
        // given
        cy.visit('')

        // when
        navbar.clickName(`${user.firstName} ${user.lastName}`)

        // then
        cy.url().should('contain', '/profile')
        cy.get('#email').should('have.value', user.email)
        cy.get('#firstName').should('have.value', user.firstName)
        cy.get('#lastName').should('have.value', user.lastName)
    })

    it('should logout', () => {
        // given
        cy.visit('')

        // when
        navbar.clickLogout()

        // then
        cy.url().should('contain', '/login')
        cy.get('button').contains('Sign in').should('be.visible')
    })


    it('should logout on mobile view', () => {

        // given
        // cy.visit('/')
        cy.viewport(393, 852) // iPhone 15 viewport
        cy.visit('')

        // when
        navbar.clickMobileHamburgerMenu()
        navbar.clickLogoutOnMobileMenu()

        // then
        cy.url().should('contain', '/login')
        cy.get('button').contains('Sign in').should('be.visible')
    })

    it('should display correct number of cart items', () => {
        // given
        const expectedNumberOfItems = 9
        cartMocks.mockCartWithNItems(user.username, expectedNumberOfItems)
        cy.visit('')

        // then
        cy.get('[data-testid=desktop-cart-icon] span').should('have.text', expectedNumberOfItems)
    })

})