import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Login from './pages/Login';

const Routes = () => {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Login} />
    </BrowserRouter>
  );
};

export default Routes;
