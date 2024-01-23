/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { ImSpinner2 } from 'react-icons/im';

const Loader: React.FC = () => {
  return <ImSpinner2 className="animate-spin" data-testid="loader" />;
};

export default Loader;
