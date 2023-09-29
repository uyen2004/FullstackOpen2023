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

/*   it('fails with wrong credentials', function () {
      cy.get('input[name="Username"]').type('incorrectusername');
      cy.get('input[name="Password"]').type('incorrectpassword');
      cy.get('button[type="submit"]').click();

      cy.get('.error').should('contain', 'Wrong username or password');
    });*/
    })
    describe('When logged in', function() {
      beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/users', {
          username: 'trish',
          password: 'trish123',
          name: 'Trisha',
        });
        cy.visit('http://localhost:5173/login');
        cy.get('input[name="Username"]').type('trish');
        cy.get('input[name="Password"]').type('trish123');
        cy.get('button[type="submit"]').click();
      });
  
      it('Shows the user info and "Create New Blog" button', function() {
        cy.contains('Blogs');
        cy.contains('trish logged in');
        cy.contains('Logout');
        cy.contains('No blogs found.');
  
        cy.get('button').contains('Create New Blog').should('be.visible');
      });
  
      it('A blog can be created', function() {
        cy.contains('Create New Blog').click();
        cy.get('input[name="title"]').type('Test Blog');
        cy.get('input[name="author"]').type('John Doe');
        cy.get('input[name="url"]').type('https://example.com/test-blog');
        cy.get('button[type="submit"]').click();
  
        cy.contains('Test Blog');
        cy.contains('John Doe');
      });
    });
 
    it('User can like a blog', function () {
      cy.contains('Create New Blog').click();
      cy.get('input[name="title"]').type('Test Blog');
      cy.get('input[name="author"]').type('John Doe');
      cy.get('input[name="url"]').type('https://example.com/test-blog');
      cy.get('button[type="submit"]').click();
  
      cy.wait(2000);
  
      cy.contains('View').click();
      cy.get('.blog').contains('Like').click();
      cy.get('.blog').contains('Likes: 1');
    });
  });
