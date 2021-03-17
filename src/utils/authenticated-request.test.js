import { getToken } from 'features/user-authentication/user-authentication-reducer.js';
import { call, select } from 'redux-saga/effects';
import { describe } from 'riteway';

import { authenticatedRequest } from './authenticated-request.js';
import { request } from './fp.js';

describe('authenticated request saga', async assert => {
  const route = 'https://hopin.to/api/lel';
  const method = 'POST';
  const body = { pod: 'engpod-videoplatform' };

  const gen = authenticatedRequest({ route, method, body });

  assert({
    given: 'saga started',
    should: 'fetch the token from store',
    actual: gen.next().value,
    expected: select(getToken),
  });

  const token = 'token-abc-123';

  assert({
    given: 'a token',
    should: 'make an authenticated request',
    actual: gen.next(token).value,
    expected: call(request, { route, method, body, token }),
  });

  assert({
    given: 'nothing',
    should: 'be done',
    actual: gen.next().done,
    expected: true,
  });
});
