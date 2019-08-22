import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Login from './pages/Login';
import Dev from './pages/Dev';

const Routes = () => {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Login} />
      <Route path="/dev/:id" component={Dev} />
    </BrowserRouter>
  );
};

export default Routes;
