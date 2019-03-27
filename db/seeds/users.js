exports.seed = function(knex, Promise) {
  return Promise.all([
    knex("users").del(),
    knex.raw("ALTER SEQUENCE users_id_seq RESTART WITH 1"),
    knex("users").insert({
      first_name: "Meredith",
      last_name: "Chaplin",
      street_number: 25,
      street: "Sunnyside Avenue",
      city: "Montreal",
      province: "Quebec",
      postal_code: "H4H9K9",
      phone_number: "999-999-9999"
    }),
    knex("users").insert({
      first_name: "Julien",
      last_name: "Francis ",
      street_number: 109,
      street: "Boulevard des sources",
      city: "Montreal",
      province: "Quebec",
      postal_code: "P4Q9E1",
      phone_number: "818-222-3456"
    }),
    knex("users").insert({
      first_name: "Catherine",
      last_name: "Cote",
      street_number: 9,
      street: "Rue Normand",
      city: "Montreal",
      province: "Quebec",
      postal_code: "Z9KPX8",
      phone_number: "180-123-0987"
    })
  ]);
};
