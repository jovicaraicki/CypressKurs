import { authPage } from '../page_objects/login.page';
import { EMAIL } from '../fixtures/constants';
import { internet } from 'faker';

describe('Delete gallery feature', () => {

    before(() => {
        cy.visit('/')
        cy.get('.nav-link').contains('Login').click()
        authPage.login(EMAIL.EXISTING, EMAIL.PASSWORD)
        cy.server()
        cy.route(`${Cypress.env('apiUrl')}/galleries?page=1&term=`).as('galleries')
    })

    it('Edit gallery', () => {
        cy.wait('@galleries')
        cy.get('.nav-link').contains('Logout').should('be.visible')

        cy.get('.grid > .cell > h2 > a').eq(0).click()

        cy.url().should('contain', 'https://gallery-app.vivifyideas.com/galleries/')
        cy.get('button').contains('Delete Gallery').should('be.visible')

        cy.get('button').contains('Delete Gallery').click()

    })

})