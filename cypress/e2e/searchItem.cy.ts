describe('Search for a TV show', () => {
  it('should display the search results', () => {
    cy.viewport(1920, 1080)
    cy.visit('/')
    cy.get('input').type('The Office')
    cy.get('#search-button').click()
    cy.get('#search-result-item').should('exist')
    cy.get('#search-result-item').click()
    cy.get('#content-poster').should(
      'have.attr',
      'src',
      'https://image.tmdb.org/t/p/original/4h6b9hxZ0TbgWEpWXl9HpLQXJSi.jpg'
    )
    cy.get('h1').should('contain', 'The Office')
  })
})
