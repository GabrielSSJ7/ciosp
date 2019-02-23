exports.up = function(knex, Promise) {
  return knex.schema.createTable("perfis", table => {
    table.increments("id").primary();
    table
      .bigInteger("id_user")
      .unsigned()
      .index()
      .references("id")
      .inTable("usuario")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table.text("perfil");
    table.boolean("ativado").notNull();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("update_at").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("perfis");
};
