import React from 'react';
import { Router, Switch, Route } from 'react-router';
import { createBrowserHistory } from 'history';

import { NonAuthRoutes, WithAuthRoutes } from 'utils/Routes';
import { Home, SigninPage, Profile, Unauthorized, DashboardPage, SignupPage } from 'pages/Pages';
import AuthRoute from 'components/AuthRoute';
import { StoreProvider } from 'contextStore/StoreProvider';
import { UserRoles } from 'interfaces/UserRoles';
import NavigationBar from 'components/NavigationBar';
import './App.css';

export const history = createBrowserHistory();

const App: React.FC = () => {
  return (
    <StoreProvider>
      <Router history={history}>
        <div className="bg-light-green gray ">
          <NavigationBar />
          <div className="flex flex-column items-center-ns">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path={'/' + NonAuthRoutes.SIGNIN} component={SigninPage} />
              <Route path={'/' + NonAuthRoutes.SIGNUP} component={SignupPage} />
              <AuthRoute
                path={'/' + WithAuthRoutes.PROFILE}
                Component={Profile}
                requiredRoles={[UserRoles.ADMIN, UserRoles.USER]}
              />
              <AuthRoute
                path={'/' + WithAuthRoutes.DASHBOARD}
                Component={DashboardPage}
                requiredRoles={[UserRoles.ADMIN]}
              />
              <Route path={'/' + NonAuthRoutes.UNAUTHORIZED} component={Unauthorized} />
            </Switch>
          </div>
        </div>
      </Router>
    </StoreProvider>
  );
};

export default App;
