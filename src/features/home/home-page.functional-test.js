import { OPENING_TIMES, PLACES, PRODUCTS } from '../../data/routes';
import { t } from '../../tests/i18n';

describe('enter order details', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('[data-test=pickup]').click();
  });

  it('display the invalid email message', () => {
    cy.get('[data-test=email]').type('someinvalid{enter}');
    cy.get('[data-test=name]').click();
    cy.get('[data-test=error-message]').first().should('exist');
  });

  it('display the name missing error', () => {
    cy.get('[data-test=name]').click();
    cy.get('[data-test=phone]').click();
    cy.get('[data-test=error-message]').first().should('exist');
  });

  it('display the phone missing error', () => {
    cy.get('[data-test=phone]').click();
    cy.get('[data-test=comment]').click();
    cy.get('[data-test=error-message]').first().should('exist');
  });
});

describe.only('given products, opening times and deliveryType = pickup', () => {
  beforeEach(() => {
    cy.intercept('GET', PRODUCTS, {
      data: [{ title: 'first', description: 'description', price: 20 }],
    }).as('getProducts');
    cy.intercept('GET', OPENING_TIMES, {
      data: [{ isOpen: true }],
    }).as('getOpeningTimes');
    cy.intercept('GET', PLACES, {
      data: [{ postcode: 12345, city: 'Aachen', minCartAmount: 12 }],
    }).as('getPlaces');

    cy.visit('/');
    cy.wait('@getOpeningTimes');
    cy.wait('@getProducts');
    cy.wait('@getPlaces');
    cy.get('[data-test=pickup]').click();
  });

  it.only('should NOT render the min cart amount not reached error message', () => {
    cy.contains(
      'p',
      t('cart:cart-min-value-not-reached', { minValue: 12 }),
    ).should('not.exist');
  });

  it('should open the menu modal', () => {
    cy.findByRole('button', { name: 'first description 20.00€' }).click();
    cy.get('[data-test=menu-modal]').first().should('exist');
  });

  it('should add the product to the card', () => {
    cy.findByRole('button', { name: 'first description 20.00€' }).click();
    cy.findByRole('button', { name: t('cart:add') }).click();
    cy.findByText('1 x first - 20.00€').should('exist');
  });

  it('should display the total cart price', () => {
    cy.findByRole('button', { name: 'first description 20.00€' }).click();
    cy.findByRole('button', { name: t('cart:add') }).click();
    cy.findByText('1 x first - 20.00€').should('exist');
  });

  it('should remove the product from the cart', () => {
    cy.findByRole('button', { name: 'first description 20.00€' }).click();
    cy.findByRole('button', { name: t('cart:add') }).click();
    cy.findByText('1 x first - 20.00€').should('exist');
    cy.get('[data-test=delete-button]').click();
    cy.findByText('1 x first - 20.00€').should('not.exist');
  });
});

describe.only('given deliveryType = delivery', () => {
  const postcode = 12345;
  const city = 'Aachen';
  const minCartAmount = 2.0;

  beforeEach(() => {
    cy.intercept('GET', PRODUCTS, {
      data: [{ title: 'first', description: 'description', price: 1 }],
    }).as('getProducts');
    cy.intercept('GET', OPENING_TIMES, {
      data: [{ isOpen: true }],
    }).as('getOpeningTimes');

    cy.intercept('GET', PLACES, {
      data: [{ postcode, city, minCartAmount }],
    }).as('getPlaces');
    cy.visit('/');
    cy.wait('@getOpeningTimes');
    cy.wait('@getProducts');
    cy.wait('@getPlaces');
    cy.get('[data-test=delivery]').click();
    cy.findByRole('button', { name: t('common:confirm') }).click();
  });

  it('should render the minValue not reacted error text', () => {
    cy.contains('p', 'Sie haben noch nicht den Mindestbestellwert').should(
      'exist',
    );
  });

  it('should render the delivery select button with the postcode', () => {
    cy.findByRole('button', { name: 'Liefern nach 12345' }).should('exist');
  });

  it('should render the disabled create order button', () => {
    cy.findByRole('button', { name: t('common:order-now') }).should(
      'be.disabled',
    );
  });

  it('add a product and should still be disabled', () => {
    cy.findByRole('button', { name: 'first description 1.00€' }).click();
    cy.findByRole('button', { name: t('cart:add') }).click();
    cy.findByText('1 x first - 1.00€').should('exist');

    cy.findByRole('button', { name: t('common:order-now') }).should(
      'be.disabled',
    );
  });

  it('add many products, should not be disabled', () => {
    cy.findByRole('button', { name: 'first description 1.00€' }).click();
    cy.findByRole('button', { name: t('cart:add') }).click();

    cy.findByRole('button', { name: 'first description 1.00€' }).click();
    cy.findByRole('button', { name: t('cart:add') }).click();

    cy.findByText('1 x first - 1.00€').should('exist');

    cy.findByRole('button', { name: t('common:order-now') }).should(
      'no.be.disabled',
    );
  });
});

describe('add products with menu to cart', () => {
  beforeEach(() => {
    const extras = [
      {
        _id: 'extraId',
        text: 'extraText ',
        options: [
          { _id: 1, text: 'option', price: 1.0 },
          { _id: 2, text: 'option2', price: 1.0 },
        ],
      },
    ];
    cy.intercept('GET', PRODUCTS, {
      data: [
        {
          title: 'first',
          description: 'description',
          price: 20,
          menu: { title: 'Titel', subtitle: 'subtitle', extras },
        },
      ],
    }).as('getProducts');
    cy.intercept('GET', OPENING_TIMES, {
      data: [{ isOpen: true }],
    }).as('getOpeningTimes');
    cy.visit('/');
    cy.get('[data-test=pickup]').click();
    cy.wait('@getProducts');
    cy.wait('@getOpeningTimes');
  });

  it('should open a product menu', () => {
    cy.findByRole('button', { name: 'first description 20.00€' }).should(
      'exist',
    );
  });

  it('should choose an option', () => {
    cy.findByRole('button', { name: 'first description 20.00€' }).click();
    cy.findByRole('button', { name: 'option (1.00€)' }).click();
    cy.findByRole('option', { name: 'option2 (1.00€)' }).click();
    cy.findByRole('button', { name: t('cart:add') }).click();
  });
});

describe('given shop closed', () => {
  beforeEach(() => {
    cy.intercept('GET', PRODUCTS, {
      data: [{ title: 'first', description: 'description', price: 20 }],
    }).as('getProducts');
    cy.intercept('GET', OPENING_TIMES, {
      data: [{ isOpen: false }],
    }).as('getOpeningTimes');
    cy.visit('/');
    cy.wait('@getOpeningTimes');
    cy.wait('@getProducts');
    cy.get('[data-test=pickup]').click();
  });

  it('should not add a product to the cart', () => {
    cy.findByRole('button', { name: 'first description 20.00€' }).click();
    cy.findByText(
      'Wir haben momentan geschlossen. Morgen sind wir wieder für Sie da.',
    ).should('exist');
  });

  it('should exit the shop closed modal', () => {
    cy.findByRole('button', { name: 'first description 20.00€' }).click();
    cy.findByRole('button', { name: 'Alles klar!' }).click();
    cy.findByText(
      'Wir haben momentan geschlossen. Morgen sind wir wieder für Sie da.',
    ).should('not.exist');
  });
});
