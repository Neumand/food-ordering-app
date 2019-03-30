
exports.up = function (knex, Promise) {
  return knex.schema.table('dishes', function (table) {
    table.integer('ready_time');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('dishes', function (table) {
  table.dropColumn('ready_time');
  })
};
