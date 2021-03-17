import 'styles/fonts.css';
import 'tailwindcss/tailwind.css';

import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import App from 'next/app.js';
import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import { useStore } from 'redux/store.js';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import theme from 'styles/theme.js';
import ThemeProvider from 'styles/theme-provider.js';

import { appWithTranslation } from '../../i18n.js';

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);
  const persistor = persistStore(store, {}, function () {
    persistor.persist();
  });

  return (
    <Fragment>
      <Provider store={store}>
        <PayPalScriptProvider
          options={{
            currency: 'EUR',
            'client-id':
              'ActQYniH1tEAuiu3-lJYKMzzG7pY7BMZ8dya1CnYxg_iQN5UT2nTHzFgHAh1NPWnGQtH75aCMM3KOpd8',
          }}
        >
          <PersistGate persistor={persistor}>
            <ThemeProvider theme={theme}>
              <Component {...pageProps} />
            </ThemeProvider>
          </PersistGate>
        </PayPalScriptProvider>
      </Provider>
    </Fragment>
  );
}

MyApp.getInitialProps = async appContext => ({
  ...(await App.getInitialProps(appContext)),
});

export default appWithTranslation(MyApp);
