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
   * Authorization bearer token
   * month in query (1 - 12)
   * year in query (ex 2019)
   */
  const totalPedidos = async (req, res) => {
    const token = req.get("Authorization").replace("bearer ", "");
    const user = jwt.decode(token, authSecret);

    const d = new Date();
    const m = d.getMonth();
    const y = d.getFullYear();

    const month = req.query.month || null;
    const year = req.query.year || y;

    let result = null;

    if (month != null) {
      result = await app.db.raw(`SELECT count(id) as pedidos FROM pedido
        WHERE EXTRACT(MONTH FROM created_at) = ${month}
        and EXTRACT(YEAR FROM created_at) = ${year} 
        and id_contratante = ${user.id_contratante};`);
    } else {
      result = await app.db.raw(`SELECT count(id) as pedidos FROM pedido
        WHERE EXTRACT(YEAR FROM created_at) = ${year} 
        and id_contratante = ${user.id_contratante};`);
    }

    // .innerJoin("usuario", "like.usuarioLikeId", "usuario.id")

    return res.json(result.rows);
  };

  /*
   *
   * Authorization bearer token
   * month in query (1 - 12)
   * year in query (ex 2019)
   */
  const totalFaturamento = async (req, res) => {
    const token = req.get("Authorization").replace("bearer ", "");
    const user = jwt.decode(token, authSecret);

    const d = new Date();
    const m = d.getMonth();
    const y = d.getFullYear();

    const month = req.query.month || null;
    const year = req.query.year || y;

    let result = null;

    if (month != null) {
      result = await app.db.raw(`SELECT sum(valor_total) FROM pedido 
      WHERE EXTRACT(MONTH FROM created_at) = ${month}
      and EXTRACT(YEAR FROM created_at) = ${year}
      and id_contratante = ${user.id_contratante};;`);
    } else {
      result = await app.db.raw(`SELECT sum(valor_total) FROM pedido
        WHERE EXTRACT(YEAR FROM created_at) = ${year} 
        and id_contratante = ${user.id_contratante};`);
    }

    // .innerJoin("usuario", "like.usuarioLikeId", "usuario.id")

    return res.json(result.rows);
  };

  /*
  "endereco": "Rua avaré, 511 - Jardim Dom José",
	"valor_total": 50,
	"troco": 50,
	"produtos": [
		{
			"nome_produto":"Pizza do Kleyton Delegado",
			"preco": 25,
			"qtde": 1
		},
		
		{
			"nome_produto":"Pizza de Calabresa",
			"preco": 25,
			"qtde": 1
		}
	],
	"detalhes": {
		"id_caixa": 1,
		"id_cozinha": 2,
		"id_sep": 3,
		"id_entregador": 4
	}
   */
  const adicionarPedidos = async (req, res) => {
    const data = req.body || null;

    const token = req.get("Authorization").replace("bearer ", "");
    const user = jwt.decode(token, authSecret);

    try {
      existsOrError(data.endereco, "É necessário informar o endereço");
      existsOrError(
        data.valor_total,
        "É necessário informar qual o valor total"
      );
      existsOrError(data.troco, "É necessário dizer se há troco");
    } catch (msg) {
      return res.status(400).send(msg);
    }
    console.log(user.id_contratante);
    app
      .db("pedido")
      .returning("id")
      .insert({
        id_contratante: user.id_contratante,
        nome_cliente: data.nome_cliente || null,
        valor_total: data.valor_total,
        troco: data.troco,
        endereco: data.endereco,
        telefone: data.telefone || null
      })
      .then(async id_pedido => {
        for (let x = 0; x < data.produtos.length; x++) {
          await app
            .db("produto_pedido")
            .returning("id")
            .insert({
              id_pedido: id_pedido[0],
              nome_produto: data.produtos[x].nome_produto,
              preco: data.produtos[x].preco,
              qtde: data.produtos[x].qtde
            })
            .then(_ => {})
            .catch(erro => {
              return res.status(500).send(erro);
            });
        }

        await app
          .db("detalhes_pedido")
          .returning("id")
          .insert({
            id_pedido: id_pedido[0],
            id_caixa: data.detalhes.id_caixa,
            id_cozinha: data.detalhes.id_cozinha,
            id_sep: data.detalhes.id_sep,
            id_entregador: data.detalhes.id_entregador
          })
          .then(_ => {
            return res.sendStatus(200);
          })
          .catch(erro => {
            return res.status(500).send(erro);
          });
      })
      .catch(erro => {
        return res.status(500).send(erro);
      });
  };

  // id -> int
  const listaPedido = async (req, res) => {
    const token = req.get("Authorization").replace("bearer ", "");
    const user = jwt.decode(token, authSecret);

    const d = new Date();
    const m = d.getMonth();
    const y = d.getFullYear();

    const month = req.query.month || null;
    const year = req.query.year || y;

    let result = null;

    if (month != null) {
      result = await app.db.raw(`SELECT * FROM pedido 
      WHERE EXTRACT(MONTH FROM created_at) = ${month}
      and EXTRACT(YEAR FROM created_at) = ${year}
      and id_contratante = ${user.id_contratante};;`);
    } else {
      result = await app.db.raw(`SELECT * FROM pedido
        WHERE EXTRACT(YEAR FROM created_at) = ${year} 
        and id_contratante = ${user.id_contratante};`);
    }

    // .innerJoin("usuario", "like.usuarioLikeId", "usuario.id")

    return res.json(result.rows);
  };

  return {
    adicionarPedidos,
    totalPedidos,
    totalFaturamento,
    listaPedido
  };
};
