describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Test user',
      username: 'testuser',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Login')
    cy.contains('Username:')
    cy.contains('Password:')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('testuser')
      cy.get('#password').type('password')
      cy.get('#login-button').click()
      cy.contains('Bloglist app')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('sdfsdfsf')
      cy.get('#password').type('asdasdas')
      cy.get('#login-button').click()
      cy.get('.notification')
        .should('contain', 'Invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'testuser', password: 'password' })
    })

    it('A blog can be created', function() {
      cy.get('#new-blog-button').click()
      cy.get('#title').type('Test blog')
      cy.get('#author').type('Test author')
      cy.get('#url').type('http://www.example.com')
      cy.get('#submit-button').click()

      cy.get('.blog')
        .should('contain', 'Test blog')
        .and('contain', 'Test author')
        .and('have.css', 'border-style', 'solid')
    })

    describe('Blog exists', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'TestiBlogi',
          author: 'Joku',
          url: 'www.example.fi'
        })
      })

      it('A blog can be liked', function() {
        cy.get('#show-button').click()
        cy.contains('Likes: 0')
        cy.get('#like-button').click()
        cy.contains('Likes: 1')
      })
    })
  })
})
