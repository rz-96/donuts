import { compose } from 'ramda';

import { withLayout } from './with-layout.js';

const page = compose(withLayout);

export { page };
