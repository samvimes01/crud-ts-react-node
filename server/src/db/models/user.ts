import { Sequelize, Model, DataTypes, Association, HasOneCreateAssociationMixin } from 'sequelize';
import bcrypt from 'bcrypt';

import { UserProfile } from './user_profile';
import { UserAttributes } from '../../interfaces/User';
import { UserRoles } from '../../interfaces/UserRoles';

export class User extends Model<UserAttributes> {
  public id!: number;
  public email!: string;
  public password!: string;
  public role!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public createUserProfile!: HasOneCreateAssociationMixin<UserProfile>;
  public readonly UserProfile?: UserProfile;

  public static associations: {
    UserProfile: Association<User, UserProfile>;
  };

  public validatePassword(password: string): boolean {
    return bcrypt.compareSync(password, this.password);
  }
}

export function initUser(sequelize: Sequelize): void {
  User.init(
    {
      id: {
        type: new DataTypes.INTEGER().UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },
      password: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },
      role: {
        type: new DataTypes.STRING(128),
        allowNull: false,
        defaultValue: UserRoles.USER,
      },
    },
    {
      tableName: 'users',
      sequelize: sequelize,
    },
  );
}

export function associateUser(): void {
  User.hasOne(UserProfile, { sourceKey: 'id' });
}
