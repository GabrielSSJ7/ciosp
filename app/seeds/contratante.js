exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("contratante")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("contratante").insert([
        { nome: "Pizzaria Realeza II", cnpj: "51.654.885/0001-83", ativo: true },
        { nome: "Hamburgueria do Jé", cnpj: "34.175.457/0001-59", ativo: true },
        { nome: "Restaurante Sephora", cnpj: "85.745.332/0001-58", ativo: false }
      ]);
    });
};
