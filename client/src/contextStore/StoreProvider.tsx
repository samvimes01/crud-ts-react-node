import React, { Dispatch, SetStateAction, createContext, FC, useState } from 'react';
// eslint-disable-next-line @typescript-eslint/camelcase
import jwt_decode from 'jwt-decode';
import { UserRoles } from 'interfaces/UserRoles';

interface ProviderProps {
  children: JSX.Element | JSX.Element[];
}

export interface ProviderStore {
  role: UserRoles;
  authState: [boolean, Dispatch<SetStateAction<boolean>>];
}

export const StoreContext = createContext<ProviderStore>({} as ProviderStore);

export const StoreProvider: FC<ProviderProps> = ({ children }: ProviderProps) => {
  const token = localStorage.getItem('token');
  const isAuthenticated = !!token;
  const jwtPayload = token ? jwt_decode<{ user: { role: UserRoles } }>(token) : null;
  const role = (jwtPayload ? jwtPayload.user.role : '') as UserRoles;

  const store: ProviderStore = {
    role,
    authState: useState<boolean>(isAuthenticated),
  };

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};
