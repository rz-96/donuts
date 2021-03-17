import { ThemeProvider as MaterialUiThemeProvider } from '@material-ui/styles';
import useToggleOutline from 'hooks/use-toggle-outline.js';
import React from 'react';
import { ThemeProvider as SCThemeProvider } from 'styled-components';

import GlobalStyle from './global-style.js';
import { muiTheme } from './theme';

function ThemeProvider({ children, ...props }) {
  const hideOutline = useToggleOutline();

  return (
    <MaterialUiThemeProvider theme={muiTheme}>
      <SCThemeProvider {...props}>
        <GlobalStyle hideOutline={hideOutline} />
        {children}
      </SCThemeProvider>
    </MaterialUiThemeProvider>
  );
}

export default ThemeProvider;
