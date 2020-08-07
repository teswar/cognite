import React, { Fragment } from 'react';
import { Route, Link } from 'react-router-dom';
import logo from '../assets/logo.svg';
import './app.css';
import { withAuthentication } from '../core/hocs';
import { SignIn, SignUp, Header } from '../core/components';
import { UnAuthorized, Authorized } from '../core/pages';

// import { Link } from 'react-router-dom';


function UnAuthorizeRoutes() {
  return (
    <Fragment>
      <Route path='/' component={UnAuthorized} exact />
      <Route path='/signin' component={SignIn} exact />
      <Route path='/signup' component={SignUp} exact />
    </Fragment>
  );
}

function AuthorizeRoutes() {
  return (
    <Fragment>
      <Route path='/' component={Authorized} />
    </Fragment>
  );
}



export function AppComponent({ currentUser }) {
  console.log(currentUser);
  return (
    <div className="App">
      <header className="App-header">
        <div style={{ height: '40px' }}>
          <Link to="/" >
            <img src={logo} className="App-logo" alt="logo" style={{ position: 'relative', display: 'block', height: '100%' }} />
          </Link>
        </div>
      </header>

      <hr />

      <Header />

      <div>
        {(!currentUser) ? <UnAuthorizeRoutes /> : <AuthorizeRoutes />}
      </div>
    </div>
  );
}

export const App = withAuthentication(AppComponent);
