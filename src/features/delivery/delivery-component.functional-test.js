describe('delivery select component', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('[data-test=pickup]').click();
  });

  it('display the pick up select button', () => {
    cy.findByRole('button', { name: 'Abholen' }).should('exist');
  });

  it('open the delivery select component', () => {
    cy.findByRole('button', { name: 'Abholen' }).click();
    cy.findByText('Abholen oder Liefern?').should('exist');
  });

  it('change the delivery type', () => {
    cy.findByRole('button', { name: 'Abholen' }).click();
    cy.findByRole('button', { name: 'Liefern' }).click();
    cy.findByRole('button', { name: 'Bestätigen' }).click();
    cy.findByRole('button', { name: 'Liefern' }).should('exist');
  });

  it('render the delivery info inputs', () => {
    cy.findByRole('button', { name: 'Abholen' }).click();
    cy.findByRole('button', { name: 'Liefern' }).click();
    cy.findByRole('button', { name: 'Bestätigen' }).click();

    cy.findByRole('textbox', { name: 'Straße' }).should('exist');
    cy.findByRole('textbox', { name: 'Stadt' }).should('exist');
  });
});
