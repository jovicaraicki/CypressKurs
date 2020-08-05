import { authPage } from '../page_objects/login.page';
import { createGallery } from '../page_objects/create.gallery.page';
import { EMAIL } from '../fixtures/constants';
import { GALLERY } from '../fixtures/constants';

describe('Routes', () => {

    beforeEach(() => {
        cy.server()
        cy.route(`${Cypress.env('apiUrl')}/galleries?page=1&term=`).as('galleries');
        // cy.route('GET', Cypress.env('apiUrl') + '/galleries?page=1&term=', 'fixture:all.json').as('getLogo')
        cy.route('GET', Cypress.env('apiUrl') + '/my-galleries?page=1&term=').as('my')
    })

    it('Create 10 galleries', () => {
        cy.loginBe(EMAIL.EXISTING, EMAIL.PASSWORD)
        cy.wait('@galleries');

        createGallery.aNavLink.contains('Create Gallery').click();
        for (let i = 1; i < 3; i++) {
          createGallery.aNavLink.contains('Create Gallery').click();
          createGallery.create(
            GALLERY.NAME + i,
            'Desc',
            'https://www.cisl.cam.ac.uk/news/news-images/business-for-nature.jpg'
          );
          cy.wait('@galleries');
        }

        createGallery.aNavLink.contains('My Galleries').click();

        cy.wait('@my')
        cy.get('@my').its('response').then((resp) => {
            // cy.log(resp.body.count)
            // cy.log(resp.body.galleries)
            // cy.log(resp.body.galleries[0].id)
            // cy.log(resp.body.galleries[1].id)
            // cy.log(resp.body.galleries[2].id)
            for(let i = 0; i < 2; i++) {
                // cy.request({
                //     method: 'DELETE',
                //     url: Cypress.env('apiUrl') + '/galleries/' + resp.body.galleries[i].id,
                //     form: true,
                //     followRedirect: true,
                //     headers: { 
                //         authorization: `Bearer ${window.localStorage.getItem('token')}`
                //     }
                //   })
                cy.deleteBackend(resp.body.galleries[i].id)
            }
        })

        createGallery.aNavLink.contains('All Galleries').click();
        cy.wait('@galleries')

        createGallery.aNavLink.contains('My Galleries').click();
        cy.wait('@my')


    })

})