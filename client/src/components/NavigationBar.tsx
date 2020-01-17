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
      <Link to={WithAuthRoutes.PROFILE} className="link dim white dib mr3">
        {WithAuthRoutes.PROFILE}
      </Link>
      <Link to={WithAuthRoutes.DASHBOARD} className="link dim white dib mr3">
        {WithAuthRoutes.DASHBOARD}
      </Link>
      <a className="f6 link dim br3 ph3 pv2 mb2 dib white bg-dark-green" onClick={logOut}>
        Sign Out
      </a>
    </>
  ) : (
    <>
      <Link to={NonAuthRoutes.SIGNIN} className="link dim white dib mr3">
        {NonAuthRoutes.SIGNIN}
      </Link>
      <Link to={NonAuthRoutes.SIGNUP} className="link dim white dib mr3">
        {NonAuthRoutes.SIGNUP}
      </Link>
    </>
  );

  // return <nav className="bg-green h3 flex justify-end">{links}</nav>;
  return (
    <header className="bg-black-90 w-100 ph3 pv3 pv4-ns ph4-m ph5-l">
      <nav className="f6 fw6 ttu tracked">
        <Link to="/" className="link dim white dib mr3">
          Home
        </Link>
        {links}
      </nav>
    </header>
  );
};

export default NavigationBar;
