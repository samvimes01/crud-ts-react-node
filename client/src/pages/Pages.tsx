import React, { FC } from 'react';
import SignIn from 'components/SignIn';
import Dashboard from 'components/Dashboard';
import SignUp from 'components/SignUp';

export const Home: FC = () => <h1>Home Page</h1>;
export const SigninPage: FC = () => <SignIn />;
export const SignupPage: FC = () => <SignUp />;
export const DashboardPage: FC = () => <Dashboard />;
export const Profile: FC = () => <h1>Profile no t implemented yet</h1>;
export const Unauthorized: FC = () => <h1>Unauthorized</h1>;
