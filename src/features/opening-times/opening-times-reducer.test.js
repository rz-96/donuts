import { rootReducer } from 'redux/root-reducer';
import { describe } from 'riteway';

import {
  getOpeningTimes,
  isOpenToday,
  reducer,
  setOpeningTimes,
} from './opening-times-reducer';

const createState = ({ openingTimes = [] } = {}) => openingTimes;

describe('opening times reducer', async assert => {
  assert({
    given: 'no state',
    should: 'return the valid initial state',
    actual: reducer(undefined, {}),
    expected: createState(),
  });

  {
    const openingTimes = [{ id: 1 }];

    assert({
      given: 'no state and a set opeting times action',
      should: 'set the opening time',
      actual: reducer(undefined, setOpeningTimes(openingTimes)),
      expected: createState({ openingTimes }),
    });
  }

  {
    const openingTimes = [{ id: 1 }];
    const state = createState();
    assert({
      given: 'state and a set opeting times action',
      should: 'set the opening time',
      actual: reducer(state, setOpeningTimes(openingTimes)),
      expected: createState({ openingTimes }),
    });
  }

  assert({
    given: 'no state and a get opening times selector',
    should: 'return the opening times',
    actual: getOpeningTimes(rootReducer(undefined, {})),
    expected: [],
  });

  assert({
    given: 'state and a get opening times seletor',
    should: 'return the opening times',
    actual: getOpeningTimes(
      rootReducer(undefined, setOpeningTimes([{ id: 1 }])),
    ),
    expected: [{ id: 1 }],
  });

  {
    assert({
      given: 'state and a is open today selector',
      should: 'return false',
      actual: isOpenToday(rootReducer(undefined, {})),
      expected: false,
    });
  }

  {
    const openingTimes = [
      { isOpen: false, day: 'sunday', openAt: '10:00', closeAt: '22:00' },
      { day: 'monday', openAt: '10:00', closeAt: '22:00' },
    ];

    assert({
      given: 'state and a is open today selector',
      should: 'return false',
      actual: isOpenToday(
        rootReducer(undefined, setOpeningTimes(openingTimes)),
      ),
      expected: false,
    });
  }

  {
    const openingTimes = [
      { isOpen: true, day: 'sunday', openAt: '10:00', closeAt: '22:00' },
      { day: 'monday', openAt: '10:00', closeAt: '22:00' },
    ];

    assert({
      given: 'state and a is open today selector',
      should: 'return false',
      actual: isOpenToday(
        rootReducer(undefined, setOpeningTimes(openingTimes)),
      ),
      expected: true,
    });
  }
});
