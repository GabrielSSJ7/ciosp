import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  Image,
  Picker,
  TextInput,
  ScrollView,
  ListView
} from "react-native";
import DatePicker from "react-native-datepicker";
import Dialog from "react-native-dialog";
import { connect } from "react-redux";
import {
  mudaDataEntrega,
  mudaObs,
  mudaTotalPedido,
  mudatipoPagamento
} from "../actions/AppActions";

class ConfirmaPedido extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "2019-02-01",
      dialog: false,
      ds: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      })
    };
  }
  tipoDePagamento() {
    switch (this.props.tipoDePagamento) {
      case 1:
        return "A vista";

      case 3:
        return "Débito";

      case 2:
        return "Crédito";
    }
  }

  componentDidMount() {
    this.setState({
      ds: this.state.ds.cloneWithRows(this.props.produtosEscolhidos)
    })
  }

  renderRow(rowData) {
    return (
      <View style={{
        padding: 5,
        borderBottomWidth: 3,
        borderBottomColor: "#aaa",
        backgroundColor: "#fff"
      }}>
        <Text>Produto: {rowData.nome}</Text>
        <Text>Preço: {rowData.preco}</Text>
        <Text>Quantidade: {rowData.qtdeEscolhido}</Text>
      </View>
    )
  }
  render() {
    return (
      <View>
        <ScrollView>
          <Image
            source={{ uri: this.props.foto }}
            style={{ height: 80, width: 80 }}
          />
          <Text>{this.props.nome}</Text>

          <Text>Lista dos pedidos:</Text>
          <ListView
            enableEmptySections
            dataSource={this.state.ds}
            renderRow={rowData=>this.renderRow(rowData)}
           />

          <Text>Total do pedido:</Text>
          <Text>{this.props.totalPedido}</Text>

          <Text>Tipo de pagamento: {this.tipoDePagamento()}</Text>

          <Text>Data de entrega: {this.props.dataDeEntrega}</Text>

          <Text>Observações: {this.props.obs}</Text>

          <Button
            title="Finalizar pedido"
            onPress={() => this.setState({ dialog: true })}
          />
        </ScrollView>
      </View>
    );
  }
}

mapStateToProps = state => {
  console.log(state.AppReducer);
  return {
    produtosEscolhidos: state.AppReducer.produtosEscolhidos,
    tipoDePagamento: state.AppReducer.tipoDePagamento,
    dataDeEntrega: state.AppReducer.dataDeEntrega,
    obs: state.AppReducer.obs,
    totalPedido: state.AppReducer.totalPedido
  };
};

export default connect(
  mapStateToProps,
  { mudaDataEntrega, mudaObs, mudaTotalPedido, mudatipoPagamento }
)(ConfirmaPedido);
