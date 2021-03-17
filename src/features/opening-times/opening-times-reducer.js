import { createSlice } from '@reduxjs/toolkit';
import { has, nth } from 'ramda';
import filter from 'ramda/src/filter';
import pipe from 'ramda/src/pipe';
import prop from 'ramda/src/prop';
import propOr from 'ramda/src/propOr';

const slice = 'openingTimes';

const initialState = [];

export const {
  actions: { setOpeningTimes },
  reducer,
} = createSlice({
  initialState,
  name: slice,
  reducers: {
    setOpeningTimes: (state, { payload }) => payload,
  },
});

const getOpeningTimes = prop(slice);

const isOpenToday = pipe(
  prop(slice),
  filter(has('isOpen')),
  nth(0),
  propOr(false, 'isOpen'),
);

export { getOpeningTimes, isOpenToday, slice };
