export interface UserAttributes {
  id: number;
  email: string;
  password: string;
  role: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly profile?: UserProfileAttributes;
  validatePassword: (password: string) => boolean;
}

export interface UserProfileAttributes {
  UserId: number;
  address: string;
  login: string;
  createdAt: Date;
  updatedAt: Date;
}
