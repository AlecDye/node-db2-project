exports.up = function (knex) {
  return knex.schema.table("cars", (tbl) => {
    // tbl.increments("id");
    tbl.string("Transmission");
    tbl.string("TitleStatus");
  });
};

exports.down = function (knex) {
  return knex.schema.table("cars", (tbl) => {
    tbl.dropColumn("TitleStatus");
    tbl.dropColumn("Transmission");
  });
};
