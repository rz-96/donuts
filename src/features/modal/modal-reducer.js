import { createSlice } from '@reduxjs/toolkit';
import { pipe, prop } from 'ramda';

const slice = 'modal';
const initialState = { name: '', open: false };

export const {
  actions: { setModal, dismissModal },
  reducer,
} = createSlice({
  initialState,
  name: slice,
  reducers: {
    setModal: (state, { payload }) => ({ ...state, name: payload, open: true }),
    dismissModal: state => ({ ...state, open: false }),
  },
});

const getModalSlice = prop(slice);
const getModalName = pipe(getModalSlice, prop('name'));
const getIsModalOpen = pipe(getModalSlice, prop('open'));

export { getIsModalOpen, getModalName, slice };
