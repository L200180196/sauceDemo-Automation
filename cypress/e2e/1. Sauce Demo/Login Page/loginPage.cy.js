const chai_colors = require("chai-colors")

chai.use(chai_colors)

describe('Sauce Demo Login', () => {
    const link = () =>{
        cy.visit("https://www.saucedemo.com")
    }

    it('Visiting the Page', () => {
      link()
      cy.title().should("eq", "Swag Labs")
      cy.contains("Login")
    })

    it("Contains Username and Password Input, and Login Button", () => {
        // Check Username
        link()
        const userName = cy.get("input[name='user-name']")
        userName.should("be.visible")
        userName.should("have.attr", "type", "text")
        userName.should("have.attr", "placeholder", "Username")

        // Check Password
        const password = cy.get("input[name='password']")
        password.should("be.visible")
        password.should("have.attr", "type", "password")
        password.should("have.attr", "placeholder", "Password")

        // Check Button Login
        const button = cy.get("input[type='submit']")
        button.contains("Login")
        button.should("have.css", "cursor", "pointer")
        button.should("have.css", "background-color").and('be.colored', '#3ddc91')
    // button.should("have.css", "color", "hex(#132322)")
    })

    // Do Login with Username Null Values
    it("Valid Input, Leaving Null Username", () => {
        // Check Username
        link()

        // Check Password
        const password = cy.get("input[name='password']")
        password.type("secret_sauce")

        // Check Button Login
        const button = cy.get("input[type='submit']")
        button.contains("Login")
        button.click()

        // Error Message
        const errorMessage = cy.get(".error")
        errorMessage.contains("Username is required")
    })

    // Do Login with Password Null Values
    it("Valid Input, Leaving Null Password", () => {
        // Check Username
        link()

        // Typing Username
        const userName = cy.get("input[name='user-name']")
        userName.type("standard_user")

        // Click Button Login
        const button = cy.get("input[type='submit']")
        button.contains("Login")
        button.click()

        // Error Message
        const errorMessage = cy.get(".error")
        errorMessage.contains("Password is required")
    })

    // Do Login with Username and Password Null Values
    it("Leaving Null Username and Password", () => {
        // Check Username
        link()

        // Click Button Login
        const button = cy.get("input[type='submit']")
        button.contains("Login")
        button.click()

        // Error Message
        const errorMessage = cy.get(".error")

        // Bug Checking only Username
        errorMessage.contains("Username and Password is required")
    })

    // Do Login with Wrong Values Username and Password
    it("Login with Invalid Username and Password", () => {
        // Check Username
        link()

        // Typing Username
        const userName = cy.get("input[name='user-name']")
        userName.type("standard")

        const password = cy.get("input[name='password']")
        password.type("secret_sauce")

        // Click Button Login
        const button = cy.get("input[type='submit']")
        button.contains("Login")
        button.click()

        // Error Message
        const errorMessage = cy.get(".error")
        errorMessage.contains("Username and password do not match any user in this service")
    })

    // Do Login with Correct Username and Password
    it("Login with Valid Username and Password", () => {
        // Check Username
        link()

        // Typing Username
        const userName = cy.get("input[name='user-name']")
        userName.type("standard_user")

        const password = cy.get("input[name='password']")
        password.type("secret_sauce")

        // Click Button Login
        const button = cy.get("input[type='submit']")
        button.contains("Login")
        button.click()

        // Redirect Url
        cy.url().should("eq", "https://www.saucedemo.com/inventory.html")
        
    })
  })