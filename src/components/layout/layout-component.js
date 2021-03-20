import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import { HeaderContainer } from '../header/header-container.js';

const LayoutComponent = ({ children }) => (
  <Fragment>
    <HeaderContainer />
    {children}

    <style jsx global>{`
      @tailwind base;

      html,
      body,
      #__next {
        height: 100%;
        @apply bg-gray-50 dark:bg-gray-900;
        //TODO: CHANGE BACK WHEN CHANGING TO DARK MODE;
      }
      body {
        margin: 0;
      }
    `}</style>
  </Fragment>
);

LayoutComponent.propTypes = {
  children: PropTypes.node,
};

export { LayoutComponent };
