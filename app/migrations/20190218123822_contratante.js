exports.up = function(knex, Promise) {
  return knex.schema.createTable("contratante", table => {
    table.increments("id").primary();
    table.text("nome");
    table.text("cnpj").notNull();
    table.boolean("ativo").notNull();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("update_at").defaultTo(knex.fn.now()); 
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("contratante");
};
