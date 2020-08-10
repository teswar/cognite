import React from 'react';
import { UnAuthorizedRoutes, AuthorizedRoutes } from './app.routes';
import { withAuthentication } from '../core/hocs';
import { Header } from '../core/components';

/**
 * TODO: move inline styles...
 */
export function AppComponent({ currentUser }) {

  return (
    <div className="h-screen flex flex-col text-center" style={{ background: 'aliceblue' }}>
      <Header className="flex flex-none items-center bg-gray-700 px-3" />

      <div className="flex-grow overflow-auto">
        {(!currentUser) ? <UnAuthorizedRoutes /> : <AuthorizedRoutes />}
      </div>
    </div>
  );
}

export const App = withAuthentication(AppComponent);
