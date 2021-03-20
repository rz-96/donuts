import { useState } from 'react';

import { SelectComponent } from './select-component';

function Select({ values, ...rest }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SelectComponent
      isOpen={isOpen}
      values={values}
      onBlurSelect={() => setIsOpen(false)}
      onClickSelect={() => setIsOpen(open => !open)}
      {...rest}
    />
  );
}

export { Select };
