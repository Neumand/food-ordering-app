exports.seed = function (knex, Promise) {
  return knex('resturant').del()
    .then(function () {
      return Promise.all([
        knex('resturant').insert({ name: 'DM Burgers', phone_number: '514-223-4455' }),
      ]);
    });
};
