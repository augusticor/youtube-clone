/// <reference types="Cypress" />

describe('Home page', () => {
  it('Loads the home page displaying the video cards and new videos title', () => {
    cy.visit('http://localhost:3000');

    cy.intercept('GET', '/search?part=snippet&q=*').as('getData');
    cy.wait('@getData').its('response.statusCode').should('eq', 200);

    cy.getByDataCy('category-title').should('have.text', 'New Videos');
    cy.getByDataCy('element-card').should('exist');
    cy.getByDataCy('element-card').should('have.length.greaterThan', 10);

    cy.getByDataCy('categories').find('button').should('have.length', 17);
    cy.getByDataCy('categories')
      .find('button')
      .first()
      .should('contain.text', 'New')
      .and('have.css', 'background')
      .should('include', 'rgb(252, 21, 3)');

    cy.getByDataCy('search-bar').should('exist');
    cy.getByDataCy('home-link').should('exist');
  });
});
