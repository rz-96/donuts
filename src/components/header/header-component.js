import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

const HeaderComponent = () => (
  <Fragment>
    <div
      className="dark:bg-black"
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        height: '200px',
        alignItems: 'center',
      }}
    >
      <div style={{ width: '100%' }} className="border-2 border-red-600" />
      <img className="sm:w-1/2 w-1/2" src="/logo.png" alt="donut company" />
      <div style={{ width: '100%' }} className="border-2 border-red-600" />
    </div>
  </Fragment>
);

HeaderComponent.propTypes = {
  t: PropTypes.func,
};

export { HeaderComponent };
