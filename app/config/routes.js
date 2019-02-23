module.exports = app => {

  app.route("/signin").post(app.components.user.signin);
  app.route("/login").post(app.components.user.login);
  app.route("/validateToken").post(app.components.user.validateToken);

  
  app.route("/buscarclientes").all(app.config.passport.authenticate()).get(app.components.clientes.buscarClientes)
  app.route("/buscarprodutos").all(app.config.passport.authenticate()).get(app.components.produtos.buscarProdutos)

  app.route("/getalluser").all(app.config.passport.authenticate()).get(app.components.user.getAllUser)
  app.route("/getuserdata").all(app.config.passport.authenticate()).get(app.components.user.getDataUser)
  app.route("/perfiluser").all(app.config.passport.authenticate()).get(app.components.user.getPerfilUser)
  app.route("/perfiluser").all(app.config.passport.authenticate()).post(app.components.user.editPerfilUser)
  app.route("/descontratar").all(app.config.passport.authenticate()).post(app.components.user.descontratar)
  app.route("/convidar").all(app.config.passport.authenticate()).post(app.components.user.convidar)
  app.route("/buscaconvites").all(app.config.passport.authenticate()).get(app.components.user.buscaConvites)
  app.route("/aceitaconvite").all(app.config.passport.authenticate()).get(app.components.user.aceitaConvite)

  app.route("/useredit").all(app.config.passport.authenticate()).post(app.components.user.editUser)

  app.route("/cartoes").all(app.config.passport.authenticate()).post(app.components.cartoes.getAllCards);
  app.route("/inserteditcard").all(app.config.passport.authenticate()).post(app.components.cartoes.insertEditCard);
  app.route("/deletecard").all(app.config.passport.authenticate()).post(app.components.cartoes.deleteCard);
};
