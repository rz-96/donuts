import { PLACES } from '../../data/routes';

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

describe.only('delivery place', () => {
  beforeEach(() => {
    cy.intercept('GET', PLACES, {
      data: [
        {
          extraDeliveryFee: 28.22,
          minCartAmount: 20,
          postcode: '22222',
          city: 'test',
        },
      ],
    }).as('getPlaces');
    cy.visit('/');
    cy.wait('@getPlaces');
    cy.findByRole('button', { name: 'Liefern' }).click();
    cy.findByRole('button', { name: 'Bestätigen' }).click();
  });

  it.only('render the delivery fee', () => {
    cy.findByText('28.22€').should('exist');
  });
});
