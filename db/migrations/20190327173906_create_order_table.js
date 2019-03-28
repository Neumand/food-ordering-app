
exports.up = function (knex, Promise) {
  return knex.schema.createTable('orders', function (table) {
    table.increments();
    table.integer('users_id').unsigned()
    table.float('total');
    table.integer('ready_time');
    table.float('taxes');
    table.foreign('users_id').references("users.id")
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('orders');
};
