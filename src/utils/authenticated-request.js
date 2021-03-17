import { getToken } from 'features/user-authentication/user-authentication-reducer';
import { call, select } from 'redux-saga/effects';

import { request } from './fp';

function* authenticatedRequest(requestArgs) {
  const token = yield select(getToken);
  return yield call(request, { ...requestArgs, token });
}

export { authenticatedRequest };
