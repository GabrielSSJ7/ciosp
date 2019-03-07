module.exports = app => {

  app.route("/signin").post(app.components.user.signin);
  app.route("/login").post(app.components.user.login);
  app.route("/validateToken").post(app.components.user.validateToken);

  
  app.route("/buscarclientes").all(app.config.passport.authenticate()).get(app.components.clientes.buscarClientes)
  

  //Usuários || Funcionários
  app.route("/getalluser").all(app.config.passport.authenticate()).get(app.components.user.getAllUser)
  app.route("/getuserdata").all(app.config.passport.authenticate()).get(app.components.user.getDataUser)
  app.route("/perfiluser").all(app.config.passport.authenticate()).get(app.components.user.getPerfilUser)
  app.route("/perfiluser").all(app.config.passport.authenticate()).post(app.components.user.editPerfilUser)
  app.route("/descontratar").all(app.config.passport.authenticate()).post(app.components.user.descontratar)
  app.route("/convidar").all(app.config.passport.authenticate()).post(app.components.user.convidar)
  app.route("/buscaconvites").all(app.config.passport.authenticate()).get(app.components.user.buscaConvites)
  app.route("/aceitaconvite").all(app.config.passport.authenticate()).get(app.components.user.aceitaConvite)
  app.route("/buscausuarionaocontratado").all(app.config.passport.authenticate()).get(app.components.user.buscaUsuariosNaoContratados)

  app.route("/useredit").all(app.config.passport.authenticate()).post(app.components.user.editUser)

  // PRODUTOS
  app.route("/buscarprodutos").all(app.config.passport.authenticate()).get(app.components.produtos.buscarProdutos)
  app.route("/adicionaproduto").all(app.config.passport.authenticate()).post(app.components.produtos.adicionarProduto)
  app.route("/selecionaproduto").all(app.config.passport.authenticate()).get(app.components.produtos.selecionaProduto)
  app.route("/editaproduto").all(app.config.passport.authenticate()).post(app.components.produtos.editaProduto)
  app.route("/removeproduto").all(app.config.passport.authenticate()).delete(app.components.produtos.removeProduto)


  //PEDIDOS
  app.route("/novopedido").all(app.config.passport.authenticate()).post(app.components.pedido.adicionarPedidos);
  app.route("/totalpedidos").all(app.config.passport.authenticate()).get(app.components.pedido.totalPedidos);
  app.route("/totalfaturamento").all(app.config.passport.authenticate()).get(app.components.pedido.totalFaturamento);


  app.route("/cartoes").all(app.config.passport.authenticate()).post(app.components.cartoes.getAllCards);
  app.route("/inserteditcard").all(app.config.passport.authenticate()).post(app.components.cartoes.insertEditCard);
  app.route("/deletecard").all(app.config.passport.authenticate()).post(app.components.cartoes.deleteCard);
};
