export default class AuthPage {
    get email() {
        return cy.get('#email')
    }

    get password() {
        return cy.get('#password')
    }

    get loginButton() {
        return cy.get('[type=submit]')
    }

    get label() {
        return cy.get('label')
    }

    get firstName() {
        return cy.get('#first-name')
    }

    get lastName() {
        return cy.get('#last-name')
    }

    get passwordConfirmation() {
        return cy.get('#password-confirmation')
    }

    get checkBox() {
        return cy.get('[type=checkbox]')
    }

    get alert() {
        return cy.get('.alert')
    }

    login(mejl, sifra) {
        if ((mejl && mejl.length.trim === 0) || mejl === null) {
            this.password.type(sifra)
        } else if ((sifra && sifra.length.trim === 0) || sifra.length === null) {
            this.email.type(mejl)
        } else {
            this.email.type(mejl)
            this.password.type(sifra)
        }
        this.loginButton.click()
    }
}

export const authPage = new AuthPage()