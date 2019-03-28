exports.seed = function (knex, Promise) {
  return knex('dishes').del()
    .then(function () {
      return Promise.all([
        knex('dishes').insert({ image: 'public/images-Mar/b1.jpg', name: 'Chop House Burger', description: 'Black summer truffle sauce, shaved red onions, vine ripened tomatoes & green leaf lettuce.', price: 6.50 }),
        knex('dishes').insert({ image: 'public/images-Mar/b2.jpg', name: 'Buffalo Burger', description: 'Spicy homemade wing sauce, blue cheese sauce, shaved red onions, vine ripened tomatoes & green leaf lettuce.', price: 7.25 }),
        knex('dishes').insert({ image: 'public/images-Mar/b3.jpg', name: 'Wine Country Burger', description: 'Angus beef, goat cheese, honey mustard, arugula, shaved red onions & vine ripened tomatoes.', price: 8.25 }),
        knex('dishes').insert({ image: 'public/images-Mar/b4.jpg', name: 'Chicken Fried Chicken Burger', description: 'Free range chicken breast crisp fried, shaved red onions, vine ripened tomatoes, green leaf lettuce & white peppercorn gravy.', price: 7.25 }),
        knex('dishes').insert({ image: 'public/images-Mar/b5.jpg', name: 'Ahi Tuna Burger', description: 'Sushi grade tuna, wasabi mayo, pickled ginger, nori chip & arugula.', price: 9.25 }),
        knex('dishes').insert({ image: 'public/images-Mar/b6.jpg', name: 'The Green Burger', description: 'Falafel, tzatziki, pickled cucumber, hummus, shaved red onions, vine ripened tomatoes & green leaf lettuce. Vegetarian.', price: 7.25 }),
        knex('dishes').insert({ image: 'public/images-Mar/b7.jpg', name: 'El Luchador Burger', description: 'Pepper Jack cheese, pico de gallo, tostada, habanero mayo & guacamole.', price: 8.25 })
      ]);
    });
};



