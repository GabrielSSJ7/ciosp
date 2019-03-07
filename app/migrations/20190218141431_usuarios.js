exports.up = function(knex, Promise) {
  return knex.schema.createTable("usuario", table => {
    table.increments("id").primary();
    table.text("nome");
    table
      .bigInteger("id_contratante")
      .unsigned()
      .index()
      .references("id")
      .inTable("contratante")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table.text("nick");
    table.text("email");
    table.text("cpf");
    table.boolean("ativo").notNull();
    table.boolean("contratado").notNull().defaultTo(false);
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("update_at").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("usuario");
};
