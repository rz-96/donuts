import { LayoutComponent } from 'components/layout/layout-component.js';
import React from 'react';

const withLayout = WrappedComponent => props => (
  <LayoutComponent>
    <WrappedComponent {...props} />
  </LayoutComponent>
);

export { withLayout };
