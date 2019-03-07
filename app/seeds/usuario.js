exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("usuario")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("usuario").insert([
        {
          id_contratante: 1,
          nome: "Gabriel Luz",
          nick: "gmluz",
          email: "gabriel.n64@hotmail.com",
          cpf: "469.969.998-71",
          ativo: true
        },
        {
          id_contratante: 1,
          nome: "Dan Ferro",
          nick: "df",
          email: "dan.n64@hotmail.com",
          cpf: "469.909.998-71",
          ativo: true
        },
        {
          id_contratante: 1,
          nome: "Anderson Júlio",
          nick: "andsu",
          email: "andsu.n64@hotmail.com",
          cpf: "999.888.777-66",
          ativo: true
        },
        {
          id_contratante: 1,
          nome: "Kleyton Gomes",
          nick: "klay",
          email: "kleyton.n64@hotmail.com",
          cpf: "999.888.744-66",
          ativo: true
        },

        {
          id_contratante: 1,
          nome: "Clebinho Gomes",
          nick: "cleb ",
          email: "kleyton.n64@hotmail.com",
          cpf: "999.888.744-66",
          ativo: true
        },

        //contratante 2
        {
          id_contratante: 2,
          nome: "Gabriel Luz",
          nick: "gmluz",
          email: "gabriel.n64@hotmail.com",
          cpf: "469.969.998-71",
          ativo: true
        },
        {
          id_contratante: 2,
          nome: "Dan Ferro",
          nick: "df",
          email: "dan.n64@hotmail.com",
          cpf: "469.909.998-71",
          ativo: true
        },
        {
          id_contratante: 2,
          nome: "Anderson Júlio",
          nick: "andsu",
          email: "andsu.n64@hotmail.com",
          cpf: "999.888.777-66",
          ativo: true
        },
        {
          id_contratante: 2,
          nome: "Kleyton Gomes",
          nick: "klay",
          email: "kleyton.n64@hotmail.com",
          cpf: "999.888.744-66",
          ativo: true
        },

        {
          id_contratante: 2,
          nome: "Clebinho Gomes",
          nick: "cleb ",
          email: "kleyton.n64@hotmail.com",
          cpf: "999.888.744-66",
          ativo: true
        }
          
      ]);
    });
};
