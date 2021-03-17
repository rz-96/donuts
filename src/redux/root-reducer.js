import { combineReducers } from '@reduxjs/toolkit';
import {
  reducer as cartReducer,
  slice as cartSlice,
} from 'features/cart/cart-reducer';
import {
  reducer as deliveryReducer,
  slice as deliverySlice,
} from 'features/delivery/delivery-reducer';
import {
  reducer as homeReducer,
  slice as homeSlice,
} from 'features/home/home-reducer.js';
import {
  reducer as menuReducer,
  slice as menuSlice,
} from 'features/menu/menu-reducer';
import {
  reducer as modalReducer,
  slice as modalSlice,
} from 'features/modal/modal-reducer';
import {
  reducer as openingTimesReducer,
  slice as openingTimesSlice,
} from 'features/opening-times/opening-times-reducer';
import {
  reducer as productReducer,
  slice as productSlice,
} from 'features/products/products-reducer';
import {
  reducer as userAuthenticationReducer,
  slice as userAuthenticationSlice,
} from 'features/user-authentication/user-authentication-reducer';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const homeReducerConfig = {
  key: homeSlice,
  storage,
  whitelist: ['count', 'menu'],
};

const rootReducer = combineReducers({
  [homeSlice]: persistReducer(homeReducerConfig, homeReducer),
  [userAuthenticationSlice]: userAuthenticationReducer,
  [productSlice]: productReducer,
  [cartSlice]: cartReducer,
  [deliverySlice]: deliveryReducer,
  [menuSlice]: menuReducer,
  [openingTimesSlice]: openingTimesReducer,
  [modalSlice]: modalReducer,
});

const rootState = rootReducer(undefined, {});

export { rootReducer, rootState };
