export interface UserAttributes {
  id: number;
  role: string;
}

export interface UserProfileAttributes {
  UserId: number;
  address: string;
  login: string;
  createdAt: Date;
  updatedAt: Date;
}
