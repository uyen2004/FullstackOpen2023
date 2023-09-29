describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/blogs')
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.get('form').should('exist') 
    cy.get('input[name="Username"]').should('exist') 
    cy.get('input[name="Password"]').should('exist')
    cy.get('button[type="submit"]').should('exist') 
  })
})