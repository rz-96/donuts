import { trim } from 'ramda';
import { describe } from 'riteway';

/* istanbul ignore next */
const before = (scope = '', TestFunction) =>
  describe(trim(`before ${scope}`), TestFunction);

export default before;
