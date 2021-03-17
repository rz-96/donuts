import { configureStore } from '@reduxjs/toolkit';
import { render as renderReactTestingLibrary } from '@testing-library/react';
import { RouterContext } from 'next/dist/next-server/lib/router-context';
import { has } from 'ramda';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { rootReducer, rootState } from 'redux/root-reducer.js';
import renderRITEway from 'riteway/render-component.js';
import { ThemeProvider } from 'styled-components';
import theme from 'styles/theme.js';

import { i18n } from './i18n.js';

const makeAllProviders = ({ state = rootState } = {}) => ({ children }) => (
  <I18nextProvider i18n={i18n}>
    <Provider
      store={configureStore({ reducer: rootReducer, preloadedState: state })}
    >
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </Provider>
  </I18nextProvider>
);

const renderRW = Component => {
  const AllTheProviders = makeAllProviders();
  return renderRITEway(<AllTheProviders>{Component}</AllTheProviders>);
};

const makeWrapperWithRouter = ({ router, state }) => ({ children }) => {
  const AllTheProviders = makeAllProviders(state);
  return (
    <RouterContext.Provider value={router}>
      <AllTheProviders>{children}</AllTheProviders>
    </RouterContext.Provider>
  );
};

const renderRTL = (ui, options) =>
  has('router', options)
    ? renderReactTestingLibrary(ui, {
        wrapper: makeWrapperWithRouter(options),
        ...options,
      })
    : renderReactTestingLibrary(ui, {
        wrapper: makeAllProviders(options),
        ...options,
      });

export { renderRTL, renderRW };
