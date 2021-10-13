// This test will pass when run against a clean Quasar project
describe("User authentification", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080/#/login");
    cy.fixture("users.json").then((credentials) => {
      this.credentials = credentials;
    });
    cy.fixture("fakeRequestApi.json").then((data) => {
      this.data = data;
    });
  });

  context("Check header item", () => {
    it("Should contain title", () => {
      cy.title().should("include", "Quasar App");
    });
  });

  context("Login input validation", () => {
    it("should not submit form when email and password is empty", () => {
       cy.get("[data-cy=email]")
      .should('have.value', '')
       cy.get("[data-cy=password]")
      .should('have.value', '')
      cy.get("[data-cy=submit-login]").should('be.disabled')
    });

    it("should show error when email is invalid ", () => {
      cy.get("[data-cy=email]")
      .type("Sowell")
      cy.get("[data-cy=password]")
      .type(" ")
      cy.get('.q-field__messages > div')
      .should("contain.text","The email is not valid")
      .should('have.css', 'color', 'rgb(193, 0, 21)')
      cy.get("[data-cy=email]").clear()
      cy.get("[data-cy=password]").clear()
      cy.focused().clear()
    });

  }); 

  context("I am a valid user with role", () => {
    it("should fill login form with user credentials and redirect to homepage on submit", () => {
      // Fill the user credentials
      cy.get("[data-cy=email]")
        .type("sw-sup@sowellapp.com")
        .should("have.value", this.credentials.validUser.email);
      cy.get("[data-cy=password]")
        .type("SW-@sowell")
        .should("have.value", this.credentials.validUser.password);
      cy.get("[data-cy=submit-login]")
        .click()
        .then(() => {
          // stub post request  and response stubbing
          cy.intercept({
            method: "POST",                    
            url: "/users/sign_in",               
            body :                             
            {
               "email": this.credentials.validUser.email,
               "password": this.credentials.validUser.password
            }
         }).then((res)=> {
           expect(res.status).to.eq(201)
          //ToDO: Verify token and role
          //Decode token JWT  imported in command.js
      }).as("loginPost");
        });
      // check user is redirected to the next page
      cy.location("pathname", { timeout: 10000 }).should("eq", "/");
      // chek the next page has the title "Home"j
      cy.title().should("eq", "Quasar App");
      // TO DO : check logout button
    });

    it("should fill valid mail but wrong password and get forbidden notification error", () => {
      // Fill the username
      cy.get("[data-cy=email]")
      .type("sw-sup@sowellapp.com")
      .should("have.value", this.credentials.validUser.email);
      cy.get("[data-cy=password]")
      .type("Sw-@sowell")
      .should("have.value", this.credentials.validUser.passwordWrong);
       // Locate and submit the form
       cy.get("[data-cy=submit-login]")
      .click()
      .then(() => {
        cy.intercept( 'POST','/users/sign_in', 
        {
          body: 
            {
            email: this.credentials.validUser.email,
            password : this.credentials.validUser.passwordWrong,
           }
        }
      ).then((res)=> {
        expect(res.status).to.eq(403)
        //Decode token JWT  imported in command.js
    }).as("Login");
      });
    //Show notification
    cy.get(".q-notification__message").should(
      "contain.text",
      "Incorrect credentials"
    );
     //clear input
    cy.get("[data-cy=email]").clear()
    cy.focused().clear() 
  });

    it("should reject  an unknown user and get forbidden error", () => {
    //ToDO : Wait token
    }); 
  });

  context("I am not a valid user", () => {
    it("should fill login form with user credentials and get error on submit", () => {
      // Fill the username
      cy.get("[data-cy=email]")
        .type("user@exemple.com")
        .should("have.value", this.credentials.invalidUser.email);
      cy.get("[data-cy=password]")
        .type("123456")
        .should("have.value", this.credentials.invalidUser.password);
      // Locate and submit the form
      cy.get("[data-cy=submit-login]")
        .click()
        .then(() => {
          cy.intercept( 'POST','/users/sign_in', 
          {
            body: 
              {
              email: this.credentials.validUser.email,
              password : this.credentials.validUser.password,
             }
          }
        ).then((res)=> {
          expect(res.status).to.eq(404)
          //ToDO: Verify token and role
          expert(res.data.token).to.eq(this.data.token)
          //Decode token JWT  imported in command.js
      }).as("loginPost");
        });
      //Show notification
      cy.get(".q-notification__message").should(
        "contain.text",
        "Incorrect credentials"
      );
      //clear input
      cy.get("[data-cy=email]").clear()
      cy.focused().clear() 
    });
    it("should reject  an unknown user and get forbidden error", () => {
      //ToDO : Wait token
    }); 
  });
});
