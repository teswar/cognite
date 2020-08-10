import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import { SignIn, SignUp } from '../core/components';
import { UnAuthorized, Authorized } from '../core/pages';


export function UnAuthorizedRoutes() {
  return (
    <Fragment>
      <Route path='/' component={UnAuthorized} exact />
      <Route path='/signin' component={SignIn} exact />
      <Route path='/signup' component={SignUp} exact />
    </Fragment>
  );
}

export function AuthorizedRoutes() {
  return (
    <Fragment>
      <Route path='/' component={Authorized} />
    </Fragment>
  );
}

