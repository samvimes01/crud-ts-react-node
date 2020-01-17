import React, { FC, useState, ChangeEvent, useContext, FormEvent } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { signIn } from 'services/auth.service';
import { ProviderStore, StoreContext } from 'contextStore/StoreProvider';
import { NonAuthRoutes } from 'utils/Routes';

const SignIn: FC = (): JSX.Element => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;
  const { authState } = useContext<ProviderStore>(StoreContext);
  const [isAuthenticated, setIsAuthenticated] = authState;

  const onChange = (event: ChangeEvent<HTMLInputElement>): void =>
    setFormData({ ...formData, [event.target.name]: event.target.value });

  const onSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    signIn(email, password).then(() => setIsAuthenticated(true));
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Sign in to your Account
      </p>
      <form
        className="pa4 black-80"
        onSubmit={(event: FormEvent<HTMLFormElement>): void => onSubmit(event)}
      >
        <div className="measure">
          <label htmlFor="name" className="f6 b db mb2">Email Address</label>
          <input
            type="email"
            className="input-reset ba b--black-20 pa2 mb2 db w-100"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(event: ChangeEvent<HTMLInputElement>): void => onChange(event)}
          />
        </div>
        <div className="measure">
          <label htmlFor="name" className="f6 b db mb2">Password</label>
          <input
            type="password"
            className="input-reset ba b--black-20 pa2 mb2 db w-100"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(event: ChangeEvent<HTMLInputElement>): void => onChange(event)}
          />
        </div>
        <input type="submit" className="f6 link dim ba bw0 br3 ph3 pv2 mv2 dib white bg-dark-green" value="Sign in" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to={NonAuthRoutes.SIGNUP}>Sign Up</Link>
      </p>
    </>
  );
};

export default SignIn;
