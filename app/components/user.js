const bcrypt = require("bcrypt-nodejs");
const { authSecret } = require("../.env");
const jwt = require("jwt-simple");

module.exports = app => {
  const {
    existsOrError,
    validateEmail,
    validateCPF
  } = app.components.validation;

  const encryptPassword = password => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  };

  /*
    nome
    email
    cpf
    nick
    id_contratante
  */
  const signin = async (req, res) => {
    const user = { ...req.body };

    try {
      existsOrError(user.nome, "Nome não informado.");
      validateEmail(user.email, "O e-mail informado é inválido.");
      existsOrError(user.email, "E-mail não informado.");
      existsOrError(user.cpf, "Senha não informada.");
      existsOrError(user.nick, "Senha não informada.");
    } catch (msg) {
      return res.status(400).send(msg);
    }

    user.ativo = true;

    //let password = user.cpf.substring (0,4);

    const userDB = await app
      .db("usuario")
      .where({ email: user.email })
      .first();

    if (userDB) return res.status(400).send("Este e-mail já está sendo usado!");

    //password = encryptPassword(user.password);

    app
      .db("usuario")
      .insert(user)
      .then(_ => res.status(200).send(true))
      .catch(err => {
        console.log(err);
        return res.status(500).send(err);
      });
  };

  /*
    passData (nick ou email)
    password
  */
  const login = async (req, res) => {
    if (!req.body.passData || !req.body.password) {
      return res.status(400).send("Informe as credenciais de acesso!");
    }

    let user = await app
      .db("usuario")
      .where({ email: req.body.passData })
      .first();

    if (user) {
      const senha = req.body.password;
      console.log(user);
      if (senha != user.cpf.replace(/[^\w\s]/gi, "").substring(0, 4))
        return res.status(400).send("Senha incorreta!");
      const now = Math.floor(Date.now() / 1000);

      const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
        id_contratante: user.id_contratante,
        perfil: user.perfil,
        iat: now,
        exp: now + 60 * 60 * 24 * 365

        // exp: now + 1
      };

      return res.json({
        ...payload,
        token: jwt.encode(payload, authSecret)
      });
    }

    // try {
    //   validateEmail(req.body.passData, "O e-mail informado é inválido.");
    // } catch (msg) {
    //   return res.status(400).send(msg);
    // }

    user = await app
      .db("usuario")
      .where({ nick: req.body.passData })
      .first();

    if (!user) return res.status(400).send("Usuário não encontrado!");

    const senha = req.body.password;
    console.log(user.cpf.replace(/[^\w\s]/gi, "").substring(0, 4));
    if (senha != user.cpf.replace(/[^\w\s]/gi, "").substring(0, 4))
      return res.status(400).send("Senha incorreta!");

    // const isMatch = bcrypt.compareSync(req.body.password, user.password);
    // if (!isMatch) return res.status(401).send("Email/Senha inválidos!");

    const now = Math.floor(Date.now() / 1000);

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      id_contratante: user.id_contratante,
      nick: user.nick,
      iat: now,
      exp: now + 60 * 60 * 24 * 365

      // exp: now + 1
    };

    return res.json({
      ...payload,
      token: jwt.encode(payload, authSecret)
    });
  };

  /*
    nome
    email
    cpf
    nick
    token
  */
  const editUser = (req, res) => {
    const userData = req.body || null;
    const token = jwt.decode(userData.token, authSecret);

    try {
      existsOrError(userData.nome, "Nome não informado.");
      validateEmail(userData.email, "O e-mail informado é inválido.");
      existsOrError(userData.email, "E-mail não informado.");
      existsOrError(userData.cpf, "CPF não informada.");
      existsOrError(userData.nick, "Senha não informada.");
    } catch (msg) {
      return res.status(400).send(msg);
    }

    if (validateCPF(userData.cpf)) {
      app
        .db("usuario")
        .where({ id: token.id })
        .update({
          nome: userData.nome,
          cpf: userData.cpf,
          nick: userData.nick,
          email: userData.email
        })
        .then(_ => res.status(200).send(true))
        .catch(err => {
          return res.status(500).send(err);
        });
    } else {
      return res.status(400).send("O CPF digitado é inválido");
    }
  };

  const validateToken = async (req, res) => {
    const userData = req.body || null;

    try {
      if (userData) {
        const token = jwt.decode(userData.token, authSecret);
        //console.log(Math.floor(Date.now() / 1000))
        //console.log(new Date())
        if (new Date(token.exp * 1000) > new Date()) {
          return res.send(true);
        }
      }
    } catch (e) {
      // problema com o token
    }

    res.send(false);
  };

  /*

  */
  const getAllUser = (req, res) => {
    let token = req.query.token || null;
    token = jwt.decode(token, authSecret);

    app
      .db("usuario")
      .where({ id_contratante: token.id_contratante })
      .then(dbr => {
        return res.json(dbr);
      })
      .catch(erro => {
        return res.status(500).send(erro);
      });
  };

  const getDataUser = (req, res) => {
    const id_user = req.query.id || null;

    app
      .db("usuario")
      .where({ id: id_user })
      .then(dbr => {
        return res.json(dbr);
      })
      .catch(erro => {
        return res.status(500).send(erro);
      });
  };

  /*
    id
  */
  const getPerfilUser = (req, res) => {
    const id_user = req.query.id || null;

    app
      .db("perfis")
      .where({ id_user })
      .then(dbr => {
        return res.json(dbr);
      })
      .catch(erro => {
        return res.status(500).send(erro);
      });
  };

  /*
    id perfil
    ativado boolean: true/false
  */
  const editPerfilUser = (req, res) => {
    const perfil = req.body || null;

    app
      .db("perfis")
      .where({ id: perfil.id })
      .update({
        ativado: perfil.ativado
      })
      .then(dbr => {
        return res.status(200).send(true);
      })
      .catch(erro => {
        return res.status(500).send(erro);
      });
  };

  const descontratar = (req, res) => {
    const token = req.get("Authorization").replace("bearer ", "");
    const user = jwt.decode(token, authSecret);

    if (!user.id) return res.status(400).send("id do usuário não encontrado");

    app
      .db("usuario")
      .where({ id: user.id })
      .returning("*")
      .update({
        contratado: false
      })

      .then(r => {
        console.log(r);
        return res.json(r[0]);
      })
      .catch(erro => {
        return res.status(500).send(erro);
      });
  };

  const convidar = async (req, res) => {
    const token = req.get("Authorization").replace("bearer ", "");
    const contratante = jwt.decode(token, authSecret);

    const userId = req.body || null;

    if (!contratante.id_contratante)
      return res.status(400).send("id do contratante não encontrado");
    if (!userId.id)
      return res.status(400).send("id do contratado não encontrado");

    const user = await app.db("usuario").where({ id: userId.id });

    console.log(user);

    if (!user.contratado) {
      const convite = await app.db("convite").where({
        id_contratante: contratante.id_contratante,
        id_usuario: user[0].id
      });

      console.log(convite);
      if (Array.isArray(convite) && convite.length !== 0)
        return res.status(400).send("Este usuário já foi convidado");

      await app
        .db("convite")
        .insert({
          id_contratante: contratante.id_contratante,
          id_usuario: user[0].id,
          status: true
        })
        .then(r => {
          return res.sendStatus(200);
        })
        .catch(erro => {
          return res.status(500).send(erro);
        });
    } else {
      return res.sendStatus(400);
    }
  };

  const buscaConvites = async (req, res) => {
    const option = req.query.option || null;

    if (option == "contratante") {
      const convite = await app.db.raw(`
        SELECT usuario.nome, usuario.email 
        FROM convite JOIN usuario 
        ON convite.id_usuario = usuario.id 
        WHERE convite.id_contratante = ${
          req.body.id
        } and convite.status = true;`);

      return res.json(convite.rows);
    } else {
      const convite = await app.db.raw(`
      SELECT usuario.nome, usuario.email 
      FROM convite JOIN usuario 
      ON convite.id_usuario = usuario.id 
      WHERE convite.id_usuario =  ${req.body.id} and convite.status = true;`);

      return res.json(convite.rows);
    }
  };

  const buscaUsuariosNaoContratados = async (req, res) => {
      const data = req.query.search;
      console.log(data);
      const result = await app.db.raw(`
        SELECT * FROM usuario WHERE contratado = false AND nick ILIKE '${data}%' OR email ILIKE '${data}% '
      `);

      return res.json(result.rows)
  }

  const aceitaConvite = async (req, res) => {
    const option = req.query.option || null;
    const data = req.body || null;
    const token = req.get("Authorization").replace("bearer ", "");
    const user = jwt.decode(token, authSecret);

    // ACEITO
    if (option === "aceito") {
      app
        .db("convite")
        .where({
          id_usuario: user.id,
          id_contratante: data.id_contratante
        })
        .update({ status: false })
        .then(r => {
          console.log(r);
          if (r == 0) {
            return res.status(400).send("Não foi encontrado convite.");
          }
        })
        .catch(erro => {
          return res.status(500).send(erro);
        });

      app
        .db("usuario")
        .where({ id: user.id })
        .update({ id_contratante: data.id_contratante, contratado: true })
        .then(r => {
          if (r != 0) return res.sendStatus(200);
        })
        .catch(erro => {
          return res.status(500).send(erro);
        });

        // RECUSO
    } else if (option === "recuso") {
      app
        .db("convite")
        .where({
          id_usuario: user.id,
          id_contratante: data.id_contratante
        })
        .update({ status: false })
        .then(r => {
          if (r == 0) {
            return res.status(400).send("Não foi encontrado convite.");
          } else {
            return res.sendStatus(200);
          }
        })
        .catch(erro => {
          return res.status(500).send(erro);
        });
    } else {
      return res.sendStatus(400);
    }
  };

  return {
    signin,
    login,
    validateToken,
    editUser,
    getAllUser,
    getDataUser,
    getPerfilUser,
    editPerfilUser,
    descontratar,
    convidar,
    buscaConvites,
    buscaUsuariosNaoContratados,
    aceitaConvite
  };
};
