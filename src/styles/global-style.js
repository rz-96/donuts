import { createGlobalStyle, css } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body,
  #__next {
  }
  body {
    margin: 0;
  }

  #__next {
    display: flex;
    flex-direction: column;
  }

  html,
  body {
    font-family: 'sans-serif';
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
    ${({ hideOutline }) =>
      hideOutline &&
      css`
        outline: none;
      `}
  }
`;

export default GlobalStyle;
