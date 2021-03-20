import { rem } from 'polished';
import styled from 'styled-components';

export const Subtitle = styled.h2``;

export const Header = styled.div`
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Main = styled.div`
  height: 100%;
  display: flex;
  flex-wrap: wrap;
`;

export const Right = styled.div`
  box-shadow: -5px 0 5px -5px #848484;
  flex-grow: 1;
  padding: ${rem(10)};
`;

export const Left = styled.div`
  margin: ${rem(30)};
  margin-top: ${rem(20)};
  flex-grow: 3;
`;

export const Category = styled.p`
  margin: ${rem(3)};
  font-family: sans-serif;
  font-size: 1.5rem;
  font-weight: 'bold';
  line-height: 220%;
`;

export const Product = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: ${rem(3)};
  font: inherit;
  cursor: pointer;
  outline: inherit;
  width: 100%;
  display: flex;
  justify-content: space-between;
  /* &:hover {
    background: #f3f3f3;
  } */
`;

export const ProductTitle = styled.p`
  font-size: 1.1rem;
  font-weight: 200;
  margin: 0;
`;

export const Description = styled.p`
  color: #848484;
  margin: ${rem(1)};
  font-size: 0.9rem;

  text-align: left;
`;

export const ProductContainer = styled.div`
  display: flex;
  text-align: left;
  flex-direction: column;
  margin-top: ${rem(2)};
`;

export const Divider = styled.div`
  margin-top: ${rem(12)};
  margin-bottom: ${rem(2)};
  width: 100%;
  border-top: 1px solid #282828;
`;
export const Price = styled.p`
  margin-top: ${rem(0)};
`;
