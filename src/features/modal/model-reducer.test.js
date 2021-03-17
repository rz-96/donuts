import { rootReducer } from 'redux/root-reducer';
import { describe } from 'riteway';

import {
  dismissModal,
  getIsModalOpen,
  getModalName,
  reducer,
  setModal,
} from './modal-reducer';

const createState = ({ name = '', open = false } = {}) => ({ name, open });

describe('modal reducer', async assert => {
  assert({
    given: 'no state',
    should: 'return the valid initial state',
    actual: reducer(undefined, {}),
    expected: createState(),
  });

  assert({
    given: 'no state and a set modal action',
    should: 'set the modal',
    actual: reducer(undefined, setModal('order')),
    expected: createState({ name: 'order', open: true }),
  });

  assert({
    given: 'state and a set modal action',
    should: 'set the modal',
    actual: reducer(
      createState({ name: 'delivery', open: false }),
      setModal('delivery'),
    ),
    expected: createState({ name: 'delivery', open: true }),
  });

  assert({
    given: 'no state and a get modal name selector',
    should: 'return the modal name',
    actual: getModalName(rootReducer(undefined, {})),
    expected: '',
  });

  assert({
    given: 'state and a get modal name selector',
    should: 'return the modal name',
    actual: getModalName(rootReducer(undefined, setModal('order'))),
    expected: 'order',
  });

  assert({
    given: 'no state and a get modal open selector',
    should: 'return false',
    actual: getIsModalOpen(rootReducer(undefined, {})),
    expected: false,
  });

  assert({
    given: 'state and a get modal open selector',
    should: 'return false',
    actual: getIsModalOpen(rootReducer(undefined, setModal('order'))),
    expected: true,
  });

  assert({
    given: 'no state and a dismiss modal action',
    should: 'dismiss the modal',
    actual: reducer(undefined, dismissModal()),
    expected: createState({ open: false }),
  });

  assert({
    given: 'state and a dismiss modal action',
    should: 'dismiss the modal',
    actual: reducer(createState({ open: true }), dismissModal()),
    expected: createState({ open: false }),
  });
});
