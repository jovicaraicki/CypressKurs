const { internet } = require("faker")

describe('Pagination module', () => {

    // before(() => {
    //     cy.visit('/');
    // })

    beforeEach(() => {
        // cy.visit('/');
        cy.server()
        cy.route(`${Cypress.env('apiUrl')}/galleries?page=2&term=`).as('galleries')
    })

    it('GA-33 : Home Page - paginacija Logged in user 20 galleries', () => {
        cy.visit('https://gallery-app.vivifyideas.com/')
        cy.get('div > button.btn').contains('Load More')
            .scrollIntoView()
            .should('be.visible')
        cy.get('div.cell').its('length').should('eq', 10)
        cy.get('button').contains('Load More').click()
        cy.wait('@galleries')
        cy.get('div.cell').its('length').should('eq', 20)
    })

})