import { createGallery } from '../page_objects/create.gallery.page';
import { EMAIL } from '../fixtures/constants';
import { GALLERY } from '../fixtures/constants';

describe('Edit Gallery', () => {

    beforeEach(() => {
        cy.server()
        cy.route(`${Cypress.env('apiUrl')}/galleries?page=1&term=`).as('galleries');
        // cy.route('GET', Cypress.env('apiUrl') + '/galleries?page=1&term=', 'fixture:all.json').as('getLogo')
        cy.route('GET', Cypress.env('apiUrl') + '/my-galleries?page=1&term=').as('my')
    })

    it('create gallery', () => {
        cy.loginBe(EMAIL.EXISTING, EMAIL.PASSWORD)
        cy.wait('@galleries');

        createGallery.aNavLink.contains('Create Gallery').click();
        createGallery.create(GALLERY.NAME, 'Desc','https://www.cisl.cam.ac.uk/news/news-images/business-for-nature.jpg');
        cy.wait('@galleries');
    })

    it('open gallery', () => {
        cy.loginBe(EMAIL.EXISTING, EMAIL.PASSWORD)
        cy.wait('@galleries');

        createGallery.aNavLink.contains('My Galleries').click();
        cy.wait('@my')

        cy.get('.box-title').eq(0).click()
        cy.wait(1000)
        cy.get('h1').contains(GALLERY.NAME).should('be.visible')
        cy.get('a').contains('Jovica Raicki').should('be.visible')
        cy.get('img').should('have.attr', 'src', 'https://www.cisl.cam.ac.uk/news/news-images/business-for-nature.jpg')

    })

    it('edit gallery', () => {
        cy.loginBe(EMAIL.EXISTING, EMAIL.PASSWORD)
        cy.wait('@galleries');

        createGallery.aNavLink.contains('My Galleries').click();
        cy.wait('@my')

        cy.get('.box-title').eq(0).click()
        cy.wait(1000)
        
        createGallery.typeButton.click()
        cy.wait(1000)
        cy.get('[type=button]').contains('Add image').click()

        createGallery.typeUrl.eq(1).type('https://www.laketemperature.org/wp-content/uploads/2019/11/Crater-Lake.jpg')

        createGallery.typeSubmit.eq(0).click()
    })

    it('change positions of image urls', () => {
        cy.loginBe(EMAIL.EXISTING, EMAIL.PASSWORD)
        cy.wait('@galleries');

        createGallery.aNavLink.contains('My Galleries').click();
        cy.wait('@my')

        cy.get('.box-title').eq(0).click()
        cy.wait(1000)
        
        createGallery.typeButton.click()
        cy.wait(1000)

        cy.get('.fa-chevron-circle-up').eq(1).click()

        cy.wait(1000)
        cy.get('.fa-chevron-circle-down').eq(0).click()
    })

    it('check carousel', () => {
        cy.loginBe(EMAIL.EXISTING, EMAIL.PASSWORD)
        cy.wait('@galleries');

        createGallery.aNavLink.contains('My Galleries').click();
        cy.wait('@my')

        cy.get('.box-title').eq(0).click()

        cy.wait(1000)
        cy.get('.carousel-control-next-icon').click()
        createGallery.img.eq(1).should('have.attr', 'src', 'https://www.laketemperature.org/wp-content/uploads/2019/11/Crater-Lake.jpg')

        cy.wait(1000)
        cy.get('.carousel-control-prev-icon').click()
        createGallery.img.eq(0).should('have.attr', 'src', 'https://www.cisl.cam.ac.uk/news/news-images/business-for-nature.jpg')
    })

    it('delete gallery', () => {
        cy.loginBe(EMAIL.EXISTING, EMAIL.PASSWORD)
        cy.wait('@galleries');

        createGallery.aNavLink.contains('My Galleries').click();
        cy.wait('@my')

        cy.get('@my').its('response').then((resp) => {
            cy.deleteBackend(resp.body.galleries[0].id)
        })

        createGallery.aNavLink.contains('All Galleries').click();
        cy.wait('@galleries')

        createGallery.aNavLink.contains('My Galleries').click();
        cy.wait('@my')
    })

})