import React, { FC, useContext } from 'react';
import { RouteComponentProps, Route, Redirect } from 'react-router-dom';
import { NonAuthRoutes } from 'utils/Routes';
import { ProviderStore, StoreContext } from 'contextStore/StoreProvider';
import { UserRoles } from 'interfaces/UserRoles';

interface Props {
  Component: FC<RouteComponentProps>;
  requiredRoles: UserRoles[];
  path: string;
  exact?: boolean;
}

const AuthRoute: FC<Props> = ({ Component, requiredRoles, path, exact = false }: Props): JSX.Element => {
  const { role, authState } = useContext<ProviderStore>(StoreContext);
  const [isAuthenticated] = authState;
  const userHasRequiredRole = requiredRoles.includes(role);
  const message = 'Please sign in to view this page';
  return (
    <Route
      exact={exact}
      path={path}
      render={(props: RouteComponentProps): JSX.Element =>
        isAuthenticated && userHasRequiredRole ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: userHasRequiredRole ? NonAuthRoutes.SIGNIN : NonAuthRoutes.UNAUTHORIZED,
              state: { message, requestedPath: path },
            }}
          />
        )
      }
    />
  );
};

export default AuthRoute;
