import { PLACES } from '../../data/routes';
import { t } from '../../tests/i18n';

describe('delivery select component', () => {
  beforeEach(() => {
    cy.intercept('GET', PLACES, {
      data: [{ postcode: 1234, city: 'Aachen', minCartAmount: 2 }],
    }).as('getPlaces');
    cy.visit('/');
    cy.wait('@getPlaces');
    cy.get('[data-test=pickup]').click();
  });

  it('display the pick up select button', () => {
    cy.findByRole('button', { name: t('common:pick-up') }).should('exist');
  });

  it('open the delivery select component', () => {
    cy.findByRole('button', { name: t('common:pick-up') }).click();
    cy.findByText(t('common:pick-up-or-deliver')).should('exist');
  });

  it('change the delivery type', () => {
    cy.findByRole('button', { name: t('common:pick-up') }).click();
    cy.findByRole('button', { name: 'Liefern' }).click();
    cy.findByRole('button', { name: t('common:confirm') }).click();
    cy.findByRole('button', {
      name: t('common:deliver-to', { postcode: 1234 }),
    }).should('exist');
  });

  it('render the delivery info inputs', () => {
    cy.findByRole('button', { name: t('common:pick-up') }).click();
    cy.findByRole('button', { name: t('common:delivery') }).click();
    cy.findByRole('button', { name: t('common:confirm') }).click();

    cy.findByRole('textbox', { name: 'Straße' }).should('exist');
    cy.findByRole('textbox', { name: 'Stadt' }).should('exist');
  });
});

describe('delivery place', () => {
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
    cy.findByRole('button', { name: t('common:confirm') }).click();
  });

  it('render the delivery fee', () => {
    cy.findByText('28.22€').should('exist');
  });
});
