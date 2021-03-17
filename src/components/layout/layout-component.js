import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import { HeaderContainer } from '../header/header-container.js';

const LayoutComponent = ({ children }) => (
  <Fragment>
    <HeaderContainer />
    {children}

    <style jsx global>{`
      html,
      body,
      #__next {
        height: 100%;
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
