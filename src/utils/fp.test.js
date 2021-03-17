import { describe } from 'riteway';
import { fn } from 'tests/test-helpers.js';

import { asyncPipe, toJson } from './fp.js';

describe('asyncPipe', async assert => {
  const doubleAsync = x => Promise.resolve(x * 2);
  const incAsync = x => Promise.resolve(x + 1);

  assert({
    given: 'two asynchronous functions',
    should: 'pipe them',
    actual: await asyncPipe(incAsync, doubleAsync)(20),
    expected: 42,
  });
});

describe('toJson()', async assert => {
  {
    const response = { ok: true, json: fn() };
    toJson(response);

    assert({
      given: 'an ok response',
      should: 'call its json() method',
      actual: response.json.hasBeenCalledWith(),
      expected: true,
    });
  }

  {
    const response = { ok: false, statusText: 'failed to fetch lol' };

    assert({
      given: 'a NOT ok response',
      should: "throw with the response's status text",
      actual: await toJson(response).catch(error => error.message),
      expected: response.statusText,
    });
  }
});
