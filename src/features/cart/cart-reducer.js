import { createSlice } from '@reduxjs/toolkit';
import { isEmpty, keys, map, values } from 'ramda';
import pipe from 'ramda/src/pipe';
import pluck from 'ramda/src/pluck';
import prop from 'ramda/src/prop';
import sum from 'ramda/src/sum';
import { v4 as uuidv4 } from 'uuid';

const slice = 'cart';
const initialState = [];

const handleAddToCart = (state, { payload }) => {
  const toAdd = { id: uuidv4(), ...payload };
  return [...state, toAdd];
};

const handleRemoveFromCart = (state, { payload }) =>
  state.filter(e => e.id != payload);

export const {
  actions: { addToCart, removeFromCart, clearCart },
  reducer,
} = createSlice({
  initialState,
  name: slice,
  reducers: {
    addToCart: handleAddToCart,
    removeFromCart: handleRemoveFromCart,
    clearCart: () => initialState,
  },
});

const getProductsFromCart = prop(slice);
const getCartPrice = pipe(getProductsFromCart, pluck('price'), sum);
const mapCartProductToCartProduct = ({ _id, selections }) => ({
  product: _id,
  extraIds: keys(selections),
  options: pipe(values, pluck('_id'))(selections),
});
const getCartForOrder = pipe(prop(slice), map(mapCartProductToCartProduct));

const getIsCartEmpty = pipe(prop(slice), isEmpty);

export {
  getCartForOrder,
  getCartPrice,
  getIsCartEmpty,
  getProductsFromCart,
  slice,
};
