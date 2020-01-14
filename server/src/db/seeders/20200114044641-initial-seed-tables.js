/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkInsert('users', [
      {
        id: 1,
        email: 'user1@google.com',
        password: bcrypt.hashSync('password', bcrypt.genSaltSync(10)),
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        email: 'user2@google.com',
        password: bcrypt.hashSync('password', bcrypt.genSaltSync(10)),
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        email: 'user3@google.com',
        password: bcrypt.hashSync('password', bcrypt.genSaltSync(10)),
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert('user_profiles', [
      {
        userId: 1,
        address: 'user1 address',
        login: 'user1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        address: 'user2 address',
        login: 'user2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 3,
        address: 'user3 address',
        login: 'user3',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: async queryInterface => {
    await queryInterface.bulkDelete({ tableName: 'user_profiles' }, null, {});
  },
};
