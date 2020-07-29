import { authPage } from '../page_objects/login.page';
import { EMAIL } from '../fixtures/constants';

describe('Create gallery module', () => {

    before(() => {
        cy.visit('/')
        cy.get('.nav-link').contains('Login').click()
        authPage.login(EMAIL.EXISTING, EMAIL.PASSWORD)
        // cy.get('#email').type('jovica.raicki@gmail.com')
        // cy.get('#password').type('Vivify1974')
        // cy.get('[type=submit]').click()
        cy.server()
        cy.route(`${Cypress.env('apiUrl')}/galleries?page=1&term=`).as('galleries')
    })

    it('Create gallery layout', () => {
        cy.wait('@galleries')
        cy.get('.nav-link').contains('Logout').should('be.visible')
        cy.get('a.nav-link').contains('Create Gallery').click()

        cy.url().should('eq', 'https://gallery-app.vivifyideas.com/create')
        cy.get('h1.title-style').contains('Create Gallery')
            .should('be.visible')

        cy.get('label').contains('Title:').should('be.visible')
        cy.get('#title').should('be.visible')
        cy.get('#title').should('have.attr', 'type', 'text')

        cy.get('label').contains('Descriptions:').should('be.visible')
        cy.get('#description').should('be.visible')
        cy.get('#description').should('have.attr', 'type', 'text')

        cy.get('label').contains('Images:').should('be.visible')
        cy.get('[type=url]').should('be.visible')
        cy.get('[type=url]').should('have.attr', 'placeholder', 'image url')

        cy.get('i.fa-chevron-circle-up').should('be.visible')
        cy.get('i.fa-chevron-circle-down').should('be.visible')

        cy.get('[type=button]').contains('Add image').should('be.visible')

        cy.get('[type=submit]').contains('Submit').should('be.visible')

        cy.get('[type=submit]').contains('Cancel').should('be.visible')
    })

    it.only('Create gallery add item', () => {
        cy.wait('@galleries')
        cy.get('.nav-link').contains('Logout').should('be.visible')
        cy.get('a.nav-link').contains('Create Gallery').click()

        cy.get('#title').type('Cypress Album')
        cy.get('#description').type('Album created by Cypress')
        cy.get('[type=url]').type('https://scentertainer.net/wp-content/uploads/2020/06/italian-cypress-2b.jpg')
        cy.get('[type=button]').contains('Add image').click()
        cy.get('[type=button]').find('i.fa-trash').should('have.length', 2)
        cy.get('[type=button]').contains('Add image').click()
        cy.get('[type=button]').find('i.fa-trash').should('have.length', 3)
        cy.get('[type=button] > i.fa-trash').eq(2).click()
        cy.get('[type=button]').find('i.fa-trash').should('have.length', 2)
        cy.get('[type=button] > i.fa-trash').eq(1).click()
        cy.get('[type=button]').find('i.fa-trash').should('have.length', 0)
        cy.get('[type=submit]').contains('Submit').click()
        cy.url().should('eq', 'https://gallery-app.vivifyideas.com/')
    })
})