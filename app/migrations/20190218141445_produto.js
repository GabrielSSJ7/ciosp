exports.up = function(knex, Promise) {
  return knex.schema.createTable("produto", table => {
    table.increments("id").primary();
    table
      .bigInteger("id_contratante")
      .unsigned()
      .index()
      .references("id")
      .inTable("contratante")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table.text("nome");
    table.float("preco");
    table.text("descricao");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("update_at").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("produto");
};
