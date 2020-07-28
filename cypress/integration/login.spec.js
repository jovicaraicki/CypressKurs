import { EMAIL } from '../fixtures/constants';
import { authPage } from '../page_objects/login.page';
import { randomEmail } from '../utils/';
const faker = require('faker');

let email = faker.internet.email();
let password = faker.internet.password();

describe('Login module', () => {

    before(() => {
        cy.visit('/login');
    })

    beforeEach(() => {
        cy.visit('/');
        cy.get('.nav-link').contains('Login').click()
        cy.server()
        cy.route(`${Cypress.env('apiUrl')}/galleries?page=1&term=`).as('galleries')
    })

    // afterEach(() => {
    //     cy.visit('/')
    // })

    // after(() => {
    //     cy.visit('/login');
    // })

    it('GA-19 : Login page layout', () => {
        authPage.email.should('be.visible')
        authPage.password.should('be.visible')
        authPage.loginButton.should('have.text', 'Submit')
                               .should('have.class', 'btn')
                               .should('have.class', 'btn-custom')
                               .should('be.visible')
    })

    it('GA-22 : Login - invalid data - username', () => {
        authPage.email.type('test')
        authPage.password.type(EMAIL.PASSWORD)
        authPage.loginButton.click()
        authPage.email.then(($input) => {
            expect($input[0].validationMessage).to.eq('Please include an \'@\' in the email address. \'test\' is missing an \'@\'.')
        })
        // authPage.alert.should('have.text', 'Bad Credentials')
        //                 .should('have.class', 'alert')
        //                 .should('be.visible')
    })

    it('GA-22 : Login - username - empty', () => {
        authPage.email.type(' ')
        authPage.password.type(EMAIL.PASSWORD)
        authPage.loginButton.click()
        authPage.email.then(($input) => {
            expect($input[0].validationMessage).to.eq('Please fill out this field.')
        })
        // authPage.alert.should('have.text', 'Bad Credentials')
        //                 .should('have.class', 'alert')
        //                 .should('be.visible')
    })

    it('GA-22 : Login - username - no text after @', () => {
        authPage.email.type('test@')
        authPage.password.type(EMAIL.PASSWORD)
        authPage.loginButton.click()
        authPage.email.then(($input) => {
            expect($input[0].validationMessage).to.eq('Please enter a part following \'@\'. \'test@\' is incomplete.')
        })
        // authPage.alert.should('have.text', 'Bad Credentials')
        //                 .should('have.class', 'alert')
        //                 .should('be.visible')
    })

    it.only('GA-22 : Login - username - no text before @', () => {
        authPage.email.type('@test.com')
        authPage.password.type(EMAIL.PASSWORD)
        authPage.loginButton.click()
        authPage.email.then(($input) => {
            expect($input[0].validationMessage).to.eq('Please enter a part followed by \'@\'. \'@test.com\' is incomplete.')
        })
        // authPage.alert.should('have.text', 'Bad Credentials')
        //                 .should('have.class', 'alert')
        //                 .should('be.visible')
    })

    it('GA-25 : Login - invalid data - password', () => {
        authPage.email.type(EMAIL.EXISTING)
        authPage.password.type(password)
        authPage.loginButton.click()
        authPage.alert.should('have.text', 'Bad Credentials')
                        .should('have.class', 'alert')
                        .should('be.visible')
    })

    it.only('GA-26 : Login - invalid data - username and password', () => {
        authPage.login(randomEmail(), EMAIL.PASSWORD)
        // authPage.email.type(email)
        // authPage.password.type(password)
        // authPage.loginButton.click()
        authPage.alert.should('have.text', 'Bad Credentials')
                        .should('have.class', 'alert')
                        .should('be.visible')
    })

    it.only('GA-28 : Login - valid data', () => {
        authPage.login(EMAIL.EXISTING, EMAIL.PASSWORD)
        cy.wait('@galleries')
        // authPage.email.type(EMAIL.EXISTING)
        // authPage.password.type(EMAIL.PASSWORD)
        // authPage.loginButton.click()
        // cy.wait(1000)
        cy.get('.nav-link').contains('Logout').should('be.visible')
    })
})