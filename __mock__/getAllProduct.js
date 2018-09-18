const products = [
    {
      id: 3,
      name: null,
      price: 0,
      discount_price: 0,
      description: null,
      available: false,
      isDeleted: true,
      createdAt: '2018-09-14T19:23:20.980Z',
      updatedAt: '2018-09-14T19:24:13.155Z',
      CategoryId: null,
      Images: [
        {
          id: 1,
          url: 'https://www.standardfurniture.com/getmetafile/84493774-e46f-4675-8e74-33a9672e6d2e/product-default.aspx',
          is_main: true,
          ProductId: 3
        }
      ]
    },
    {
      id: 6,
      name: 'Dell Inspiron 17 5000',
      price: 630,
      discount_price: 0,
      description: '17" laptop designed to perfect family entertainment, with a sophisticated design and an array of optional features. Featuring AMD Ryzen™ processors with Radeon™ Vega graphics.',
      available: true,
      isDeleted: false,
      createdAt: '2018-09-14T19:26:25.933Z',
      updatedAt: '2018-09-14T19:26:25.933Z',
      CategoryId: 1,
      Images: [
        {
          id: 4,
          url: 'http://n1.ukrbox.com/dell.jpg',
          is_main: true,
          ProductId: 6
        }
      ]
    },
    {
      id: 7,
      name: 'HTC U12 life',
      price: 1000,
      discount_price: 0,
      description: 'A dual camera that captures eye-catching photos and videos. A remarkable dual finish that offers a stunningly fresh take on design. A big battery that keeps up with your life. HTC U12 life is the phone where creativity meets beauty and stamina.',
      available: true,
      isDeleted: true,
      createdAt: '2018-09-14T19:26:34.352Z',
      updatedAt: '2018-09-14T19:34:39.630Z',
      CategoryId: 2,
      Images: [
        {
          id: 5,
          url: 'http://n1.ukrbox.com/htc.jpg',
          is_main: true,
          ProductId: 7
        }
      ]
    },
    {
      id: 8,
      name: 'Lenovo Legion Y530',
      price: 1165,
      discount_price: 0,
      description: 'This 15.6 laptop gives you exactly what you need for a gaming experience that balances performance and portability. Its breathtakingly sleek design and latest-generation specs guarantee you serious power. Thermally optimized to run cooler and quieter with a full-sized white-backlit keyboard, the Lenovo Legion Y530 Laptop is primed for those who demand gaming wherever life takes them.',
      available: true,
      isDeleted: false,
      createdAt: '2018-09-14T19:26:43.639Z',
      updatedAt: '2018-09-14T19:26:43.639Z',
      CategoryId: 1,
      Images: [
        {
          id: 6,
          url: 'http://n1.ukrbox.com/legion.png',
          is_main: true,
          ProductId: 8
        }
      ]
    },
    {
      id: 9,
      name: 'HTC U12 life',
      price: 1000,
      discount_price: 0,
      description: 'A dual camera that captures eye-catching photos and videos. A remarkable dual finish that offers a stunningly fresh take on design. A big battery that keeps up with your life. HTC U12 life is the phone where creativity meets beauty and stamina.',
      available: true,
      isDeleted: true,
      createdAt: '2018-09-14T19:26:47.365Z',
      updatedAt: '2018-09-14T19:34:37.251Z',
      CategoryId: 2,
      Images: [
        {
          id: 7,
          url: 'http://n1.ukrbox.com/htc.jpg',
          is_main: true,
          ProductId: 9
        }
      ]
    },
    {
      id: 10,
      name: 'Motorola Moto z2 play',
      price: 165,
      discount_price: 0,
      description: 'up to 30-hour battery. Plus, get up to 8 hours of power in 15 minutes with TurboPower focus faster. Dual autofocus pixels plus laser autofocus for amazing photos in any light fast memory and tons of space for music, films, and photos.',
      available: true,
      isDeleted: true,
      createdAt: '2018-09-14T19:27:09.057Z',
      updatedAt: '2018-09-14T19:34:35.204Z',
      CategoryId: 1,
      Images: [
        {
          id: 8,
          url: 'http://n1.ukrbox.com/motorola.jpg',
          is_main: true,
          ProductId: 10
        }
      ]
    },
    {
      id: 14,
      name: 'Motorola Moto z2 play',
      price: 165,
      discount_price: 0,
      description: 'up to 30-hour battery. Plus, get up to 8 hours of power in 15 minutes with TurboPower focus faster. Dual autofocus pixels plus laser autofocus for amazing photos in any light fast memory and tons of space for music, films, and photos.',
      available: true,
      isDeleted: false,
      createdAt: '2018-09-14T19:36:18.557Z',
      updatedAt: '2018-09-14T20:00:24.100Z',
      CategoryId: 2,
      Images: [
        {
          id: 12,
          url: 'http://n1.ukrbox.com/motorola.jpg',
          is_main: true,
          ProductId: 14
        }
      ]
    },
    {
      id: 22,
      name: 'laptops',
      price: 120,
      discount_price: 0,
      description: 'laptops for work',
      available: false,
      isDeleted: true,
      createdAt: '2018-09-17T09:47:55.817Z',
      updatedAt: '2018-09-17T09:50:00.913Z',
      CategoryId: 1,
      Images: [
        {
          id: 20,
          url: 'http://n1.ukrbox.com/sptrx360q1fy18_hero1.png',
          is_main: true,
          ProductId: 22
        }
      ]
    }
  ]

const pages = 4

export const FetchProducts = {
    pages,
    products
}