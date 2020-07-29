import { authPage } from '../page_objects/login.page';
import { createGallery } from '../page_objects/create.gallery.page';
import { EMAIL } from '../fixtures/constants';

describe('Create gallery module', () => {

    beforeEach(() => {
        cy.visit('/')
        createGallery.navLink.contains('Login').click()
        authPage.login(EMAIL.EXISTING, EMAIL.PASSWORD)
        // cy.get('#email').type('jovica.raicki@gmail.com')
        // cy.get('#password').type('Vivify1974')
        // cy.get('[type=submit]').click()
        cy.server()
        cy.route(`${Cypress.env('apiUrl')}/galleries?page=1&term=`).as('galleries')
    })

    it('GA-12 : Create New Gallery Page validation', () => {
        cy.wait('@galleries')
        createGallery.navLink.contains('Logout').should('be.visible')
        createGallery.aNavLink.contains('Create Gallery').click()

        cy.url().should('eq', 'https://gallery-app.vivifyideas.com/create')
        cy.get('h1.title-style').contains('Create Gallery')
            .should('be.visible')

        createGallery.label.contains('Title:').should('be.visible')
        createGallery.title.should('be.visible')
        createGallery.title.should('have.attr', 'type', 'text')

        createGallery.label.contains('Descriptions:').should('be.visible')
        createGallery.description.should('be.visible')
        createGallery.description.should('have.attr', 'type', 'text')

        createGallery.label.contains('Images:').should('be.visible')
        createGallery.typeUrl.should('be.visible')
        createGallery.typeUrl.should('have.attr', 'placeholder', 'image url')

        cy.get('i.fa-chevron-circle-up').should('be.visible')
        cy.get('i.fa-chevron-circle-down').should('be.visible')

        createGallery.typeButton.contains('Add image').should('be.visible')

        createGallery.typeSubmit.contains('Submit').should('be.visible')

        createGallery.typeSubmit.contains('Cancel').should('be.visible')
    })

    it('GA-34 : Add image field', () => {
        cy.wait('@galleries')
        createGallery.navLink.contains('Logout').should('be.visible')
        createGallery.aNavLink.contains('Create Gallery').click()

        createGallery.create('Cypress Album', 'Album created by Cypress', 'https://scentertainer.net/wp-content/uploads/2020/06/italian-cypress-2b.jpg')

        // createGallery.title.type('Cypress Album')
        // createGallery.description.type('Album created by Cypress')
        // createGallery.typeUrl.type('https://scentertainer.net/wp-content/uploads/2020/06/italian-cypress-2b.jpg')
        // // createGallery.typeButton.contains('Add image').click()
        // // createGallery.typeButton.find('i.fa-trash').should('have.length', 2)
        // // createGallery.typeUrl.eq(1).type('https://www.cisl.cam.ac.uk/news/news-images/business-for-nature.jpg')
        // // createGallery.typeButton.contains('Add image').click()
        // // createGallery.typeButton.find('i.fa-trash').should('have.length', 3)
        // // createGallery.faTrash.eq(2).click()
        // // createGallery.typeButton.find('i.fa-trash').should('have.length', 2)
        // // createGallery.faTrash.eq(1).click()
        // // createGallery.typeButton.find('i.fa-trash').should('have.length', 0)
        // createGallery.typeSubmit.contains('Submit').click()
        cy.url().should('eq', 'https://gallery-app.vivifyideas.com/')
    })

    it('GA-18 : Check Delete gallery feature', () => {
        cy.wait('@galleries')
        cy.get('a').contains('My Galleries').click()
        createGallery.navLink.contains('Logout').should('be.visible')

        cy.get('.grid > .cell > h2 > a').eq(0).click()

        cy.url().should('contain', 'https://gallery-app.vivifyideas.com/galleries/')
        cy.get('button').contains('Delete Gallery').should('be.visible')

        cy.get('button').contains('Delete Gallery').click()
    })
})