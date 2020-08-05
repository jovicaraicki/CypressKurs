import { EMAIL } from '../fixtures/constants';

describe('Routes', () => {

    beforeEach(() => {
        cy.server()
        // cy.route('GET', Cypress.env('apiUrl') + '/galleries?page=1&term=', 'fixture:all.json').as('getLogo')
        cy.route('GET', Cypress.env('apiUrl') + '/galleries?page=1&term=').as('getLogo')
    })

    it('Get galleries', () => {
        cy.loginBe(EMAIL.EXISTING, EMAIL.PASSWORD)
        // cy.request('POST', Cypress.env('apiUrl') + '/auth/login', {"email":"jovica.raicki@gmail.com","password":"Vivify1974"})
        //     .then((resp) => {
        //         expect(resp.body).to.have.property('access_token')
        //         expect(resp.body).to.have.property('token_type')
        //         localStorage.setItem('token', resp.body.access_token)
        //     })
        // cy.visit('/')
        cy.wait('@getLogo')
        cy.get('@getLogo').its('response').then((resp) => {
            // cy.log(resp.body.count)
            // cy.request({
            //     method: 'DELETE',
            //     url: Cypress.env('apiUrl') + '/galleries/' + resp.body.galleries[0].id,
            //     form: true,
            //     followRedirect: true,
            //     headers: { 
            //         authorization: `Bearer ${window.localStorage.getItem('token')}`
            //     }
            //   })
            cy.deleteBackend( resp.body.galleries[0].id)
        })
    })
})