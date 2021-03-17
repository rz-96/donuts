import { rootReducer } from 'redux/root-reducer';
import { describe } from 'riteway';

import {
  addToCart,
  clearCart,
  getCartForOrder,
  getCartPrice,
  reducer,
} from './cart-reducer';
const createState = (cart = []) => cart;

describe('cart reducer', async assert => {
  assert({
    given: 'no state',
    should: 'return the valid initial state',
    actual: reducer(undefined, {}),
    expected: createState(),
  });

  {
    const state = rootReducer(undefined, {});

    assert({
      given: 'no state and a get cart price selector',
      should: 'return the total cart price',
      actual: getCartPrice(state),
      expected: 0,
    });
  }

  {
    const state = rootReducer(undefined, addToCart({ price: 22 }));

    assert({
      given: 'state and a get cart price selector',
      should: 'return the total cart price',
      actual: getCartPrice(state),
      expected: 22,
    });
  }

  assert({
    given: 'no state and a get cart for order selector',
    should: 'return an empty array',
    actual: getCartForOrder(rootReducer(undefined, {})),
    expected: [],
  });

  assert({
    given: 'no state and a clear cart action',
    should: 'return the initial state',
    actual: reducer(undefined, clearCart()),
    expected: [],
  });

  assert({
    given: 'state and a clear cart action',
    should: 'return the initial state',
    actual: reducer(createState([{ id: 'first' }]), clearCart()),
    expected: [],
  });
});
