import { describe } from 'riteway';

import fn from './fn.js';

describe('fn - the mock function', async assert => {
  const mockedFn = fn((a, b) => a + b);

  assert({
    given: 'calling a mocked function',
    should: 'should return the correct result',
    actual: mockedFn(21, 21),
    expected: 42,
  });

  assert({
    given: "a mocked function's calls",
    should: 'return the correct args',
    actual: mockedFn.calls,
    expected: [[21, 21]],
  });
});

describe('fn.hasBeenCalled()', async assert => {
  {
    const mockedFn = fn();

    assert({
      given: 'a mocked function that has NOT been called',
      should: 'return false',
      actual: mockedFn.hasBeenCalled(),
      expected: false,
    });
  }

  {
    const mockedFn = fn();
    mockedFn();

    assert({
      given: 'a mocked function that has been called',
      should: 'return true',
      actual: mockedFn.hasBeenCalled(),
      expected: true,
    });
  }
});

describe('fn.hasBeenCalledWith()', async assert => {
  {
    const mockedFn = fn();

    assert({
      given: 'a mocked function that has NOT been called with the argument',
      should: 'return false',
      actual: mockedFn.hasBeenCalledWith('foo'),
      expected: false,
    });
  }

  {
    const mockedFn = fn();

    assert({
      given:
        'a mocked function that has NOT been called with multiple arguments',
      should: 'return false',
      actual: mockedFn.hasBeenCalledWith('foo', 'bar'),
      expected: false,
    });
  }

  {
    const mockedFn = fn();
    mockedFn('lel', 'lol');
    mockedFn('lol', 'bar');
    mockedFn('foo', 'lol');
    mockedFn(42);

    assert({
      given:
        'a mocked function that has NOT been called with multiple arguments',
      should: 'return false',
      actual: mockedFn.hasBeenCalledWith('foo', 'bar'),
      expected: false,
    });
  }

  {
    const mockedFn = fn();
    mockedFn('lel');
    mockedFn(9001);
    mockedFn('foo');

    assert({
      given: 'a mocked function that has been called with the argument',
      should: 'return true',
      actual: mockedFn.hasBeenCalledWith('foo'),
      expected: true,
    });
  }

  {
    const mockedFn = fn();
    mockedFn('lel', 'lol');
    mockedFn('foo', 'bar');
    mockedFn(42);

    assert({
      given: 'a mocked function that has been called with multiple arguments',
      should: 'return true',
      actual: mockedFn.hasBeenCalledWith('foo', 'bar'),
      expected: true,
    });
  }

  {
    const mockedFn = fn();
    mockedFn('lel', 'lol');
    mockedFn('foo', 'bar');
    mockedFn(42);
    mockedFn('foo', 'bar');

    assert({
      given:
        'a mocked function that has been called with multiple arguments multiple times',
      should: 'return true',
      actual: mockedFn.hasBeenCalledWith('foo', 'bar'),
      expected: true,
    });
  }
});
