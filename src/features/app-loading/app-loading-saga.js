import { OPENING_TIMES, PLACES } from 'data/routes';
import {
  setPlaces,
  setSelectedPlace,
} from 'features/delivery/delivery-reducer';
import { DELIVERY_SELECT } from 'features/modal/modal-constants';
import { setModal } from 'features/modal/modal-reducer';
import { setOpeningTimes } from 'features/opening-times/opening-times-reducer';
import { fetchProducts } from 'features/products/product-saga';
import { call, put, takeEvery } from 'redux-saga/effects';
import { request } from 'utils/fp';

function* handleFetchOpeningTimes() {
  const { data } = yield call(request, { route: OPENING_TIMES });
  yield put(setOpeningTimes(data));
}

function* handleInitializeApp() {
  yield put(fetchOpeningTimes());
  yield put(fetchPlaces());
  yield put(fetchProducts());
}

function* handleFetchPlaces() {
  const { data } = yield call(request, { route: PLACES });
  yield put(setPlaces(data));
  yield put(setSelectedPlace(data[0]));
  yield put(setModal(DELIVERY_SELECT));
}

const initializeApp = payload => ({ type: initializeApp.type, payload });
initializeApp.type = 'APP_LOADING/initializeApp';

const fetchOpeningTimes = payload => ({
  type: fetchOpeningTimes.type,
  payload,
});
fetchOpeningTimes.type = 'OPENING_TIMES/fetchOpeningTimes';

const fetchPlaces = payload => ({ type: fetchPlaces.type, payload });
fetchPlaces.type = 'DELIVERY/fetchPlaces';

function* watchInitializeApp() {
  yield takeEvery(initializeApp.type, handleInitializeApp);
}

function* watchFetchOpeningTimes() {
  yield takeEvery(fetchOpeningTimes.type, handleFetchOpeningTimes);
}

function* watchFetchPlaces() {
  yield takeEvery(fetchPlaces.type, handleFetchPlaces);
}

export {
  fetchOpeningTimes,
  handleFetchOpeningTimes,
  handleFetchPlaces,
  handleInitializeApp,
  initializeApp,
  watchFetchOpeningTimes,
  watchFetchPlaces,
  watchInitializeApp,
};
