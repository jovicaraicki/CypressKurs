import { authPage } from '../page_objects/login.page';
import { EMAIL } from '../fixtures/constants';
const faker = require('faker');

let firstName = faker.name.firstName();
let lastName = faker.name.lastName();
let email = faker.internet.email();
let password = faker.internet.password();

describe('Register module', () => {

    before(() => {
        cy.visit('/register')
    })

    beforeEach(() => {
        cy.visit('/')
        cy.get('.nav-link').contains('Register').click()
    })

    afterEach(() => {
        cy.visit('/')
        // cy.get('.nav-link').contains('Register').click()
    })

    after(() => {
        cy.visit('/')
    })

    it('GA-9 : Register page test', () => {
        cy.get('h1.title-style').contains('Register').should('be.visible')

        authPage.label.contains('First Name')
            .should('be.visible')
            .should('have.attr', 'for', 'first-name')
        authPage.firstName.should('be.visible')
        authPage.firstName
            .should('have.class', 'form-control')
            .should('have.attr', 'required', 'required')
            .should('have.attr', 'type', 'text')

        authPage.label.contains('Last Name')
            .should('be.visible')
            .should('have.attr', 'for', 'last-name')
        authPage.lastName.should('be.visible')
        authPage.lastName
            .should('have.class', 'form-control')
            .should('have.attr', 'required', 'required')
            .should('have.attr', 'type', 'text')

        authPage.label.contains('Email')
            .should('be.visible')
            .should('have.attr', 'for', 'email')
        authPage.email.should('be.visible')
        authPage.email
            .should('have.class', 'form-control')
            .should('have.attr', 'required', 'required')
            .should('have.attr', 'type', 'email')

        authPage.label.contains('Password')
            .should('be.visible')
            .should('have.attr', 'for', 'password')
        authPage.password.should('be.visible')
        authPage.password
            .should('have.class', 'form-control')
            .should('have.attr', 'required', 'required')
            .should('have.attr', 'type', 'password')

        authPage.label.contains('Confirmed Password')
            .should('be.visible')
            .should('have.attr', 'for', 'password-confirmation')
        authPage.passwordConfirmation.should('be.visible')
        authPage.passwordConfirmation
            .should('have.class', 'form-control')
            .should('have.attr', 'required', 'required')
            .should('have.attr', 'type', 'password')

        authPage.checkBox.should('be.visible')
        authPage.checkBox.should('have.class', 'form-check-input')
        authPage.label.contains('Accepted terms and conditions')
            .should('be.visible')
            .should('have.class', 'form-check-label')

        authPage.loginButton.should('be.visible')
        authPage.loginButton.should('have.text', 'Submit')
    })

    it('GA-40 : Register page test - First name input field: required', () => {
        authPage.lastName.type(lastName)
        authPage.email.type(email)
        authPage.password.type(password)
        authPage.passwordConfirmation.type(password)
        authPage.checkBox.click()
        authPage.loginButton.click()
        authPage.firstName.should('have.focus')
        authPage.firstName.then(($input) => {
            expect($input[0].validationMessage).to.eq('Please fill out this field.')
        })
    })

    it('GA-46 : Register page test - Last name input field: required', () => {
        authPage.firstName.type(firstName)
        authPage.email.type(email)
        authPage.password.type(password)
        authPage.passwordConfirmation.type(password)
        authPage.checkBox.click()
        authPage.loginButton.click()
        authPage.lastName.should('have.focus')
        authPage.lastName.then(($input) => {
            expect($input[0].validationMessage).to.eq('Please fill out this field.')
        })
    })

    it('GA-54 : Register page test - Email field required', () => {
        authPage.firstName.type(firstName)
        authPage.lastName.type(lastName)
        authPage.password.type(password)
        authPage.passwordConfirmation.type(password)
        authPage.checkBox.click()
        authPage.loginButton.click()
        authPage.email.should('have.focus')
        authPage.email.then(($input) => {
            expect($input[0].validationMessage).to.eq('Please fill out this field.')
        })
    })

    it('GA-55 : Register page test - Email field format invalid', () => {
        authPage.firstName.type(firstName)
        authPage.lastName.type(lastName)
        authPage.email.type('test@test')
        authPage.password.type(password)
        authPage.passwordConfirmation.type(password)
        authPage.checkBox.click()
        authPage.loginButton.click()
        authPage.alert.should('be.visible')
        authPage.alert.should('have.text', 'The email must be a valid email address.')
                        .should('have.class', 'alert')
    })

    it('GA-59 : Register page test - Password input field empty', () => {
        authPage.firstName.type(firstName)
        authPage.lastName.type(lastName)
        authPage.email.type(email)
        authPage.passwordConfirmation.type(password)
        authPage.checkBox.click()
        authPage.loginButton.click()
        authPage.password.should('have.focus')
        authPage.password.then(($input) => {
            expect($input[0].validationMessage).to.eq('Please fill out this field.')
        })
    })

    it('GA-60 : Register page test - Password Confirm input field empty', () => {
        authPage.firstName.type(firstName)
        authPage.lastName.type(lastName)
        authPage.email.type(email)
        authPage.password.type(password)
        authPage.checkBox.click()
        authPage.loginButton.click()
        authPage.passwordConfirmation.should('have.focus')
        authPage.passwordConfirmation.then(($input) => {
            expect($input[0].validationMessage).to.eq('Please fill out this field.')
        })
    })

    it('GA-81 : Confirmation password doesnt match', () => {
        authPage.firstName.type(firstName)
        authPage.lastName.type(lastName)
        authPage.email.type(email)
        authPage.password.type(password)
        authPage.passwordConfirmation.type(password + 'a')
        authPage.checkBox.click()
        authPage.loginButton.click()
        authPage.alert.should('be.visible')
        authPage.alert.should('have.text', 'The password confirmation does not match.')
                        .should('have.class', 'alert')
    })

    it('GA-81 : Confirmation password doesnt match (Password confirmation one letter)', () => {
        authPage.firstName.type(firstName)
        authPage.lastName.type(lastName)
        authPage.email.type(email)
        authPage.password.type(password)
        authPage.passwordConfirmation.type('a')
        authPage.checkBox.click()
        authPage.loginButton.click()
        authPage.alert.should('be.visible')
        authPage.alert.should('have.text', 'The password confirmation does not match.')
                        .should('have.class', 'alert')
    })

    it('GA-82 : Password form - invalid', () => {
        authPage.firstName.type(firstName)
        authPage.lastName.type(lastName)
        authPage.email.type(email)
        authPage.password.type('aabbccdd')
        authPage.passwordConfirmation.type('aabbccdd')
        authPage.checkBox.click()
        authPage.loginButton.click()
        authPage.alert.should('be.visible')
        authPage.alert.should('have.text', 'The password format is invalid.')
                        .should('have.class', 'alert')
    })

    it('GA-83 : Password form - password has less then 8 characters (Password one letter)', () => {
        authPage.firstName.type(firstName)
        authPage.lastName.type(lastName)
        authPage.email.type(email)
        authPage.password.type('a')
        authPage.passwordConfirmation.type(password)
        authPage.checkBox.click()
        authPage.loginButton.click()
        authPage.alert.should('be.visible')
        authPage.alert.should('have.text', 'The password must be at least 8 characters.')
                        .should('have.class', 'alert')
    })

    it('GA-83 : Password form - password has less then 8 characters (Password and password confirmation one letter)', () => {
        authPage.firstName.type(firstName)
        authPage.lastName.type(lastName)
        authPage.email.type(email)
        authPage.password.type('a')
        authPage.passwordConfirmation.type('a')
        authPage.checkBox.click()
        authPage.loginButton.click()
        authPage.alert.should('be.visible')
        authPage.alert.should('have.text', 'The password must be at least 8 characters.')
                        .should('have.class', 'alert')
    })

    it('GA-85 : Terms and conditions unchecked', () => {
        authPage.firstName.type(firstName)
        authPage.lastName.type(lastName)
        authPage.email.type(email)
        authPage.password.type(password)
        authPage.passwordConfirmation.type(password)
        authPage.loginButton.click()
        authPage.alert.should('be.visible')
        authPage.alert.should('have.text', 'The terms and conditions must be accepted.')
                        .should('have.class', 'alert')
    })

    it('GA-84 : User can\'t register twice #1', () => {
        authPage.firstName.type(firstName)
        authPage.lastName.type(lastName)
        authPage.email.type(email)
        authPage.password.type(password)
        authPage.passwordConfirmation.type(password)
        authPage.checkBox.click()
        authPage.loginButton.click()
    })

    it('GA-84 : User can\'t register twice #2', () => {
        authPage.firstName.clear()
        authPage.lastName.clear()
        authPage.email.clear()
        authPage.password.clear()
        authPage.passwordConfirmation.clear()
        authPage.checkBox.click()

    })

    it('GA-84 : User can\'t register twice #3', () => {
        authPage.firstName.type(firstName)
        authPage.lastName.type(lastName)
        authPage.email.type(email)
        authPage.password.type(password)
        authPage.passwordConfirmation.type(password)
        authPage.checkBox.click()
        authPage.loginButton.click()

        authPage.alert.should('be.visible')

        authPage.alert.should('have.text', 'The email has already been taken.')
                        .should('have.class', 'alert')
    })
})