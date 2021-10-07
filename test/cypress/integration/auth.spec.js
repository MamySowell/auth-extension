
// This test will pass when run against a clean Quasar project
describe('Auth testing', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8080/#/login');
      cy.fixture('userCredentials.json')
      .then(credentials => {
        this.credentials = credentials ;
      })
    }); 
    it('Verify that we are in login page', () => {
      cy.title().should('include', 'Quasar App');
    });
    it('Validate successful Login', () => {
      // Fill the username
      cy.get('[data-cy=email]').type(this.credentials.email).should('have.value', 'sw-sup@sowellapp.com').as
      cy.get('[data-cy=password]').type(this.credentials.password).should('have.value', '123456')
      // Locate and submit the form
      cy.get('[data-cy=submit-login]')
      .click()
      .then( () => {
        if('sw-sup@sowellapp.com' == this.credentials.email && 'SW-super@dm' == this.credentials.password ) {
            cy.visit('/')
        }else{
            cy.get('.q-notification__message').should('contain.text','auth.loginFailed')
        }
      })
        // Verify the app redirected to the next page 
       cy.location('pathname', { timeout: 10000 }).should('eq', '/')
        // Verify the next page title is "Home"
       cy.title().should('eq', 'Quasar App')
      });

      it('Login  with incorect data', () => {
        // Fill the username
        cy.get('[data-cy=email]').type(this.credentials.email).should('have.value', 'sw-sup@sowellapp.com')
        cy.get('[data-cy=password]').type(this.credentials.password).should('have.value', '123456')
        // Locate and submit the form
        cy.get('[data-cy=submit-login]')
        .click()
        //Show notification
        cy.get('.q-notification__message').should('contain.text','auth.loginFailed')
        })
  });