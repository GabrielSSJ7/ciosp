const jwt = require("jwt-simple");
const { authSecret } = require("../.env");

module.exports = app => {
  const {
    existsOrError,
    notExistsOrError,
    equalsOrError
  } = app.components.validation;
  let liked = [];
  let likes = []

  const buscarClientes = async (req, res) => {
    await app
      .db("clientes")
      // .innerJoin("usuario", "like.usuarioLikeId", "usuario.id")
      .then(clientes => {
        return res.json(clientes);
      });
  };
  
  return { buscarClientes };
};
