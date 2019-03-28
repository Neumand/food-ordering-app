exports.seed = function (knex, Promise) {
  return knex('restaurant').del()
    .then(function () {
      return Promise.all([
        knex('restaurant').insert({ name: 'DM Burgers', phone_number: '514-223-4455' }),
      ]);
    });
};
