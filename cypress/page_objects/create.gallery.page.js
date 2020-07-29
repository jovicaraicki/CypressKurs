export default class CreateGallery {

    get navLink() {
        return cy.get('.nav-link')
    }

    get aNavLink() {
        return cy.get('a.nav-link')
    }

    get label() {
        return cy.get('label')
    }

    get title () {
        return cy.get('#title')
    }

    get description() {
        return cy.get('#description')
    }

    get typeUrl() {
        return cy.get('[type=url]')
    }

    get typeButton() {
        return cy.get('[type=button]')
    }

    get typeSubmit() {
        return cy.get('[type=submit]')
    }

    get faTrash() {
        return cy.get('[type=button] > i.fa-trash')
    }

    create(title, desc, url) {
        this.title.type(title)
        this.description.type(desc)
        this.typeUrl.type(url)
        this.typeSubmit.contains('Submit').click()
    }
}

export const createGallery = new CreateGallery()