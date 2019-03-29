exports.seed = function (knex, Promise) {
  console.log("Seeding cart")
  return Promise.all([
    knex('cart').del(),
    knex.raw("ALTER SEQUENCE restaurant_id_seq RESTART WITH 1"),
    knex('cart').insert({
      user_id: 1,
      dish_id: 4,
      quantity: 2
    }),
    knex('cart').insert({
      user_id: 2,
      dish_id: 2,
      quantity: 1
    })
  ]);
};