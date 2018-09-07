'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Props', [
      {
        id: 1,
        name: 'Size',
        CategoryId: 1
      },
      {
        id: 2,
        name: 'Color',
        CategoryId: 1
      },
  ],{});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Props', null, {});
  }
};
