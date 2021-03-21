import { createSlice } from '@reduxjs/toolkit';
import { getCartPrice } from 'features/cart/cart-reducer.js';
import { propOr } from 'ramda';
import equals from 'ramda/src/equals';
import pipe from 'ramda/src/pipe';
import prop from 'ramda/src/prop';
import { createSelector } from 'reselect';

const slice = 'delivery';

const initialState = {
  orderType: 'none',
  isAddressModalOpen: false,
  paymentId: '',
  address: {},
  personalDetails: {},
  isCreating: false,
  places: [],
  selectedPlace: {},
};

export const {
  actions: {
    setPersonalDetails,
    setPickup,
    setDelivery,
    setAddress,
    setPlaces,
    setIsAddressModalOpen,
    resetOrderType,
    setPaymentId,
    setIsCreating,
    setSelectedPlace,
  },
  reducer,
} = createSlice({
  initialState,
  name: slice,
  reducers: {
    setIsAddressModalOpen: (state, { payload }) => ({
      ...state,
      isAddressModalOpen: payload,
    }),
    setPersonalDetails: (state, { payload }) => ({
      ...state,
      personalDetails: payload,
    }),
    setPlaces: (state, { payload }) => ({ ...state, places: payload }),
    setAddress: (state, { payload }) => ({ ...state, address: payload }),
    resetOrderType: state => ({ ...state, orderType: 'none' }),
    setPickup: state => ({ ...state, orderType: 'pickup' }),
    setDelivery: state => ({ ...state, orderType: 'delivery' }),
    setPaymentId: (state, { payload }) => ({ ...state, paymentId: payload }),
    setIsCreating: (state, { payload }) => ({ ...state, isCreating: payload }),
    setSelectedPlace: (state, { payload }) => ({
      ...state,
      selectedPlace: payload,
    }),
  },
});

const getDeliverySlice = prop(slice);
const getOrderType = pipe(getDeliverySlice, prop('orderType'));
const getAddress = pipe(getDeliverySlice, prop('address'));
const getPlaces = pipe(getDeliverySlice, prop('places'));
const getIsAddressModalOpen = pipe(
  getDeliverySlice,
  prop('isAddressModalOpen'),
);
const getPersonalDetails = pipe(getDeliverySlice, prop('personalDetails'));

const getIsOrderTypeUnset = pipe(getOrderType, equals('none'));
const getPaymentId = pipe(getDeliverySlice, prop('paymentId'));
const getIsCreating = pipe(getDeliverySlice, prop('isCreating'));
const getSelectedPlace = pipe(getDeliverySlice, prop('selectedPlace'));
const getMinValue = pipe(
  getDeliverySlice,
  prop('selectedPlace'),
  propOr(0, 'minCartAmount'),
);

const getIsMinValueReached = createSelector(
  [getCartPrice, getMinValue],
  (cartPrice, minValue) => cartPrice >= minValue,
);

const getDeliveryFee = pipe(
  getDeliverySlice,
  prop('selectedPlace'),
  propOr(0, 'extraDeliveryFee'),
);

export {
  getAddress,
  getDeliveryFee,
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
  slice,
};
