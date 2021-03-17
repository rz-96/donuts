import { createSlice } from '@reduxjs/toolkit';
import { path } from 'ramda';

const slice = 'userAuthentication';
const initialState = {};

export const { reducer } = createSlice({
  initialState,
  name: slice,
});

const getToken = path([slice, 'token']);

export { getToken, slice };
