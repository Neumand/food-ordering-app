exports.seed = function (knex, Promise) {
  console.log("Seeding dishes")
  return Promise.all([
    knex('dishes').del(),
    knex.raw("ALTER SEQUENCE dishes_id_seq RESTART WITH 1"),
    knex('dishes').insert({
      name: 'Chop House Burger',
      description: 'Black summer truffle sauce, shaved red onions, vine ripened tomatoes & green leaf lettuce.',
      price: 6.50
    }),
    knex('dishes').insert({
      name: 'Buffalo Burger',
      description: 'Spicy homemade wing sauce, blue cheese sauce, shaved red onions, vine ripened tomatoes & green leaf lettuce.',
      price: 7.25
    }),
    knex('dishes').insert({
      name: 'Wine Country Burger',
      description: 'Angus beef, goat cheese, honey mustard, arugula, shaved red onions & vine ripened tomatoes.',
      price: 8.25
    }),
    knex('dishes').insert({
      name: 'Chicken Fried Chicken Burger',
      description: 'Free range chicken breast crisp fried, shaved red onions, vine ripened tomatoes, green leaf lettuce & white peppercorn gravy.',
      price: 7.25
    }),
    knex('dishes').insert({
      name: 'Ahi Tuna Burger',
      description: 'Sushi grade tuna, wasabi mayo, pickled ginger, nori chip & arugula.',
      price: 9.25
    }),
    knex('dishes').insert({
      name: 'The Green Burger',
      description: 'Falafel, tzatziki, pickled cucumber, hummus, shaved red onions, vine ripened tomatoes & green leaf lettuce. Vegetarian.',
      price: 7.25
    }),
    knex('dishes').insert({
      name: 'El Luchador Burger',
      description: 'Pepper Jack cheese, pico de gallo, tostada, habanero mayo & guacamole.',
      price: 8.25
    })
  ])
};



