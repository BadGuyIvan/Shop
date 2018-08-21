'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Categories', [
      {
        id: 1,
        name: 'Shoes'
      },{
        id: 2,
        name: 'T-Shirts'
      },{
        id: 3,
        name: 'Jackets'
      },{
        id: 4,
        name: 'Shorts'
      },{
        id: 5,
        name: 'Socks'
      }
  ],{});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Categories', null, {});
  }
};
