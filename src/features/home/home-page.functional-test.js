import { OPENING_TIMES, PRODUCTS } from '../../data/routes';

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

describe('add products to cart', () => {
  beforeEach(() => {
    cy.intercept('GET', PRODUCTS, {
      data: [{ title: 'first', description: 'description', price: 20 }],
    }).as('getProducts');
    cy.intercept('GET', OPENING_TIMES, {
      data: [{ isOpen: true }],
    }).as('getOpeningTimes');
    cy.visit('/');
    cy.wait('@getOpeningTimes');
    cy.wait('@getProducts');
    cy.get('[data-test=pickup]').click();
  });

  it('should open the menu modal', () => {
    cy.findByRole('button', { name: 'first description 20.00€' }).click();
    cy.get('[data-test=menu-modal]').first().should('exist');
  });

  it('should add the product to the card', () => {
    cy.findByRole('button', { name: 'first description 20.00€' }).click();
    cy.findByRole('button', { name: 'Hinzufügen' }).click();
    cy.findByText('1 x first - 20.00€').should('exist');
  });

  it('should display the total cart price', () => {
    cy.findByRole('button', { name: 'first description 20.00€' }).click();
    cy.findByRole('button', { name: 'Hinzufügen' }).click();
    cy.findByText('1 x first - 20.00€').should('exist');
  });

  it('should remove the product from the cart', () => {
    cy.findByRole('button', { name: 'first description 20.00€' }).click();
    cy.findByRole('button', { name: 'Hinzufügen' }).click();
    cy.findByText('1 x first - 20.00€').should('exist');
    cy.get('[data-test=delete-button]').click();
    cy.findByText('1 x first - 20.00€').should('not.exist');
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
    cy.findByRole('button', { name: 'Hinzufügen' }).click();
  });
});

describe('shop closed', () => {
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
