exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function (table) {
    table.increments();
    table.string('first_name');
    table.string('last_name');
    table.integer('street_number');
    table.string('street');
    table.string('city');
    table.string('province');
    table.string('postal_code');
    table.string('phone_number');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
