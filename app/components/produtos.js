const bcrypt = require("bcrypt-nodejs");
const { authSecret } = require("../.env");
const jwt = require("jwt-simple");

module.exports = app => {
  const {
    existsOrError,
    validateEmail,
    validateCPF
  } = app.components.validation;

  const buscarProdutos = async (req, res) => {
    await app
    .db("produtos")
    // .innerJoin("usuario", "like.usuarioLikeId", "usuario.id")
    .then(produtos => {
      for(let i = 0; i < produtos.length; i++){
        produtos[i].selecionado = 0;
      }
      console.log(produtos)
      return res.json(produtos);
    });
  }


  return {
    buscarProdutos
  };
};
