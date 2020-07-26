const { internet } = require("faker")

describe('Pagination module', () => {

    it('GA-33 : Home Page - paginacija Logged in user 20 galleries', () => {
        cy.visit('https://gallery-app.vivifyideas.com/')
        cy.get('div > button.btn').contains('Load More')
            .scrollIntoView()
            .should('be.visible')
        cy.get('.container > div.grid > div.cell').its('length').should('eq', 10)
        cy.get('div > button.btn').contains('Load More').click()
        cy.wait(1000)
        cy.get('.container > div.grid > div.cell').its('length').should('eq', 20)
    })

})