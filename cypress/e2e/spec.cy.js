describe('template spec', () => {
  it('Google Test Searching', () => {
    cy.visit('https://google.co.id')
    cy.get('#APjFqb').type('Automation Cypress{enter}')
    cy.get('.MUFPAc > :nth-child(2) > a', {timeout: 6000}).click()
  })
})