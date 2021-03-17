import { rem } from 'polished';
import styled from 'styled-components';

const Input = styled.input`
  background: #ffffff;
  /* gray-300 */
  width: 100%;
  border: 1px solid #e4e6eb;
  box-sizing: border-box;
  border-radius: 4px;
  height: ${rem(56)};
`;

export default Input;
