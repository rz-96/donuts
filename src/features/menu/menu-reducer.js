import { createSlice } from '@reduxjs/toolkit';
import {
  curry,
  filter,
  lensPath,
  lensProp,
  map,
  mergeAll,
  nth,
  path,
  pipe,
  prop,
  set,
} from 'ramda';

const slice = 'menu';
const initialState = {
  isOpen: false,
  product: { menu: { extras: [] } },
  selections: {},
};

const handleSetMenuProduct = (state, { payload }) => {
  if (!payload.menu) return { ...state, product: payload };
  const extras = map(
    extra => ({ [extra._id]: extra.options[0] }),
    payload.menu.extras,
  );
  const selections = mergeAll(extras);

  return { ...state, product: payload, selections };
};

const handleSetSelectedOption = (state, { payload: { extraId, optionId } }) => {
  const option = pipe(
    filter(extra => extra._id === extraId),
    nth(0),
    prop('options'),
    filter(option => option._id === optionId),
    nth(0),
  )(state.product.menu.extras);

  return set(lensPath(['selections', extraId]), option, state);
};
export const {
  actions: { setIsMenuOpen, setMenuProduct, setSelectedOption },
  reducer,
} = createSlice({
  initialState,
  name: slice,
  reducers: {
    setSelectedOption: handleSetSelectedOption,
    setIsMenuOpen: (state, { payload }) =>
      set(lensProp('isOpen'), payload, state),
    setMenuProduct: handleSetMenuProduct,
  },
});

const getSelectedOption = curry((state, extraId) =>
  path([slice, 'selections', extraId])(state),
);
const getIsMenuOpen = path([slice, 'isOpen']);
const getMenuProduct = path([slice, 'product']);
const getMenuSelections = path([slice, 'selections']);

export {
  getIsMenuOpen,
  getMenuProduct,
  getMenuSelections,
  getSelectedOption,
  slice,
};
