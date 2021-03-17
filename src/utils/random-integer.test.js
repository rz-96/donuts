import { describe } from 'riteway';

import randomInteger from './random-integer.js';

describe('random integer', async assert => {
  const start = -5;
  const end = 20;
  const numbers = Array.from({ length: 1000 }, () => randomInteger(start, end));

  assert({
    given: 'a negative start number and a positive end number',
    should: 'generate random numbers greater than or equal to start',
    actual: numbers.every(n => n >= start),
    expected: true,
  });

  assert({
    given: 'a negative start number and a positive end number',
    should: 'generate random numbers less than or equal to end',
    actual: numbers.every(n => n <= end),
    expected: true,
  });

  assert({
    given: 'a negative start number and a positive end number',
    should: 'should generate some negative numbers',
    actual: numbers.some(n => n <= 0),
    expected: true,
  });

  assert({
    given: 'a negative start number and a positive end number',
    should: 'generate random integers',
    actual: numbers.every(Number.isInteger),
    expected: true,
  });
});
