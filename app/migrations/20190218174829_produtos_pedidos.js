exports.up = function(knex, Promise) {
  return knex.schema.createTable("produto_pedido", table => {
    table.increments("id").primary();
    table
      .bigInteger("id_pedido")
      .unsigned()
      .index()
      .references("id")
      .inTable("pedido")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table.text("nome_produto").unique();
    table.float("preco");
    table.integer("qtde");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("update_at").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("produto_pedido");
};
