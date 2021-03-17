import { rootReducer } from 'redux/root-reducer';
import { describe } from 'riteway';

import {
  getIsMenuOpen,
  getMenuProduct,
  getMenuSelections,
  reducer,
  setIsMenuOpen,
  setMenuProduct,
  setSelectedOption,
} from './menu-reducer';

const createState = ({
  isOpen = false,
  product = { menu: { extras: [] } },
  selections = {},
} = {}) => ({
  isOpen,
  product,
  selections,
});

const options = [
  { _id: 'optionId', text: 'first', price: '1.00' },
  { _id: 'option2Id', text: 'second', price: '2.00' },
];

const createExtra = () => ({
  _id: 'extra',
  options,
});

const createMenu = ({ text = 'test menu' } = {}) => ({
  text,
  extras: [createExtra()],
});

const createProduct = ({ menu = createMenu() } = {}) => ({ _id: '1', menu });
describe('menu reducer', async assert => {
  assert({
    given: 'no state',
    should: 'return the valid initial state',
    actual: reducer(undefined, {}),
    expected: createState(),
  });

  {
    const product = createProduct();
    const state = {
      ...createState({ product }),
      selections: {
        [product.menu.extras[0]._id]: options[0],
      },
    };

    assert({
      given: 'no state and a set menu product action',
      should: 'set the menu product',
      actual: reducer(undefined, setMenuProduct(product)),
      expected: state,
    });

    {
      const state = createState();
      const result = { ...state, product, selections: { extra: options[0] } };

      assert({
        given: 'state and a set menu product action',
        should: 'set the menu product',
        actual: reducer(state, setMenuProduct(product)),
        expected: result,
      });
    }
  }

  {
    const product = { _id: 1, menu: undefined };

    assert({
      given: 'no state and a set menu product action',
      should: 'set the product',
      actual: reducer(undefined, setMenuProduct(product)),
      expected: {
        ...createState({ product }),
      },
    });
  }

  assert({
    given: 'no state and a get menu product selector',
    should: 'return an emtpy object',
    actual: getMenuProduct(rootReducer(undefined, {})),
    expected: { menu: { extras: [] } },
  });

  {
    const product = createProduct();

    assert({
      given: 'state and a get menu product selector',
      should: 'return the product',
      actual: getMenuProduct(rootReducer(undefined, setMenuProduct(product))),
      expected: product,
    });
  }

  assert({
    given: 'no state and a set is menu open action',
    should: 'set is menu open',
    actual: reducer(undefined, {}),
    expected: createState({ isOpen: false }),
  });

  assert({
    given: 'state and a set is menu open action',
    should: 'set is menu open',
    actual: reducer(undefined, setIsMenuOpen(true)),
    expected: createState({ isOpen: true }),
  });

  assert({
    given: 'no state and a is menu open selector',
    should: 'return false',
    actual: getIsMenuOpen(rootReducer(undefined, {})),
    expected: false,
  });

  assert({
    given: 'no state and a is menu open selector',
    should: 'return false',
    actual: getIsMenuOpen(rootReducer(undefined, setIsMenuOpen(true))),
    expected: true,
  });

  {
    const extras = [{ _id: 'extraId', options: [{ ...options[0] }] }];
    const state = createState({
      product: {
        menu: { extras },
      },
    });
    assert({
      given: 'state and a set selected option action',
      should: 'set the option',
      actual: reducer(
        state,
        setSelectedOption({ extraId: 'extraId', optionId: options[0]._id }),
      ),
      expected: { ...state, selections: { extraId: options[0] } },
    });
  }

  {
    const state = createState({
      product: {
        menu: { extras: [{ _id: 'extraId', options: [{ ...options[0] }] }] },
      },
      selections: { otherId: options[1] },
    });
    assert({
      given: 'no state and a set selected option action',
      should: 'set the option',
      actual: reducer(
        state,
        setSelectedOption({ extraId: 'extraId', optionId: options[0]._id }),
      ),
      expected: {
        ...state,
        selections: { otherId: options[1], extraId: options[0] },
      },
    });
  }

  assert({
    given: 'no state and a get menu selections selector',
    should: 'return the selections',
    actual: getMenuSelections(rootReducer(undefined, {})),
    expected: {},
  });

  {
    const state = createState({
      product: {
        menu: { extras: [{ _id: 'extraId', options: [{ ...options[0] }] }] },
      },
      selections: { otherId: options[1] },
    });
    assert({
      given: 'state and a get menu selections selector',
      should: 'return the selections',
      actual: getMenuSelections(
        rootReducer(
          { menu: state },
          setSelectedOption({ extraId: 'extraId', optionId: options[0]._id }),
        ),
      ),
      expected: { otherId: options[1], extraId: options[0] },
    });
  }
});
