import { cloneableGenerator } from '@redux-saga/testing-utils';
import { PRODUCTS } from 'data/routes.js';
import { call, put } from 'redux-saga/effects';
import { describe } from 'riteway';
import { request } from 'utils/fp.js';

import { handleFetchProducts } from './product-saga.js';
import { setProducts } from './products-reducer.js';

describe('products saga', async assert => {
  const gen = cloneableGenerator(handleFetchProducts)();

  assert({
    given: 'saga started',
    should: 'return a get products request',
    actual: gen.next().value,
    expected: call(request, { route: PRODUCTS }),
  });

  {
    const products = ['first', 'second'];
    const response = { data: products };

    assert({
      given: 'given a response',
      should: 'set the data as products',
      actual: gen.next(response).value,
      expected: put(setProducts(products)),
    });
  }
});
