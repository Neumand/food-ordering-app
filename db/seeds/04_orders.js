exports.seed = function (knex, Promise) {
  console.log("Seeding orders")
  return Promise.all([
    knex.raw("ALTER SEQUENCE orders_id_seq RESTART WITH 1"),
    knex('orders').insert({
      users_id: 1,
      total: 25.80,
      ready_time: 10,
      taxes: 3.50
    }),
    knex('orders').insert({
      users_id: 2,
      total: 15.20,
      ready_time: 8,
      taxes: 2.60
    }),
    knex('orders').insert({
      users_id: 3,
      total: 22.12,
      ready_time: 15,
      taxes: 3.40
    }),

  ])
};