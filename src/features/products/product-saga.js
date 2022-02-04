import { PRODUCTS } from 'data/routes';
import { call, put, takeEvery } from 'redux-saga/effects';
import { request } from 'utils/fp';

import { setProducts } from './products-reducer';

function* handleFetchProducts() {
  const data = yield call(request, { route: PRODUCTS });
  yield put(setProducts(data));
}

const fetchProducts = payload => ({ type: fetchProducts.type, payload });
fetchProducts.type = 'PRODUCTS/fetchProducts';

function* watchFetchProducts() {
  yield takeEvery(fetchProducts.type, handleFetchProducts);
}

export { fetchProducts, handleFetchProducts, watchFetchProducts };
