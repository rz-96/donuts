import React from 'react';
const transformProps = transform => Component => props => (
  <Component {...transform(props)} />
);
export default transformProps;
