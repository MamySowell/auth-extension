// This test will pass when run against a clean Quasar project
describe('User authentification', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/#/login');
    cy.fixture('users.json')
    .then(credentials => {
      this.credentials = credentials ;
    })
  });

  context('Check header item', () => {
    it('Should check that are in login page', () => {
      cy.title().should('include', 'Quasar App');
    });
  })

  context('I am a valid user with role', () => {
    it('should fill login form and redirect to homepage', () => {
      const role = this.credentials.userTrue.role
      // Fill the user credentials
      cy.get('[data-cy=email]').type('sw-sup@sowellapp.com').should('have.value', this.credentials.userTrue.email)
      cy.get('[data-cy=password]').type('SW-@sowell').should('have.value',this.credentials.userTrue.password)
      cy.get(role).should('have.value','SuperAdmin')
      // Locate and submit the form
      cy.get('[data-cy=submit-login]')
      .click()
      .then(() => { 
         // check post request
          cy.intercept(
            {
              method: 'POST',
              url: '/users/sign_in',
            },
            [] 
          ).as('Login') 
      })

        // check user is redirected to the next page 
       cy.location('pathname', { timeout: 10000 }).should('eq', '/')
        // chek the next page has the title "Home"j
       cy.title().should('eq', 'Quasar App')
       // TO DO : check logout button
    })
  })

  context('I am a valid user with no role', () => {
    it('should fill login form and redirect to homepage', () => {
      // Fill the user credentials
      cy.get('[data-cy=email]').type(this.credentials.userWrong.email).should('have.value', this.credentials.userTrue.email)
      cy.get('[data-cy=password]').type(this.credentials.userWrong.password).should('have.value', this.credentials.userTrue.password)
      // Locate and submit the form
      cy.get('[data-cy=submit-login]')
      .click()
      //check post request
      cy.intercept(
        {
          method: 'POST',
          url: '/users/sign_in',
        },
        [] 
      ).as('loginPost') 
        // check user is redirected to the next page 
       cy.location('pathname', { timeout: 10000 }).should('eq', '/')
       cy.title().should('eq', 'Quasar App')
       //TODO : check logout button
    })
  })

  context('I am not a valid user', () => {
    it('should fill login form and get forbidden notification error', () => {
      // Fill the username
      cy.get('[data-cy=email]').type('sw-sup@sowellapp.com').should('have.value', this.credentials.userWrong.email)
      cy.get('[data-cy=password]').type('123456').should('have.value', this.credentials.userWrong.password)
      // Locate and submit the form
      cy.get('[data-cy=submit-login]')
      .click()
      .then(() => {
        cy.visit('/')
        cy.intercept(
          {
            method: 'POST',
            url: '/users/sign_in',
          },
          [] 
        ).as('loginPost') 
    })
      //Show notification
      cy.get('.q-notification__message').should('contain.text','auth.loginFailed')
    })
  })
})