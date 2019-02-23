exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("produto")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("produto").insert([
        {
          id_contratante: 1,
          nome: "Pizza Toscana",
          preco: 25.0,
          descricao: "Línguiça toscana, frango c/ catupry e cebola."
        },
        {
          id_contratante: 1,
          nome: "Pizza Frango com Catupry",
          preco: 25.0,
          descricao: "Frango desfiado com catupry, milho, cebola."
        },
        {
          id_contratante: 1,
          nome: "Pizza Baiana",
          preco: 25.0,
          descricao: "calabresa, cebola, mussarela, ervilha e pimenta"
        },
        {
          id_contratante: 1,
          nome: "Pizza Baiacatu",
          preco: 25.0,
          descricao: "Calabresa Moída, com catupiry"
        },
        {
          id_contratante: 1,
          nome: "Pizza Calabresa",
          preco: 25.0,
          descricao: "Calabresa Fatiada e cebola"
        },
        {
          id_contratante: 1,
          nome: "Pizza Siciliana",
          preco: 25.0,
          descricao: "Calabresa Moída, champignon, bacon e mussarela"
        },
        {
          id_contratante: 1,
          nome: "Pizza Americana",
          preco: 25.0,
          descricao: "Presunto, cebola, palmito, ovos, ervilha e mussarela"
        },
        {
          id_contratante: 1,
          nome: "Pizza Romanesca",
          preco: 25.0,
          descricao: "Presunto, bacon, champignon e catupiry"
        },
        {
          id_contratante: 1,
          nome: "Pizza Romanesca",
          preco: 25.0,
          descricao: "Presunto, bacon, champignon e catupiry"
        },

        {
          id_contratante: 1,
          nome: "Coca-cola 2lt",
          preco: 7.0,
          descricao: ""
        },

        {
          id_contratante: 1,
          nome: "Coca-cola latinha 250ml",
          preco: 3.0,
          descricao: ""
        },

        {
          id_contratante: 1,
          nome: "Suco del vale 500ml",
          preco: 3.0,
          descricao: ""
        },
        // contraante 2

        {
          id_contratante: 2,
          nome: "CATUPIRY COM BACON",
          preco: 27.99,
          descricao: "Pão da Casa, Molho de Tomate Le Pinguê, Hambúrguer de 190g, Catupiry e Bacon crocante.*Você pode substituir o blend de carne pelo Shiitake ou Hambúrguer de Frango."
        },

        {
          id_contratante: 2,
          nome: "CHEDDAR",
          preco: 30.50,
          descricao: "Pão Australiano, Maionese da Casa, Hambúrguer de 190g, Cheddar, Cebola caramelizada e Bacon crocante.*Você pode substituir o blend de carne pelo Shiitake ou Hambúrguer de Frango."
        },

        {
          id_contratante: 2,
          nome: "CHEESEBURGER",
          preco: 26.00,
          descricao: "Pão e Maionese da Casa, Hambúrguer de 190g e Queijo Muçarela derretido.*Você pode substituir o blend de carne pelo Shiitake ou Hambúrguer de Frango."
        },

        {
          id_contratante: 2,
          nome: "COSTELA",
          preco: 32.00,
          descricao: "Pão e Maionese da Casa, Bacon crocante, Hambúrguer de 190g de Costela, Queijo Provolone, Molho Barbecue e Cebola Roxa. *Você pode substituir o blend de carne pelo Shiitake ou Hambúrguer de Frango."
        },


        {
          id_contratante: 2,
          nome: "DUPLO BACON",
          preco: 30.00,
          descricao: "Pão da Casa, Molho de Queijo, dois Hambúrgueres de 100g cada, Queijo Prato, Ketchup Le Pinguê e Bacon. *Você pode substituir o blend de carne pelo Shiitake ou Hambúrguer de Frango."
        },

        {
          id_contratante: 2,
          nome: "Coca-cola 2lt",
          preco: 7.0,
          descricao: ""
        },

        {
          id_contratante: 2,
          nome: "Coca-cola latinha 250ml",
          preco: 3.0,
          descricao: ""
        },

        {
          id_contratante: 2,
          nome: "Suco del vale 500ml",
          preco: 3.0,
          descricao: ""
        },

        //contratante 3 
        {
          id_contratante: 3,
          nome: "Cocovan",
          preco: 3.0,
          descricao: ""
        }

      ]);
    });
};
