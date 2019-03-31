exports.seed = function (knex, Promise) {
  console.log("seeding dishes")
  return Promise.all([
    knex('dishes').del(),
    knex.raw("ALTER SEQUENCE dishes_id_seq RESTART WITH 1"),
    knex('dishes').insert({
      image: '/images-Mar/b1.jpg',
      name: 'Chop House Burger',
      description: 'Black summer truffle sauce, shaved red onions, vine ripened tomatoes & green leaf lettuce.',
      price: 6.50,
      ready_time: 2,
    }),
    knex('dishes').insert({
      image: '/images-Mar/b2.jpg',
      name: 'Buffalo Burger',
      description: 'Spicy homemade wing sauce, blue cheese sauce, shaved red onions, vine ripened tomatoes & green leaf lettuce.',
      price: 7.25,
      ready_time: 4,
    }),
    knex('dishes').insert({
      image: '/images-Mar/b3.jpg',
      name: 'Wine Country Burger',
      description: 'Angus beef, goat cheese, honey mustard, arugula, shaved red onions & vine ripened tomatoes.',
      price: 8.25,
      ready_time: 2,
    }),
    knex('dishes').insert({
      image: '/images-Mar/b4.jpg',
      name: 'Chicken Fried Chicken Burger',
      description: 'Free range chicken breast crisp fried, shaved red onions, vine ripened tomatoes, green leaf lettuce & white peppercorn gravy.',
      price: 7.25,
      ready_time: 5,
    }),
    knex('dishes').insert({
      image: '/images-Mar/b5.jpg',
      name: 'Ahi Tuna Burger',
      description: 'Sushi grade tuna, wasabi mayo, pickled ginger, nori chip & arugula.',
      price: 9.25,
      ready_time: 7
    }),
    knex('dishes').insert({
      image: '/images-Mar/b6.jpg',
      name: 'The Green Burger',
      description: 'Falafel, tzatziki, pickled cucumber, hummus, shaved red onions, vine ripened tomatoes & green leaf lettuce. Vegetarian.',
      price: 7.25,
      ready_time: 4
    }),
    knex('dishes').insert({
      image: '/images-Mar/b7.jpg',
      name: 'El Luchador Burger',
      description: 'Pepper Jack cheese, pico de gallo, tostada, habanero mayo & guacamole.',
      price: 8.25,
      ready_time: 2
    }),
    knex('dishes').insert({
      image: '/images-Mar/b8.jpg',
      name: 'The Gobbler Burger',
      description: 'Ground turkey, cranberry mojo, provolone cheese, shaved red onion, vine ripened tomato & arugula.',
      price: 8.25,
      ready_time: 2
    }),
    knex('dishes').insert({
      image: '/images-Mar/b9.jpg',
      name: 'Notorious P.I.G',
      description: 'All natural beef on a brioche bun. Made with 100% all-natural, responsibly raised Angus beef, cooked to order & true to weight.',
      price: 10.25,
      ready_time: 2
    })
  ]);
};




