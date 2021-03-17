import { createSlice } from '@reduxjs/toolkit';
import { path } from 'ramda';

const slice = 'home';
const initialState = { count: 0 };

export const {
  actions: { increment },
  reducer,
} = createSlice({
  initialState,
  name: slice,
  reducers: {
    increment: state => ({ ...state, count: state.count + 1 }),
  },
});

const getCount = path([slice, 'count']);

export { getCount, slice };
