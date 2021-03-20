import useToggleOutline from 'hooks/use-toggle-outline.js';
import React from 'react';
import { ThemeProvider as SCThemeProvider } from 'styled-components';

import GlobalStyle from './global-style.js';

function ThemeProvider({ children, ...props }) {
  const hideOutline = useToggleOutline();

  return (
    <SCThemeProvider {...props}>
      <GlobalStyle hideOutline={hideOutline} />
      {children}
    </SCThemeProvider>
  );
}

export default ThemeProvider;
