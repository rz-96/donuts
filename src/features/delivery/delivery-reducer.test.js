import { addToCart } from 'features/cart/cart-reducer';
import { rootReducer } from 'redux/root-reducer';
import { describe } from 'riteway';

import {
  getAddress,
  getIsAddressModalOpen,
  getIsCreating,
  getIsMinValueReached,
  getIsOrderTypeUnset,
  getMinValue,
  getOrderType,
  getPaymentId,
  getPersonalDetails,
  getPlaces,
  getSelectedPlace,
  reducer,
  resetOrderType,
  setAddress,
  setDelivery,
  setIsAddressModalOpen,
  setIsCreating,
  setPaymentId,
  setPersonalDetails,
  setPickup,
  setPlaces,
  setSelectedPlace,
} from './delivery-reducer';

const createState = ({
  isAddressModalOpen = false,
  orderType = 'none',
  paymentId = '',
  address = {},
  personalDetails = {},
  isCreating = false,
  places = [],
  selectedPlace = {},
} = {}) => ({
  orderType,
  isAddressModalOpen,
  paymentId,
  address,
  personalDetails,
  isCreating,
  places,
  selectedPlace,
});

describe('delivery reducer', async assert => {
  assert({
    given: 'no state',
    should: 'return the valid initial state',
    actual: reducer(undefined, {}),
    expected: createState(),
  });

  assert({
    given: 'no state and a set pickup action',
    should: 'set the orderType to pickup',
    actual: reducer(undefined, setPickup()),
    expected: createState({ orderType: 'pickup' }),
  });

  {
    const state = createState();
    assert({
      given: 'state and a set pickup action',
      should: 'set the orderType to pickup',
      actual: reducer(state, setPickup),
      expected: createState({ orderType: 'pickup' }),
    });
  }

  assert({
    given: 'no state and a set delivery action',
    should: 'set the orderType to delivery',
    actual: reducer(undefined, setDelivery()),
    expected: createState({ orderType: 'delivery' }),
  });

  {
    const state = createState();
    assert({
      given: 'state and a set delivery action',
      should: 'set the orderType to delivery',
      actual: reducer(state, setDelivery()),
      expected: createState({ orderType: 'delivery' }),
    });
  }

  assert({
    given: 'state and a reset order type action',
    should: 'reset the order type',
    actual: reducer(createState({ orderType: 'delivery' }), resetOrderType()),
    expected: createState(),
  });

  assert({
    given: 'no state and a get ordertype selector',
    should: 'return none',
    actual: getOrderType(rootReducer(undefined, {})),
    expected: 'none',
  });

  {
    const state = rootReducer(undefined, setPickup());

    assert({
      given: 'state and a set pickup action',
      should: 'set the ordertype to pickup',
      actual: getOrderType(state),
      expected: 'pickup',
    });
  }

  assert({
    given: 'no state and a get is ordertype unset selector',
    should: 'return true',
    actual: getIsOrderTypeUnset(rootReducer(undefined, {})),
    expected: true,
  });

  assert({
    given: 'state and a a get is ordertype unset selector',
    should: 'return false',
    actual: getIsOrderTypeUnset(rootReducer(undefined, setPickup())),
    expected: false,
  });

  {
    const address = { street: 'street' };
    assert({
      given: 'no state and a set address action',
      should: 'set the action',
      actual: reducer(undefined, setAddress(address)),
      expected: createState({ address }),
    });
  }

  {
    const state = createState({ address: { road: 'otherRoad' } });
    const address = 'address';

    assert({
      given: 'state and a set address action',
      should: 'set the address',
      actual: reducer(state, setAddress(address)),
      expected: createState({ address }),
    });
  }

  assert({
    given: 'no state and a get address selector',
    should: 'return the address',
    actual: getAddress(rootReducer(undefined, {})),
    expected: {},
  });

  {
    const address = { street: 'street' };
    assert({
      given: 'state and a get address selector',
      should: 'return the address',
      actual: getAddress(rootReducer(undefined, setAddress(address))),
      expected: address,
    });
  }

  assert({
    given: 'no state and a set is address modal open action',
    should: 'set is address modal open',
    actual: reducer(undefined, setIsAddressModalOpen(true)),
    expected: createState({ isAddressModalOpen: true }),
  });

  assert({
    given: 'state and a set is address modal open action',
    should: 'set is address modal open',
    actual: reducer(
      createState({ isAddressModalOpen: true }),
      setIsAddressModalOpen(false),
    ),
    expected: createState({ isAddressModalOpen: false }),
  });

  assert({
    given: 'no state and a get is address modal open selector',
    should: 'return false',
    actual: getIsAddressModalOpen(rootReducer(undefined, {})),
    expected: false,
  });

  assert({
    given: 'state and a get is address modal open selector',
    should: 'return true',
    actual: getIsAddressModalOpen(
      rootReducer(undefined, setIsAddressModalOpen(true)),
    ),
    expected: true,
  });

  {
    const personalDetails = { email: 'email@test.de' };

    assert({
      given: 'no state and a set personal details action',
      should: 'set the personal details',
      actual: reducer(undefined, setPersonalDetails(personalDetails)),
      expected: createState({ personalDetails }),
    });
  }

  {
    const personalDetails = { email: '' };

    assert({
      given: 'state and a set personal details action',
      should: 'set the personal details',
      actual: reducer(
        createState({ personalDetails: { email: 'old' } }),
        setPersonalDetails(personalDetails),
      ),
      expected: createState({ personalDetails }),
    });
  }

  assert({
    given: 'no state and a get personal details selector',
    should: 'return the personal details',
    actual: getPersonalDetails(rootReducer(undefined, {})),
    expected: {},
  });

  {
    const personalDetails = { email: '' };

    assert({
      given: 'state and a get personal details selector',
      should: 'return the personal details',
      actual: getPersonalDetails(
        rootReducer(undefined, setPersonalDetails(personalDetails)),
      ),
      expected: personalDetails,
    });
  }

  assert({
    given: 'no state and a set payment id',
    should: 'set the payment id',
    actual: reducer(undefined, setPaymentId('id')),
    expected: createState({ paymentId: 'id' }),
  });

  assert({
    given: 'state and a set payment id',
    should: 'set the payment id',
    actual: reducer(createState({ paymentId: 'otherId' }), setPaymentId('id')),
    expected: createState({ paymentId: 'id' }),
  });

  assert({
    given: 'no state and a get payment id selector',
    should: 'return the payment id',
    actual: getPaymentId(rootReducer(undefined, {})),
    expected: '',
  });

  {
    const state = rootReducer(undefined, setPaymentId('id'));

    assert({
      given: 'state and a get payment id selector',
      should: 'return the payment id',
      actual: getPaymentId(state),
      expected: 'id',
    });
  }

  assert({
    given: 'no state and a set is creating action',
    should: 'set is creating',
    actual: reducer(undefined, setIsCreating(true)),
    expected: createState({ isCreating: true }),
  });

  assert({
    given: 'state and a set is creating action',
    should: 'set is creating',
    actual: reducer(createState({ isCreating: true }), setIsCreating(false)),
    expected: createState({ isCreating: false }),
  });

  assert({
    given: 'no state and a get is creating selector',
    should: 'return false',
    actual: getIsCreating(rootReducer(undefined, {})),
    expected: false,
  });

  assert({
    given: 'state and a get is creating selector',
    should: 'return true',
    actual: getIsCreating(rootReducer(undefined, setIsCreating(true))),
    expected: true,
  });

  assert({
    given: 'no state and a set places action',
    should: 'set the places',
    actual: reducer(undefined, setPlaces([{ id: 'first' }])),
    expected: createState({ places: [{ id: 'first' }] }),
  });

  assert({
    given: 'state and a set places action',
    should: 'set the places',
    actual: reducer(
      createState({ places: [{ id: 'first' }] }),
      setPlaces([{ id: 'new' }]),
    ),
    expected: createState({ places: [{ id: 'new' }] }),
  });

  assert({
    given: 'no state and a get places selector',
    should: 'return the places',
    actual: getPlaces(rootReducer(undefined, {})),
    expected: [],
  });

  assert({
    given: 'state and a get places selector',
    should: 'return the places',
    actual: getPlaces(rootReducer(undefined, setPlaces([{ id: 'first' }]))),
    expected: [{ id: 'first' }],
  });

  {
    const selectedPlace = { postcode: '123' };
    assert({
      given: 'no state and a set selected place action',
      should: 'set the selected place',
      actual: reducer(undefined, setSelectedPlace(selectedPlace)),
      expected: createState({ selectedPlace }),
    });
  }

  {
    const selectedPlace = { postcode: '123' };
    assert({
      given: 'state and a set selected place action',
      should: 'set the selected place',
      actual: reducer(
        createState({ selectedPlace: { postcode: '222' } }),
        setSelectedPlace(selectedPlace),
      ),
      expected: createState({ selectedPlace }),
    });
  }

  assert({
    given: 'no state and a get selected place selector',
    should: 'return the initial place',
    actual: getSelectedPlace(rootReducer(undefined, {})),
    expected: {},
  });

  assert({
    given: 'state and a get selected place selector',
    should: 'return the place',
    actual: getSelectedPlace(
      rootReducer(undefined, setSelectedPlace({ postcode: '1234' })),
    ),
    expected: { postcode: '1234' },
  });

  assert({
    given: 'no state and a get min value selector',
    should: 'return the min value',
    actual: getMinValue(rootReducer(undefined, {})),
    expected: 0,
  });

  assert({
    given: 'state and a get min value selector',
    should: 'return the min value',
    actual: getMinValue(
      rootReducer(undefined, setSelectedPlace({ minCartAmount: 10 })),
    ),
    expected: 10,
  });

  assert({
    given: 'no state and a get is min value reached selector',
    should: 'return true',
    actual: getIsMinValueReached(rootReducer(undefined, {})),
    expected: true,
  });

  {
    const actions = [
      addToCart({ price: 10 }),
      setSelectedPlace({ minCartAmount: 20 }),
    ];

    const state = actions.reduce(rootReducer, {});
    assert({
      given: 'state and a get is min value reached selector',
      should: 'return false',
      actual: getIsMinValueReached(state),
      expected: false,
    });
  }

  {
    const actions = [
      addToCart({ price: 20 }),
      setSelectedPlace({ minCartAmount: 19 }),
    ];

    const state = actions.reduce(rootReducer, {});
    assert({
      given: 'state and a get is min value reached selector',
      should: 'return false',
      actual: getIsMinValueReached(state),
      expected: true,
    });
  }
});
