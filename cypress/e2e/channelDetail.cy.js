/// <reference types="Cypress" />

describe('Channel detail', () => {
  it('Displays channel detail correctly', () => {
    cy.visit('http://localhost:3000/channel/UCX6OQ3DkcsbYNE6H8uQQuVA');

    cy.getByDataCy('search-bar').should('exist');
    cy.getByDataCy('home-link').should('exist');

    cy.getByDataCy('element-card')
      .should('exist')
      .and('have.length.greaterThan', 15)
      .eq(0)
      .find('h6')
      .should('include.text', 'MrBeast');

    cy.getByDataCy('channel-card')
      .should('exist')
      .find('h6')
      .should('include.text', 'MrBeast');

    cy.getByDataCy('channel-card')
      .should('exist')
      .find('p')
      .contains(/.+\sSubscribers/);
  });
});
