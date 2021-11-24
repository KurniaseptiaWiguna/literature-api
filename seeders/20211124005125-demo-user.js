'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users',[{
      email: 'admin@mail.com',
      password:'$2a$12$w.JxBOnSCDPMopVpDAKrHOqkTmLkJLwT2WHreswhD4.IB/8XsGYnK', //12345678
      fullname:'admin',
      gender:'male',
      phone:'',
      address:'',
      photo:'default-profile.png',
      status:'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
