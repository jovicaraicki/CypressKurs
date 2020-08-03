import { authPage } from '../page_objects/login.page';
import { createGallery } from '../page_objects/create.gallery.page';
import { EMAIL } from '../fixtures/constants';
import { GALLERY } from '../fixtures/constants';
const { internet } = require('faker');

describe('Pagination module', () => {
  before(() => {
    cy.visit('/');
    cy.get('.nav-link').contains('Login').click();
    authPage.login(EMAIL.EXISTING, EMAIL.PASSWORD);
  });

  beforeEach(() => {
    // cy.visit('/');
    cy.server();
    cy.route(`${Cypress.env('apiUrl')}/galleries?page=1&term=`).as('galleries');
    cy.route(`${Cypress.env('apiUrl')}/my-galleries?page=1&term=`).as(
      'my-galleries'
    );
    cy.route(`${Cypress.env('apiUrl')}/my-galleries?page=2&term=`).as(
      'my-galleries2'
    );
  });

  it('GA-33 : Home Page - paginacija Logged in user 20 galleries', () => {
    cy.wait('@galleries');
    createGallery.aNavLink.contains('Create Gallery').click();
    for (let i = 1; i < 11; i++) {
      createGallery.aNavLink.contains('Create Gallery').click();
      createGallery.create(
        GALLERY.NAME + i,
        'Desc',
        'https://www.cisl.cam.ac.uk/news/news-images/business-for-nature.jpg'
      );
      cy.wait('@galleries');
    }

    createGallery.aNavLink.contains('My Galleries').click();
    cy.wait('@my-galleries');
    cy.get('button').contains('Load More').should('not.be.visible');
    cy.get('div.grid').children().its('length').should('eq', 10);

    createGallery.aNavLink.contains('Create Gallery').click();
    createGallery.create(
      'Cypress gallery11',
      'Desc',
      'https://www.cisl.cam.ac.uk/news/news-images/business-for-nature.jpg'
    );
    cy.wait('@galleries');

    createGallery.aNavLink.contains('My Galleries').click();
    cy.wait('@my-galleries');

    cy.get('button')
      .contains('Load More')
      .scrollIntoView()
      .should('be.visible');
    cy.get('button').contains('Load More').click();
    cy.wait('@my-galleries2');
    cy.get('div.grid').children().its('length').should('eq', 11);

    cy.get('.grid')
    .find('.cell')
    .then(listing => {
      const listingCount = Cypress.$(listing).length;
      expect(listing).to.have.length(listingCount);

      for (let i = 0; i < listingCount; i++) {
        cy.get('a')
          .contains(GALLERY.NAME)
          .click();
        cy.wait(1000);
        cy.get('button').contains('Delete Gallery').click();
        cy.wait('@galleries');
        createGallery.aNavLink.contains('My Galleries').click();
        cy.wait('@my-galleries');
      }
    });

    cy.get('h4').contains('No galleries found').should('be.visible')
  });
});
