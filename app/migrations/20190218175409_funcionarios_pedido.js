exports.up = function(knex, Promise) {
  return knex.schema.createTable("funcionarios_pedido", table => {
    table.increments("id").primary();
    table
      .bigInteger("id_pedido")
      .unsigned()
      .index()
      .references("id")
      .inTable("pedido")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table
      .bigInteger("id_caixa")
      .unsigned()
      .index()
      .references("id")
      .inTable("usuario")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table
      .bigInteger("id_cozinha")
      .unsigned()
      .index()
      .references("id")
      .inTable("usuario")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table
      .bigInteger("id_separacao")
      .unsigned()
      .index()
      .references("id")
      .inTable("usuario")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table
      .bigInteger("id_entregador")
      .unsigned()
      .index()
      .references("id")
      .inTable("usuario")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("update_at").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("funcionarios_pedido");
};
