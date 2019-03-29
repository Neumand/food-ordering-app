
exports.up = function (knex, Promise) {
  return knex.schema.createTable('cart', function (table) {
    table.increments();
    table.integer('user_id').unsigned();
    table.foreign('user_id').references('users.id');
    table.integer('dish_id').unsigned();
    table.foreign('dish_id').references('dishes.id');
    table.integer('quantity');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('cart');
};