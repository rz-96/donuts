import { trim } from 'ramda';
import { describe } from 'riteway';

/* istanbul ignore next */
const after = (scope = '', TestFunction) =>
  describe(trim(`after ${scope}`), TestFunction);

export default after;
