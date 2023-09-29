describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    cy.visit('http://localhost:5173');
  });

  it('Login form is shown', function () {
    cy.get('form').should('be.visible');
    cy.get('input[name="Username"]').should('be.visible');
    cy.get('input[name="Password"]').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.request('POST', 'http://localhost:3003/api/users', {
        username: 'trish',
        password: 'trish123',
        name: 'trisha',
      });

      cy.visit('http://localhost:5173/login');
      cy.get('input[name="Username"]').type('trish');
      cy.get('input[name="Password"]').type('trish123');
      cy.get('button[type="submit"]').click();

      cy.contains('trish logged in');
      cy.contains('Logout');
    });

    it('fails with wrong credentials', function () {
      cy.get('input[name="Username"]').type('incorrectusername');
      cy.get('input[name="Password"]').type('incorrectpassword');
      cy.get('button[type="submit"]').click();

      cy.get('.error').should('contain', 'Wrong username or password');
    });
  });
});
