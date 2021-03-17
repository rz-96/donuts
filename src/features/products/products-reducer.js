import { createSlice } from '@reduxjs/toolkit';
import { pipe, pluck, uniq } from 'ramda';
import prop from 'ramda/src/prop';

const slice = 'products';
const initialState = [];

export const {
  reducer,
  actions: { setProducts },
} = createSlice({
  initialState,
  name: slice,
  reducers: {
    setProducts: (state, { payload }) => payload,
  },
});

const getProductsArray = prop(slice);
const getCategories = pipe(getProductsArray, pluck('category'), uniq);

export { getCategories, getProductsArray, slice };
