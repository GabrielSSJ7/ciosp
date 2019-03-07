const bcrypt = require("bcrypt-nodejs");
const { authSecret } = require("../.env");
const jwt = require("jwt-simple");

module.exports = app => {
  const {
    existsOrError,
    validateEmail,
    validateCPF
  } = app.components.validation;

  /*
   *
   * id_contratante -> int
   * order (preco, nome, created_at...) -> string
   * asc_desc (ASC ou DESC) -> string
   */
  const buscarProdutos = async (req, res) => {
    const id = req.query.id || null;
    const order = req.query.order || null;
    const asc_desc = req.query.asc_desc || null;
    console.log(order);
    await app
      .db("produto")
      .where({
        id_contratante: id
      })
      .orderBy(order, asc_desc)
      // .innerJoin("usuario", "like.usuarioLikeId", "usuario.id")
      .then(produtos => {
        for (let i = 0; i < produtos.length; i++) {
          produtos[i].selecionado = 0;
        }
        return res.json(produtos);
      })
      .catch(erro => {
        return res.status(500).send(erro);
      });
  };

  /*
   * id_contratante -> int
   * nome -> string
   * preco -> float
   * descricao -> string
   */
  const adicionarProduto = (req, res) => {
    const data = req.body || null;

    app
      .db("produto")
      .insert({
        id_contratante: data.id_contratante,
        nome: data.nome,
        preco: data.preco,
        descricao: data.descricao
      })
      .then(prods => {
        return res.json(prods);
      })
      .catch(erro => {
        return res.status(500).send(erro);
      });
  };

  // id -> int
  const selecionaProduto = async (req, res) => {
    const id = req.query.id || null;

    const produto = await app.db("produto").where({ id });

    if (produto.length == 0)
      return res.status(400).send("Nenhum produto encontrado!");

    return res.json(produto);
  };

  /*
   * id -> int
   * nome -> string
   * preco -> float
   * descricao -> string
   */
  const editaProduto = (req, res) => {
    const data = req.body || null;

    app
      .db("produto")
      .where({ id: data.id })
      .update({ nome: data.nome, preco: data.preco, descricao: data.descricao })
      .then(r => {
        if (r == 0) {
          return res.status(400).send("Não foi encontrado convite.");
        }

        return res.sendStatus(200);
      })
      .catch(erro => {
        return res.status(500).send(erro);
      });
  };

  const removeProduto = (req, res) => {
    const id = req.query.id || null;

    app
      .db("produto")
      .where({ id })
      .del()
      .then(ok => {
        return res.sendStatus(200);
      })
      .catch(erro => {
        return res.json(erro);
      });
  };

  return {
    buscarProdutos,
    adicionarProduto,
    selecionaProduto,
    editaProduto,
    removeProduto
  };
};
