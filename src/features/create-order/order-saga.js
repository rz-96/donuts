import { CART_ITEMS, ORDERS, PAYMENTS } from 'data/routes';
import { clearCart, getCartForOrder } from 'features/cart/cart-reducer';
import {
  getPaymentId,
  getSelectedPlace,
  setIsCreating,
} from 'features/delivery/delivery-reducer';
import { ORDER_CONFIRM } from 'features/modal/modal-constants';
import { setModal } from 'features/modal/modal-reducer';
import { pluck } from 'ramda';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import { request } from 'utils/fp';

function* handleCapturePayPal({ payload: { orderId, ...rest } }) {
  const paymentId = yield select(getPaymentId);
  const { status } = yield call(request, {
    method: 'PATCH',
    route: PAYMENTS + '/' + paymentId,
    body: { paymentId: orderId },
  });

  yield call(handlePlaceOrder, { payload: rest });
  console.log('payment', status);
}

const capturePayPal = payload => ({ type: capturePayPal.type, payload });
capturePayPal.type = 'ORDER/capturePayPal';

function* handlePlaceOrder({
  payload: { name, phone, email, comment, street, city, paymentType },
}) {
  yield put(setIsCreating(true));
  const cartProducts = yield select(getCartForOrder);
  const { postcode: plz = '' } = yield select(getSelectedPlace);

  const result = yield call(request, {
    method: 'POST',
    route: CART_ITEMS,
    body: cartProducts,
  });
  const cartItems = pluck('_id', result);

  yield call(request, {
    method: 'POST',
    route: ORDERS,
    body: {
      cartItems,
      street,
      plz,
      city,
      paymentType,
      name,
      phone,
      email,
      comment,
    },
  });
  yield put(setIsCreating(false));
  yield put(setModal(ORDER_CONFIRM));
  yield put(clearCart());
}

const placeOrder = payload => ({ type: placeOrder.type, payload });
placeOrder.type = 'ORDER/placeOrder';

function* watchPlaceOrder() {
  yield takeEvery(placeOrder.type, handlePlaceOrder);
}

function* watchCapturePayPal() {
  yield takeEvery(capturePayPal.type, handleCapturePayPal);
}

export {
  capturePayPal,
  handlePlaceOrder,
  placeOrder,
  watchCapturePayPal,
  watchPlaceOrder,
};
