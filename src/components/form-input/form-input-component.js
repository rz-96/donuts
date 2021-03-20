import React from 'react';

import { Label } from '../label/label-component-styles';
import {
  ErrorMessage,
  FormInput,
  Wrapper,
} from './form-input-component-styles';

function FormInputComponent({ label, errorMessage, ...props }) {
  return (
    <Wrapper>
      <Label>
        {label}
        <FormInput className="dark:bg-black" {...props} />
      </Label>
      {errorMessage && (
        <ErrorMessage data-test="error-message">{errorMessage}</ErrorMessage>
      )}
    </Wrapper>
  );
}

export { FormInputComponent };
