import React, { Component } from "react";
import { View, Text, ListView, TouchableHighlight, Image } from "react-native";
import { AsyncStorage } from "react-native";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";

import { buscarClientes } from "../actions/AppActions";

class Clientes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      })
    };
  }
  componentDidMount() {
    this.props.buscarClientes();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.clientes !== prevProps.clientes) {
      //prevProps.gastosFetch();
      //this.preencheListViewGasto(prevProps.dadosGastos);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.props.clientes)
      });
    }
  }

  selecionaCliente(rowData) {
    switch (this.props.clientesRouter) {
      case "listaClientes":
        //alert('apenas listar');
        Actions.cliente({
          nome: rowData.nome,
          endereco: rowData.endereco,
          numero: rowData.numero,
          bairro: rowData.bairro,
          cidade: rowData.cidade,
          cep: rowData.cep,
          telefone: rowData.telefone,
          cpf_cnpj: rowData.cpf_cnpj,
          ins_estadual: rowData.ins_estadual,
          email: rowData.email,
          obs: rowData.obs,
          foto: rowData.foto,
          incluirPedido: false
        });
        break;

      case "incluirPedido":
        Actions.cliente({
          nome: rowData.nome,
          endereco: rowData.endereco,
          numero: rowData.numero,
          bairro: rowData.bairro,
          cidade: rowData.cidade,
          cep: rowData.cep,
          telefone: rowData.telefone,
          cpf_cnpj: rowData.cpf_cnpj,
          ins_estadual: rowData.ins_estadual,
          email: rowData.email,
          obs: rowData.obs,
          foto: rowData.foto,
          incluirPedido: true
        });
        break;
    }
  }

  renderRow(rowData, rowID) {
    return (
      <TouchableHighlight
        underlayColor="#ddd"
        onPress={() => {
          this.selecionaCliente(rowData);
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
            style={{ width: 50, height: 50 }}
            source={{ uri: rowData.foto }}
          />
          <Text>{rowData.nome}</Text>
          <Text>{rowData.endereco}</Text>
          <Text>{rowData.bairro}</Text>
          <Text>{rowData.cidade}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <View>
        <ListView
          enableEmptySections
          dataSource={this.state.dataSource}
          renderRow={(rowData, sectionID, rowID, higlightRow) =>
            this.renderRow(rowData, rowID)
          }
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    clientes: state.AppReducer.clientes
  };
};

export default connect(
  mapStateToProps,
  { buscarClientes }
)(Clientes);
