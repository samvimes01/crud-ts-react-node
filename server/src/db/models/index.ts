import Sequelize from 'sequelize';

import sequelize from '../sequelize';
import { initUser, associateUser } from './user';
import { initUserProfile, associateUserProfile } from './user_profile';

initUser(sequelize);
initUserProfile(sequelize);

associateUser();
associateUserProfile();

const db = {
  sequelize,
  Sequelize,
  User: sequelize.models.User,
  UserProfile: sequelize.models.UserProfile,
};

export default db;
