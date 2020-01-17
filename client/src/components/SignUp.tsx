import React, { FC, useState, ChangeEvent, useContext, FormEvent } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { signUp } from 'services/auth.service';
import { ProviderStore, StoreContext } from 'contextStore/StoreProvider';
import { NonAuthRoutes } from 'utils/Routes';

const SignUp: FC = (): JSX.Element => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errorMsg, setErrorMsg] = useState<string>('');
  const { email, password } = formData;
  const { authState } = useContext<ProviderStore>(StoreContext);
  const [isAuthenticated, setIsAuthenticated] = authState;

  const onChange = (event: ChangeEvent<HTMLInputElement>): void =>
    setFormData({ ...formData, [event.target.name]: event.target.value });

  const onSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    signUp(email, password)
      .then(() => setIsAuthenticated(true))
      .catch((errorMsg: string) => setErrorMsg(errorMsg));
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create new Account
      </p>
      <form
        className="form"
        onSubmit={(event: FormEvent<HTMLFormElement>): void => {
          onSubmit(event);
        }}
      >
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(event: ChangeEvent<HTMLInputElement>): void => onChange(event)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(event: ChangeEvent<HTMLInputElement>): void => onChange(event)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Sign up" />
        {errorMsg && <div>{errorMsg}</div>}
      </form>
      <p>
        Already have an account? <Link to={NonAuthRoutes.SIGNIN}>Sign In</Link>
      </p>
    </>
  );
};

export default SignUp;
