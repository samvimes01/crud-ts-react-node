import React, { FC, useContext } from 'react';
import { Link } from 'react-router-dom';
import { history } from '../App';

import { NonAuthRoutes, WithAuthRoutes } from 'utils/Routes';
import { signOut } from 'services/auth.service';
import { ProviderStore, StoreContext } from 'contextStore/StoreProvider';

const NavigationBar: FC = (): JSX.Element => {
  const { authState } = useContext<ProviderStore>(StoreContext);
  const [isAuthenticated, setIsAuthenticated] = authState;

  const logOut = () => {
    signOut().then(() => {
      history.push('/', {});
      setIsAuthenticated(false);
    });
  };

  const links = isAuthenticated ? (
    <>
      <Link to={WithAuthRoutes.PROFILE}>{WithAuthRoutes.PROFILE}</Link>
      <Link to={WithAuthRoutes.DASHBOARD}>{WithAuthRoutes.DASHBOARD}</Link>
      <button onClick={logOut}>Sign Out</button>
    </>
  ) : (
    <>
      <Link to={NonAuthRoutes.SIGNIN}>{NonAuthRoutes.SIGNIN}</Link>
      <Link to={NonAuthRoutes.SIGNUP}>{NonAuthRoutes.SIGNUP}</Link>
    </>
  );

  return (
    <nav>
      <Link to="/">Home</Link>
      {links}
    </nav>
  );
};

export default NavigationBar;
