import React, { Component } from "react";
import {
  View,
  Text,
  ListView,
  TouchableHighlight,
  Image,
  TextInput,
  FlatList,
  Picker
} from "react-native";
import { AsyncStorage } from "react-native";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import Dialog from "react-native-dialog";

import {
  buscarClientes,
  mudaListaProduto,
  mudaListaSelecionado,
  cloneWithRowProdutos,
  mudaTextoQuantidade,
  mudaTotalPedido,
  buscarListaDeProdutos,
  mudaMeia,
  mudaMeiaData
} from "../actions/AppActions";

class Produtos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bdcolor: "#ddd",
      produtos: [
        { nome: "Pasta de dente", preco: 60, qtde: 10, selecionado: 0 }
      ],
      dialog: false,
      dialogToDelete: false,
      rowID: 0,
      rowData: null
    };
  }
  componentDidMount() {
    if (this.props.produtos.length == 0) {
      this.props.buscarListaDeProdutos();
    }
  }

  mudaListaProduto = id => {
    this.setState({
      bdcolor: "#000"
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.produtos !== prevProps.produtos) {
      this.props.cloneWithRowProdutos(this.props.ds, this.props.produtos);
    }
  }

  /* QUANDO PRODUTO FOR SELECIONADO APÓS DIALOG DE QUANTIDADE */
  selecionaProduto(rowData, rowID) {
    /* SE A PIZZA NÃO TIVER SABORES DIVIDOS */
    if (!this.props.meia) {
      // this.mudaListaProduto(rowID);

      /* ALTERA A LISTA VISUAL DE PRODUTOS */
      this.props.mudaListaProduto(
        this.props.produtos,
        rowID,
        this.props.textoQtde
      );

      /* ALTERA A LISTA DE PRODUTOS ESCOLHIDOS */
      this.props.mudaListaSelecionado(
        this.props.produtosEscolhidos,
        rowData,
        this.props.textoQtde,
        null
      );

      /* CALCULA VALOR TOTAL DO PEDIDO E ATUALIZA
       * PARA O COMPONENTE Pedido
       */
      let total = 0;
      for (let i = 0; i < this.props.produtosEscolhidos.length; i++) {
        total =
          total +
          this.props.produtosEscolhidos[i].qtdeEscolhido *
            this.props.produtosEscolhidos[i].preco;
      }

      this.props.mudaTotalPedido(total);
      /* ================================ */
    } else {
      /* SE A PIZZA TIVER SABORES DIVIDOS */
      /* SE AINDA NÃO TIVER ESCOLHIDO O PRIMEIRO SABOR */
      if (this.props.meiaData.preco == 0) {
        const meiaData = {
          nome: rowData.nome,
          preco: rowData.preco
        };
        this.props.mudaMeiaData(meiaData);

        /* APÓS A ESCOLHA, ALTERA A LISTA VISUAL INDICANDO QUE ESCOLHEU */
        this.props.mudaListaProduto(
          this.props.produtos,
          rowID,
          this.props.textoQtde,
          true
        );
      } else {
        /* SE AINDA NÃO TIVER ESCOLHIDO O PRIMEIRO SABOR */
        /* ALTERA A LISTA VISUAL DE PRODUTOS */
        this.props.mudaListaProduto(
          this.props.produtos,
          rowID,
          this.props.textoQtde,
          true
        );

        /* ALTERA A LISTA DE PRODUTOS ESCOLHIDOS */
        this.props.mudaListaSelecionado(
          this.props.produtosEscolhidos,
          rowData,
          this.props.textoQtde,
          this.props.meiaData
        );

        /* CALCULA VALOR TOTAL DO PEDIDO E ATUALIZA
         * PARA O COMPONENTE Pedido
         */
        let total = 0;
        for (let i = 0; i < this.props.produtosEscolhidos.length; i++) {
          total =
            total +
            this.props.produtosEscolhidos[i].qtdeEscolhido *
              this.props.produtosEscolhidos[i].preco;
        }

        this.props.mudaTotalPedido(total);
        /* ================================ */
        const meiaData = {
          nome: `${this.props.meiaData.nome} + ${rowData.nome}`
        };
        this.props.mudaMeiaData(meiaData);

        this.props.mudaMeia(false);
      }
    }

    this.setState({
      dialog: false
    });

    switch (this.props.clientesRouter) {
      case "listaClientes":
        break;

      case "incluirPedido":
        break;
    }
  }

  /* ALTERANDO LINHA CASO TENHA JÁ TENHA SIDO SELECIONADA */
  changeRowSelected(selected) {
    /* SE FOR SELECIONADO SEM SER MEIA */
    if (selected == 1) {
      return <Text style={{ color: "green" }}>produto escolhido</Text>;
    } else if (selected == 2) {
      /* SE FOR SELECIONADO SENDO MEIA */
      return (
        <Text style={{ color: "green" }}>
          PRODUTO MEIA {this.props.meiaData.nome}
        </Text>
      );
    } else {
      return;
    }
  }

  renderRow(rowData) {
    let total = 0;

    /* CALCULANDO TOTAL DA COMPRA */
    for (let i = 0; i < this.props.produtosEscolhidos.length; i++) {
      total =
        total +
        this.props.produtosEscolhidos[i].qtdeEscolhido *
          this.props.produtosEscolhidos[i].preco;
    }

    /* ALTERANDO VALOR TOTAL DO PEDIDO VIA REDUX
     *  PARA O COMPONENTE Pedido */

    this.props.mudaTotalPedido(total);

    return (
      <TouchableHighlight
        underlayColor="#ddd"
        onPress={() => {
          console.log(this.props.meia);
          /* SE A PIZZA NÃO ESTIVER SELECIONADO */
          if (this.props.produtos[rowData.index].selecionado == 0) {
            /* SE A PIZZA TIVER SABORES DIVIDOS */
            if (this.props.meia) {
              this.selecionaProduto(rowData.item, rowData.index);
            } else {
              if (this.props.produtos[rowData.index].selecionado == 2) {
              } else {
                this.setState({
                  dialog: true,
                  rowID: rowData.index,
                  rowData: rowData.item
                });
              }
            }
          } else {
            /* SE A PIZZA JÁ ESTIVER SELECIONADA */
            this.setState({
              dialogToDelete: true,
              rowID: rowData.index,
              rowData: rowData.item
            });
          }
        }}
      >
        <View
          style={{
            padding: 15,
            borderBottomWidth: 3,
            borderBottomColor: "#ddd"
          }}
        >
          <Image
            style={{ width: 100, height: 100 }}
            source={{ uri: rowData.item.foto }}
          />
          <Text>{rowData.item.nome}</Text>
          <Text>R${rowData.item.preco}</Text>

          {/* ALTERANDO LINHA CASO TENHA JÁ TENHA SIDO SELECIONADA */}
          <Text>{this.changeRowSelected(rowData.item.selecionado)}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <View>
        <Dialog.Container visible={this.state.dialog}>
          <Dialog.Title>Quantidade do produto</Dialog.Title>

          <TextInput
            placeholder="Quantidade"
            onChangeText={t => this.props.mudaTextoQuantidade(t)}
            keyboardType="numeric"
          />
          <TouchableHighlight
            style={{
              borderColor: this.props.meia ? "#2eb82e" : "red",
              borderWidth: 2,
              borderRadius: 20,
              paddingTop: 10,
              paddingBottom: 10
            }}
            onPress={() =>
              // this.setState({ meia: this.props.meia ? false : true })
              {
                const meia = this.props.meia ? false : true;
                this.props.mudaMeia(meia);
              }
            }
            underlayColor="#ddd"
          >
            <Text style={{ textAlign: "center" }}>Meia?</Text>
          </TouchableHighlight>

          <Dialog.Button
            label="Cancel"
            onPress={() => this.setState({ dialog: false })}
          />
          <Dialog.Button
            label="Confirmar"
            onPress={() => {
              if (this.props.textoQtde != "") {
                this.selecionaProduto(this.state.rowData, this.state.rowID);
              } else {
                this.setState({ dialog: false });
              }
            }}
          />
        </Dialog.Container>

        <Dialog.Container visible={this.state.dialogToDelete}>
          <Dialog.Title>Remover do pedido?</Dialog.Title>
          <Dialog.Description>
            Você tem certeza que quer retirar este produto da lista?
          </Dialog.Description>
          <Dialog.Button
            label="Cancel"
            onPress={() => this.setState({ dialogToDelete: false })}
          />

          <Dialog.Button
            label="Novo Produto"
            onPress={() => this.setState({ dialogToDelete: false, dialog: true })}
          />

          <Dialog.Button
            label="Remover"
            onPress={() => {
              this.props.mudaListaProduto(
                this.props.produtos,
                this.state.rowID
              );
              this.props.produtosEscolhidos.splice(this.state.rowID, 1);
              this.setState({
                dialogToDelete: false
              });
            }}
          />
        </Dialog.Container>

        <FlatList
          extraData={this.state}
          data={this.props.produtos}
          renderItem={(item, index) => this.renderRow(item, index)}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    produtos: state.AppReducer.produtos,
    produtosEscolhidos: state.AppReducer.produtosEscolhidos,
    ds: state.AppReducer.ds,
    textoQtde: state.AppReducer.textoQtde,
    meia: state.AppReducer.meia,
    meiaData: state.AppReducer.meiaData
  };
};

export default connect(
  mapStateToProps,
  {
    buscarClientes,
    mudaListaProduto,
    mudaListaSelecionado,
    cloneWithRowProdutos,
    mudaTextoQuantidade,
    mudaTotalPedido,
    buscarListaDeProdutos,
    mudaMeia,
    mudaMeiaData
  }
)(Produtos);
