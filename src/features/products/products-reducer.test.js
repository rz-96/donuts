import { rootReducer } from 'redux/root-reducer';
import { describe } from 'riteway';

import {
  getCategories,
  getProductsArray,
  reducer,
  setProducts,
} from './products-reducer';

const createState = () => [];

describe('products reducer', async assert => {
  assert({
    given: 'no state',
    should: 'return the valid initial state',
    actual: reducer(undefined, {}),
    expected: createState(),
  });

  {
    const products = [{ id: 'first' }, { id: 'second' }];

    assert({
      given: 'no state and a set products action ',
      should: 'set the products',
      actual: reducer(undefined, setProducts(products)),
      expected: products,
    });
  }

  {
    const products = [{ id: 'old' }];
    const toSet = [{ id: 'new' }];

    assert({
      given: 'state and a set products action',
      should: 'set the products',
      actual: reducer(products, setProducts(toSet)),
      expected: toSet,
    });
  }

  {
    const products = [{ id: 'first' }];
    const state = rootReducer(undefined, setProducts(products));

    assert({
      given: 'no state and a get products array selector',
      should: 'return the products as an array',
      actual: getProductsArray(state),
      expected: products,
    });
  }

  assert({
    given: 'no state and a get categories selector',
    should: 'return an empty array',
    actual: getCategories(rootReducer(undefined, {})),
    expected: [],
  });

  {
    const products = [
      { id: '1', category: 'test' },
      { id: '2', category: 'another' },
    ];

    const state = rootReducer(undefined, setProducts(products));
    const categories = ['test', 'another'];

    assert({
      given: 'state and a get categories selector',
      should: 'return the categories',
      actual: getCategories(state),
      expected: categories,
    });
  }

  {
    const products = [
      { id: '1', category: 'test' },
      { id: '2', category: 'test' },
    ];

    const state = rootReducer(undefined, setProducts(products));
    const categories = ['test'];

    assert({
      given: 'state and a get categories selector',
      should: 'return only one category',
      actual: getCategories(state),
      expected: categories,
    });
  }
});
