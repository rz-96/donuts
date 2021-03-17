import {
  watchFetchOpeningTimes,
  watchFetchPlaces,
  watchInitializeApp,
} from 'features/app-loading/app-loading-saga';
import {
  watchCapturePayPal,
  watchPlaceOrder,
} from 'features/create-order/order-saga';
import { watchFetchProducts } from 'features/products/product-saga';
import { all } from 'redux-saga/effects';

function* rootSaga() {
  yield all([
    watchFetchProducts(),
    watchPlaceOrder(),
    watchFetchOpeningTimes(),
    watchInitializeApp(),
    watchCapturePayPal(),
    watchFetchPlaces(),
  ]);
}

export { rootSaga };
