exports.up = function(knex, Promise) {
  return knex.schema.createTable("pedido", table => {
    table.increments("id").primary();
    table
      .bigInteger("id_contratante")
      .unsigned()
      .index()
      .references("id")
      .inTable("contratante")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table.text("nome_cliente");
    table.text("endereco");
    table.text("telefone");
    table.float("valor_total");
    table.float("troco");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("update_at").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("pedido");
};
