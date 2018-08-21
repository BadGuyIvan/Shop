'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Images',[
      {
        id: 1,
        url: 'https://c.static-nike.com/a/images/t_PDP_864_v1/f_auto/qqgk8agefclz2mgpogrs/exp-x14-mens-shoe-78RMfJ.jpg',
        ProductId: 1,
        is_main: true
      },{
        id: 2,
        url: 'https://c.static-nike.com/a/images/t_PDP_864_v1/f_auto/wwugnmnq4esesva0unea/exp-x14-se-mens-shoe-Bghdk6.jpg',
        ProductId: 2,
        is_main: true
      },{
        id: 3,
        url: 'https://c.static-nike.com/a/images/t_PDP_1280_v1/f_auto/hkcia7o5nc63auwkeqsw/air-max-270-mens-shoe-DNTBjl4e.jpg',
        ProductId: 3,
        is_main: true
      },{
        id: 4,
        url: 'https://c.static-nike.com/a/images/t_PDP_864_v1/f_auto/gsuin11ptg5qgktmzoat/air-force-1-07-mens-shoe-JkTGzADv.jpg',
        ProductId: 4,
        is_main: true
      },{
        id: 5,
        url: 'https://c.static-nike.com/a/images/t_PDP_864_v1/f_auto/uj88gqmaxhhipyyfpaly/air-vapormax-flyknit-2-mens-running-shoe-zcHs9Q.jpg',
        ProductId: 5,
        is_main: true
      },{
        id: 6,
        url: 'https://c.static-nike.com/a/images/t_PDP_864_v1/f_auto/lx2nogmnccexeomuaeyh/air-max-deluxe-mens-shoe-cFmStH.jpg',
        ProductId: 6,
        is_main: true
      },{
        id: 7,
        url: 'https://c.static-nike.com/a/images/t_PDP_1280_v1/f_auto/yommy4ijgwgrzbebxtvm/air-vapormax-plus-mens-shoe-Lw8Dng.jpg',
        ProductId: 7,
        is_main: true
      },{
        id: 8,
        url: 'https://c.static-nike.com/a/images/t_PDP_1280_v1/f_auto/dvsrzciwpmii8da8wi7q/air-span-ii-se-mens-shoe-zSsh8s.jpg',
        ProductId: 8,
        is_main: true
      },{
        id: 9,
        url: 'https://c.static-nike.com/a/images/t_PDP_864_v1/f_auto/tsqh0krq4jr2fnfjcqee/air-max-97-jdi-mens-shoe-drgPpJ.jpg',
        ProductId: 9,
        is_main: true
      },{
        id: 10,
        url: 'https://c.static-nike.com/a/images/t_PDP_864_v1/f_auto/ndqmzajmrihae7npdvkc/air-max-95-se-mens-shoe-cTJMsb.jpg',
        ProductId: 10,
        is_main: true
      },{
        id: 11,
        url: 'https://c.static-nike.com/a/images/t_PDP_1728_v1/f_auto/w1mvleqpsvjj9buosvjl/jordanlimited-michigan-mens-football-jersey-8WAnjn.jpg',
        ProductId: 11,
        is_main: true
      },
    ],{})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Images', null, {});
  }
};
