const { assoc } = require('ramda');

const createHandleSetKey = key => (state, { payload }) =>
  assoc(key, payload, state);

export { createHandleSetKey };
