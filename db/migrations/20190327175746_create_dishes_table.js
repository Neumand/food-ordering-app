
exports.up = function (knex, Promise) {
  return knex.schema.createTable('dishes', function (table) {
    table.increments();
    table.string('image');
    table.string('name');
    table.string('description');
    table.float('price')
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('dishes');
};
