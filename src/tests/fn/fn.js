import { includes } from 'ramda';

function fn(implementation = () => {}) {
  const mockFn = (...args) => {
    mockFn.calls.push(args);
    return implementation(...args);
  };
  mockFn.calls = [];

  mockFn.hasBeenCalled = () => mockFn.calls.length > 0;
  mockFn.hasBeenCalledWith = (...args) => includes(args, mockFn.calls);

  return mockFn;
}

export default fn;
