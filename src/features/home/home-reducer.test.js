import { rootReducer, rootState } from 'redux/root-reducer.js';
import { describe } from 'riteway';

import { getCount, increment, reducer } from './home-reducer.js';

const createState = ({ count = 0 } = {}) => ({ count });

describe('home reducer', async assert => {
  assert({
    given: 'no arguments',
    should: 'return the valid initial state',
    actual: reducer(undefined, {}),
    expected: createState(),
  });

  assert({
    given: 'no state and an increment action',
    should: 'increment the count',
    actual: reducer(undefined, increment()),
    expected: createState({ count: 1 }),
  });

  assert({
    given: 'state and an increment action',
    should: 'increment the count',
    actual: reducer(createState({ count: 40 }), increment()),
    expected: createState({ count: 41 }),
  });

  assert({
    given: 'default state and a get count selector',
    should: 'return 0',
    actual: getCount(rootState),
    expected: 0,
  });

  {
    const count = 5;
    const actions = Array.from({ length: count }, () => increment());
    const state = actions.reduce(rootReducer, rootState);

    assert({
      given: 'state with a count and a get count selector',
      should: 'return the count',
      actual: getCount(state),
      expected: 5,
    });
  }
});
