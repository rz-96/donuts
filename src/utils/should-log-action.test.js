import { describe } from 'riteway';

import shouldLogAction from './should-log-action.js';

describe('shouldLogAction()', async assert => {
  {
    const ignoredActions = ['foo', 'bar', 'baz'];
    const type = 'qux';

    assert({
      given:
        'an array of ignored actions and a type that is NOT included in it',
      should: 'return true',
      actual: shouldLogAction(ignoredActions)(type),
      expected: true,
    });
  }

  {
    const ignoredActions = ['foo', 'bar', 'baz'];
    const type = 'bar';

    assert({
      given: 'an array of ignored actions and a type that is included in it',
      should: 'return false',
      actual: shouldLogAction(ignoredActions, type),
      expected: false,
    });
  }
});
