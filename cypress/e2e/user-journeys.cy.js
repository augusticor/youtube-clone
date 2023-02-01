/// <reference types="Cypress" />

describe('User journeys', () => {
  it('User can change the category, enter the video detail, go to the channel page and end at home', () => {
    cy.intercept('GET', 'https://youtube-v31.p.rapidapi.com/*').as('datarequest');
    cy.visit('http://localhost:3000');
    cy.getByDataCy('category-title').should('have.text', 'New Videos');
    cy.getByDataCy('categories').find('button').eq(5).as('gamingbutton').click();

    cy.wait('@datarequest');
    cy.location('pathname').should('eq', '/');
    cy.getByDataCy('category-title').should('have.text', 'Gaming Videos');

    cy.get('@gamingbutton')
      .should('contain.text', 'Gaming')
      .and('have.css', 'background')
      .should('include', 'rgb(252, 21, 3)');

    cy.getByDataCy('categories')
      .find('button')
      .first()
      .should(
        'have.css',
        'background',
        'rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box'
      );

    // Enter a video
    cy.getByDataCy('element-card').first().click();
    cy.wait('@datarequest');
    cy.location('pathname').should('match', /\/video\/./);
    cy.getByDataCy('element-card').should('exist').and('have.length.greaterThan', 10);
    cy.getByDataCy('channel-link').should('exist');
    cy.getByDataCy('category-title').should('not.exist');
    cy.getByDataCy('video-info').find('a').should('exist');
    cy.getByDataCy('video-info')
      .find('div')
      .should('exist')
      .find('p')
      .should('have.length', 2)
      .then(($par) => {
        cy.wrap($par)
          .eq(0)
          .contains(/.+\sviews/);

        cy.wrap($par)
          .eq(1)
          .contains(/.+\slikes/);
      });

    cy.getByDataCy('react-player').find('iframe').should('exist');

    // Go to the channel page
    cy.getByDataCy('channel-link').click();
    cy.wait('@datarequest').its('response.statusCode').should('eq', 200);
    cy.location('pathname').should('match', /\/channel\/./);
    cy.getByDataCy('channel-card').should('exist').find('h6').should('exist');
    cy.getByDataCy('videos-box').should('exist');

    // Return to home
    cy.getByDataCy('home-link').click();
    cy.wait('@datarequest').its('response.statusCode').should('eq', 200);
    cy.location('pathname').should('eq', '/');
    cy.getByDataCy('category-title').should('have.text', 'New Videos');
  });

  it('User can search a video, view it, then end at home', () => {
    cy.intercept('GET', 'https://youtube-v31.p.rapidapi.com/*').as('datarequest');
    cy.visit('http://localhost:3000');
    cy.getByDataCy('search-bar').should('exist');

    cy.getByDataCy('search-button').as('searchbutton').click();
    cy.getByDataCy('search-input').as('searchinput');
    cy.get('@searchinput').should('have.value', '');
    cy.location('pathname').should('eq', '/');

    // Type something
    const searchTerm = 'Cypress testing';
    cy.get('@searchinput').type(searchTerm);
    cy.get('@searchinput').should('have.value', searchTerm);
    cy.get('@searchbutton').click();

    // Search feed
    cy.wait('@datarequest');
    cy.location('pathname').should('eq', '/search/Cypress%20testing');
    cy.getByDataCy('home-link').should('exist');
    cy.getByDataCy('search-bar').should('exist');
    cy.getByDataCy('category-title').should('not.exist');
    cy.getByDataCy('search-string').contains(searchTerm);
    cy.getByDataCy('element-card')
      .should('exist')
      .and('have.length.greaterThan', 15)
      .eq(0)
      .getByDataCy('video-card-link')
      .contains(/cypress/i)
      .click();

    // Video detail
    cy.wait('@datarequest');
    cy.getByDataCy('react-player').find('iframe').should('exist');
    cy.getByDataCy('video-info').find('a').should('exist');
    cy.getByDataCy('video-info')
      .find('div')
      .should('exist')
      .find('p')
      .should('have.length', 2)
      .then(($par) => {
        cy.wrap($par)
          .eq(0)
          .contains(/.+\sviews/);

        cy.wrap($par)
          .eq(1)
          .contains(/.+\slikes/);
      });

    // Return home
    cy.getByDataCy('home-link').click();
    cy.wait('@datarequest').its('response.statusCode').should('eq', 200);
    cy.location('pathname').should('eq', '/');
    cy.getByDataCy('category-title').should('have.text', 'New Videos');
  });

  it('User can search a channel and go to the channel detail', () => {
    cy.intercept('GET', 'https://youtube-v31.p.rapidapi.com/*').as('datarequest');
    cy.visit('http://localhost:3000');

    const channelName = 'fireship';
    cy.getByDataCy('search-input').as('searchinput').type(channelName);
    cy.get('@searchinput').should('have.value', channelName);
    cy.getByDataCy('search-button').click();

    // Search results
    cy.wait('@datarequest');
    cy.location('pathname').should('eq', `/search/${channelName}`);
    cy.getByDataCy('channel-card-cy').eq(0).should('exist').click();

    // Channel detail
    cy.wait('@datarequest');
    cy.location('pathname').should('match', /\/channel\/./);

    // Return home and go to channel
    cy.getByDataCy('home-link').click();
    cy.wait('@datarequest').its('response.statusCode').should('eq', 200);
    cy.location('pathname').should('eq', '/');
    cy.getByDataCy('category-title').should('have.text', 'New Videos');
    cy.getByDataCy('channel-card-link').first().click();

    // Check if channel detail
    cy.wait('@datarequest');
    cy.location('pathname').should('match', /\/channel\/./);
    cy.getByDataCy('channel-card').should('exist');
    cy.getByDataCy('element-card').should('exist').and('have.length.greaterThan', 15);
  });
});
