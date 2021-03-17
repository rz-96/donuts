import { rem } from 'polished';
import styled from 'styled-components';

import Input from '../textinput/text-input-component';

const ErrorMessage = styled.div`
  color: #cc0033;
  display: inline-block;
  font-size: rem(15);
  line-height: 15px;
`;

const FormInput = styled(Input)`
  margin-top: ${rem(2)};
`;

const Wrapper = styled.div`
  margin-top: ${rem(10)};
  width: 100%;
`;
export { ErrorMessage, FormInput, Wrapper };
