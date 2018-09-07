'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ProductProps', [
        {
            value: '6',
            ProductId: 1,
            PropsId: 1
        }
    //   {
    //     value: '6',
    //     productId: 1,
    //     PropsId: 1
    //   },{
    //     value: '6.5',
    //     productId: 1,
    //     PropsId: 1
    //   },{
    //     value: '7',
    //     productId: 1,
    //     PropsId: 1
    //   },{
    //     value: '7.5',
    //     productId: 1,
    //     PropsId: 1
    //   },{
    //     value: '8',
    //     productId: 1,
    //     PropsId: 1
    //   },{
    //     value: '9',
    //     productId: 1,
    //     PropsId: 1
    //   },{
    //     value: '9.5',
    //     productId: 1,
    //     PropsId: 1
    //   },{
    //     value: '10',
    //     productId: 1,
    //     PropsId: 1
    //   },{
    //     value: '11',
    //     productId: 1,
    //     PropsId: 1
    //   },{
    //     value: '11.5',
    //     productId: 1,
    //     PropsId: 1
    //   },{
    //     value: '12',
    //     productId: 1,
    //     PropsId: 1
    //   },{
    //     value: '12.5',
    //     productId: 1,
    //     PropsId: 1
    //   },{
    //     value: '13',
    //     productId: 1,
    //     PropsId: 1
    //   },{
    //     value: '14',
    //     productId: 1,
    //     PropsId: 1
    //   },{
    //     value: '15',
    //     productId: 1,
    //     PropsId: 1
    //   },
  ],{});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ProductProps', null, {});
  }
};
