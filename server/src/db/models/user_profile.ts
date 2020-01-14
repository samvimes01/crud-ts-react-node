import { Sequelize, Model, DataTypes, HasOneGetAssociationMixin, Association } from 'sequelize';

import { User } from './user';

export class UserProfile extends Model {
  public userId!: number;
  public address!: string;
  public login!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getUser!: HasOneGetAssociationMixin<User>;

  public readonly User?: User;

  public static associations: {
    User: Association<UserProfile, User>;
  };
}

export function initUserProfile(sequelize: Sequelize): void {
  UserProfile.init(
    {
      userId: {
        type: new DataTypes.INTEGER().UNSIGNED,
        primaryKey: true,
        unique: true,
      },
      address: {
        type: new DataTypes.STRING(128),
        allowNull: true,
      },
      login: {
        type: new DataTypes.STRING(128),
        allowNull: true,
      },
    },
    {
      tableName: 'user_profiles',
      sequelize: sequelize,
    },
  );
}

export function associateUserProfile(): void {
  UserProfile.belongsTo(User, { targetKey: 'id' });
}
