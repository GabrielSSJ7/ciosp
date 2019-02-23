exports.up = function(knex, Promise) {
  return knex.schema.createTable("convite", table => {
    table.increments("id").primary();
    table
      .bigInteger("id_usuario")
      .unsigned()
      .index()
      .references("id")
      .inTable("usuario")
      .onDelete("CASCADE")
      .onUpdate("CASCADE").notNull();;
    table
      .bigInteger("id_contratante")
      .unsigned()
      .index()
      .references("id")
      .inTable("contratante")
      .onDelete("CASCADE")
      .onUpdate("CASCADE").notNull();;
    table
        .boolean('status').notNull();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("update_at").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("convite");
};
