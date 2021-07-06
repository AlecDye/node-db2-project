exports.up = function (knex) {
  return knex.schema.createTable("cars", (tbl) => {
    tbl.increments("id");
    // VIN a-z & 1-9; 11 - 17 char;
    tbl.string("VIN", 17).notNullable().unique().index();
    // Make "Honda", "Nissan", "Ford"
    tbl.string("Make").notNullable();
    // Model "Accord", "Altima", "F-150"
    tbl.string("Model").notNullable();
    // Mileage 0 - 100,000? no negatives
    tbl.float("Mileage").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableifExists("cars");
};
