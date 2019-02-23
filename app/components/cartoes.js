const jwt = require("jwt-simple");
const { authSecret } = require("../.env");

module.exports = app => {
  const { existsOrError, validateCardNumber } = app.components.validation;

  const getAllCards = async (req, res) => {
    const { token } = req.body || null;
    const dataToken = jwt.decode(token, authSecret);

    const cards = await app.db("cartoes").where({ usuarioId: dataToken.id });

    if (!cards) {
      return res.status(400).send("Nenhum endereço encontrado");
    } else {
      return res.json(cards);
    }
  };

  const insertEditCard = async (req, res) => {
    const card = req.body || null;

    try {
      existsOrError(card.nome, "Você não inseriu o nome escrito no cartão");
      existsOrError(
        card.bandeira,
        "Você não inseriu escolheu a bandeira do cartão"
      );
      existsOrError(card.numero, "Você não inseriu o número do cartão");
      validateCardNumber(card.numero, card.bandeira);
      existsOrError(card.validade, "Você não inseriu a validade do cartão");
      existsOrError(
        card.codigo_seguranca,
        "Você não inseriu o código de segurança do cartão"
      );
    } catch (msg) {
      return res.status(400).send(msg);
    }
    dataToken = jwt.decode(card.token, authSecret);
    const cardDB = await app
      .db("cartoes")
      .where({ id: card.id ? card.id : 0 })
      .first();

    if (cardDB) {
      const _cardDB = await app.db("cartoes");
      console.log(_cardDB);
      for (let x = 0; x < _cardDB.length; x++) {
        if (_cardDB[x].numero === card.numero) {
          return res.status(400).send("Já existe um cartão com este número");
        }
      }
      app
        .db("cartoes")
        .where({ id: card.id })
        .update({
          nome: card.nome,
          bandeira: card.bandeira,
          numero: card.numero,
          codigo_seguranca: card.codigo_seguranca,
          validade: card.validade
        })
        .then(_ => res.status(200).send(true))
        .catch(err => {
          return res.status(500).send(err);
        });
    } else {
      const _cardDB = await app.db("cartoes");
      console.log(_cardDB);
      for (let x = 0; x < _cardDB.length; x++) {
        if (_cardDB[x].numero === card.numero) {
          return res.status(400).send("Já existe um cartão com este número");
        }
      }
      app
        .db("cartoes")
        .insert({
          usuarioId: dataToken.id,
          nome: card.nome,
          bandeira: card.bandeira,
          numero: card.numero,
          codigo_seguranca: card.codigo_seguranca,
          validade: card.validade
        })
        .then(id => {
          return res.status(200).send(true);
        })
        .catch(err => {
          return res.status(500).send(err);
        });
    }
  };

  const deleteCard = (req, res) => {
    const { id } = req.body || null;
    app
      .db("cartoes")
      .where({
        id
      })
      .del()
      .then(_ => {
        return res.status(200).send(true);
      })
      .catch(err => {
        return res.status(500).send("dEU RUIm");
      });
  };

  return { getAllCards, insertEditCard, deleteCard };
};
