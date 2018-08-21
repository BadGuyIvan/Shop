'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products',[
      {
        id: 1,
        name: 'Nike EXP-X14',
        price: 120,
        dscription: `Drawing inspiration from Nike running shoes such as the Nike Zoom Vaporfly Elite, the Nike EXP-X14 Men's Shoe races off the track and onto the street with a fast design and shape. Nike React technology delivers lightweight durability and a smooth feel, while the layered upper showcases Flywire cables and bold branding.`,
        available: true,
        CategoryId: 1
      },{
        id: 2,
        name: 'Nike EXP-X14 SE',
        price: 130,
        dscription: `Drawing inspiration from Nike running shoes such as the Nike Zoom Vaporfly Elite, the Nike EXP-X14 SE Men's Shoe races off the track and onto the street with a fast design and shape. Nike React technology delivers lightweight durability and a smooth feel, while the layered upper showcases Flywire cables and a bold “Just Do It” tagline.`,
        available: true,
        CategoryId: 1
      },{
        id: 3,
        name: 'Nike Air Max 270',
        price: 150,
        dscription: `The Nike Air Max 270 Men's Shoe is inspired by two icons of big Air: the Air Max 180 and Air Max 93. It features Nike’s biggest heel Air unit yet for a super-soft ride that feels as impossible as it looks.`,
        available: true,
        CategoryId: 1
      },{
        id: 4,
        name: 'Nike Air Force 1 \'07',
        price: 90,
        dscription: `The legend lives on in the Nike Air Force 1 '07 Men's Shoe, a modern take on the icon that blends classic style and fresh, crisp details.`,
        available: true,
        CategoryId: 1
      },{
        id: 5,
        name: 'Nike Air VaporMax Flyknit 2',
        price: 190,
        dscription: `With the latest Max Air innovation underfoot, the Nike Air VaporMax Flyknit 2 Men's Running Shoe brings fresh design elements. More support around the heel pairs with the foot-hugging feel of Flyknit. The futuristic sole completes the package, for a shoe that's as ready for your quick run as it is for an elevated look.`,
        available: true,
        CategoryId: 1
      },{
        id: 6,
        name: 'Nike Air Max Deluxe',
        price: 180,
        dscription: `The Nike Air Max Deluxe Men's Shoe features lightweight Max Air cushioning for all-day comfort while a combination construction provides comfortable support.`,
        available: true,
        CategoryId: 1
      },{
        id: 7,
        name: 'Nike Air VaporMax Plus',
        price: 190,
        dscription: `With a reinvented cushioning system, the Nike Air VaporMax Plus Men's Shoe delivers a lightweight, bouncy ride for a gravity-defying sensation underfoot, while the throwback molded upper gives you a snug, comfortable fit.`,
        available: true,
        CategoryId: 1
      },{
        id: 8,
        name: 'Nike Air Span II SE',
        price: 110,
        dscription: `After a span of nearly three decades, the Nike Air Span II SE Men's Shoe returns with everything you loved about the original. Its shape is nearly indistinguishable from that of the early-'90s shoe, as are its iconic lines and branding. This SE version utilizes new materials in the upper to provide an exceptional fit and feel to take your sneaker game to the next level.`,
        available: true,
        CategoryId: 1
      },{
        id: 9,
        name: 'Nike Air Max 97 JDI',
        price: 170,
        dscription: `The Nike Air Max 97 shook up the running world with its revolutionary full-length Nike Air unit. The Nike Air Max 97 JDI Men's Shoe remasters the original design with a synthetic and textile construction for a lighter feel and a sleeker look.`,
        available: true,
        CategoryId: 1
      },{
        id: 10,
        name: 'Nike Air Max 95 SE',
        price: 170,
        dscription: `The Nike Air Max 95 made its mark as the first shoe to include visible Nike Air cushioning in the forefoot. The Nike Air Max 95 SE Men's Shoe energizes the iconic design with updated materials in a variety of textures and accents.`,
        available: true,
        CategoryId: 1
      },{
        id: 11,
        name: 'Jordan College Limited (Michigan)',
        price: 135,
        dscription: `The Jordan College Limited (Michigan) Men's Football Jersey delivers unparalleled fit and style at the stadium or on the street. Sweat-wicking fabric helps you stay dry and comfortable. Premium details are authentic to game-day jerseys.`,
        available: true,
        CategoryId: 2
      }
    ],{})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {});
  }
};
