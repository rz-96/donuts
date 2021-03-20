import { rem } from 'polished';
import styled from 'styled-components';

const Label = styled.label`
  display: flex;
  flex-direction: column;
  font-weight: 500;
  font-size: ${rem(12)};
  line-height: ${rem(16)};
  margin: ${rem(2)};
`;

export { Label };
