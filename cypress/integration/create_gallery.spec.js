const { internet } = require("faker")

describe('Create gallery module', () => {
    it('Create gallery layout', () => {
        cy.visit('/')
        cy.get('.nav-link').contains('Login').click()
        cy.get('#email').type('jovica.raicki@gmail.com')
        cy.get('#password').type('Vivify1974')
        cy.get('[type=submit]').click()
        cy.wait(1000)
        cy.get('.nav-link').contains('Logout').should('be.visible')

        cy.get('ul > li.nav-item > a').contains('Create Gallery').click()
        cy.url().should('eq', 'https://gallery-app.vivifyideas.com/create')
        cy.get('h1.title-style').contains('Create Gallery')
            .should('be.visible')

        cy.get('form > .form-group:nth-child(1) > label').contains('Title:').should('be.visible')
        cy.get('form > .form-group:nth-child(1) > input#title')
            .should('have.attr', 'type', 'text')
            .should('have.attr', 'id', 'title')
            .should('be.visible')

        cy.get('form > .form-group:nth-child(2) > label').contains('Descriptions:').should('be.visible')
        cy.get('form > .form-group:nth-child(2) > input')
            .should('have.attr', 'type', 'text')
            .should('be.visible')

        cy.get('form > div > label').contains('Images:').should('be.visible')
        cy.get('form > div > .form-group > .input-group > input')
            .should('have.attr', 'type', 'url')
            .should('have.attr', 'placeholder', 'image url')
            .should('be.visible')

        cy.get('.input-buttons > i.fa-chevron-circle-up').should('be.visible')
        cy.get('.input-buttons > i.fa-chevron-circle-down').should('be.visible')

        cy.get('button[type=button]')
            .should('have.text', 'Add image')
            .should('be.visible')

        cy.get('form > button:nth-child(4)')
            .should('have.text', 'Submit')
            .should('have.attr', 'type', 'submit')
            .should('have.class', 'btn-custom')
            .should('be.visible')

        cy.get('form > button:nth-child(5)')
            .should('have.text', 'Cancel')
            .should('have.attr', 'type', 'submit')
            .should('have.class', 'btn-custom')
            .should('be.visible')
    })

    it('Create gallery add item', () => {
        cy.get('form > .form-group:nth-child(1) > input#title').type('Cypress Album')
        cy.get('form > .form-group:nth-child(2) > input#description').type('Album created by Cypress')
        cy.get('form > div > .form-group > .input-group > input[type=url]').type('https://scentertainer.net/wp-content/uploads/2020/06/italian-cypress-2b.jpg')
        cy.get('button[type=button]').contains('Add image').click()
        cy.get('form > div:nth-child(3) > div:nth-child(2) > div > div > button:nth-child(1) > i').should('be.visible')
        cy.get('form > div:nth-child(3) > div:nth-child(3) > div > div > button:nth-child(1) > i').should('be.visible')
        cy.get('form > div:nth-child(3) > div:nth-child(3) > div > div > button:nth-child(1)').click()
        cy.get('form > div:nth-child(3) > div:nth-child(3) > div > div > button:nth-child(1) > i').should('not.be.visible')
        cy.get('form > button:nth-child(4)').click()
        cy.url().should('eq', 'https://gallery-app.vivifyideas.com/')
    })
})