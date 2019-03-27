exports.seed = function (knex, Promise) {
  console.log("Seeding restaurants")
  return Promise.all([
    knex('restaurant').del(),
    knex.raw("ALTER SEQUENCE restaurant_id_seq RESTART WITH 1"),
    knex('restaurant').insert({
      name: 'DM Burgers',
      phone_number: '514-223-4455'
    }),
  ]);
};
