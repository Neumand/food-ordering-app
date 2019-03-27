
exports.up = function(knex, Promise) {
  return knex.schema.createTable('restaurant', function (table) {
    table.increments();
    table.string('name');
    table.string('phone_number', 30);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('restaurant');
};
