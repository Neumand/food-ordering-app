
exports.up = function (knex, Promise) {
  return knex.schema.createTable('order_dishes', function (table) {
    table.increments();
    table.integer('dish_id').unsigned();
    table.foreign('dish_id').references('dishes.id');
    table.integer('order_id').unsigned();
    table.foreign('order_id').references('orders.id');
    table.integer('quantity');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('order_dishes');
};
