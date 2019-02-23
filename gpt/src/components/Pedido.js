import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  Image,
  Picker,
  TextInput,
  ScrollView,
  TouchableHighlight,
  StyleSheet
} from "react-native";
import DatePicker from "react-native-datepicker";
import Dialog from "react-native-dialog";
import { connect } from "react-redux";
import {
  mudaDataEntrega,
  mudaObs,
  mudaTotalPedido,
  mudatipoPagamento,
  mudaContato,
  mudaEntregaBalcao,
  mudaNomeCliente
} from "../actions/AppActions";
import { Actions } from "react-native-router-flux";

import { authStyle as styles } from "../css/styles";

class Pedido extends Component {
  constructor(props) {
    super(props);
    this.state = { date: "2019-02-01", dialog: false };
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          padding: 5,
          backgroundColor: "#fff"
        }}
      >
        <ScrollView>
          {/* <Image
            source={{ uri: this.props.foto }}
            style={{ height: 80, width: 80 }}
          /> */}
          {/* <Text>{this.props.nome}</Text> */}

          <TouchableHighlight
            style={style.IncluirNovoProduto}
            underlayColor="#ddd"
            onPress={() => {
              Actions.produtos();
            }}
          >
            <Text style={style.TextoBase}>INCLUIR NOVO PRODUTO</Text>
          </TouchableHighlight>

          <Text style={[style.TextoBase]}>Total do pedido:</Text>
          <Text style={[style.TextoBase, style.TextoTotalPedido]}>
            R${this.props.totalPedido}
          </Text>

          <Text style={[style.TextoBase, style.TextoTipoPagamento]}>
            Tipo de pagamento
          </Text>

          <Picker
            selectedValue={this.props.tipoDePagamento}
            value={this.props.tipoDePagamento}
            style={style.picker}
            itemStyle={style.pickerItem}
            onValueChange={(itemValue, itemIndex) =>
              this.props.mudatipoPagamento(itemValue)
            }
          >
            <Picker.Item label="A VISTA" value={1} />
            <Picker.Item label="Crédito" value={2} />
            <Picker.Item label="Débito" value={3} />
          </Picker>

          <Text style={[style.TextoBase, style.TextoTipoPagamento]}>
            Entrega ou Balcão?
          </Text>

          <Picker
            selectedValue={this.props.entregaBalcao}
            value={this.props.entregaBalcao}
            style={style.picker}
            itemStyle={style.pickerItem}
            onValueChange={(itemValue, itemIndex) =>
              this.props.mudaEntregaBalcao(itemValue)
            }
          >
            <Picker.Item label="Entrega" value={1} />
            <Picker.Item label="Balcão" value={2} />
          </Picker>
          {/* <Text>Data de entrega</Text>
          <DatePicker
            style={{ width: 200 }}
            date={this.props.dataDeEntrega}
            mode="date"
            placeholder="Selecione a data"
            format="DD-MM-YYYY"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: "absolute",
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36
              }
              // ... You can check the source to find the other keys.
            }}
            onDateChange={date => {
              this.props.mudaDataEntrega(date);
            }}
          /> */}
          <View style={{ flexDirection: "row", flex: 1 }}>
            <View style={{ flex: 1 }}>
              <Text style={style.TextoBaseNotCenter}>Nome:</Text>

              <TextInput
                underlineColorAndroid="#2eb82e"
                autoCapitalize="none"
                style={{
                  textAlignVertical: "top",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#fff",
                  borderColor: "#2eb82e",
                  borderRadius: 2,
                  borderWidth: 1,
                  fontSize: 19
                }}
                onChangeText={e => this.props.mudaNomeCliente(e)}
                value={this.props.nomeCliente}
              />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={style.TextoBaseNotCenter}>Contato:</Text>

              <TextInput
                underlineColorAndroid="#2eb82e"
                autoCapitalize="none"
                style={{
                  textAlignVertical: "top",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#fff",
                  borderColor: "#2eb82e",
                  borderRadius: 2,
                  borderWidth: 1,
                  fontSize: 19
                }}
                keyboardType="numeric"
                onChangeText={e => this.props.mudaContato(e)}
                value={this.props.contato}
              />
            </View>
          </View>

          <Text style={style.TextoBaseNotCenter}>Observações</Text>

          <TextInput
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            style={{
              textAlignVertical: "top",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#fff",
              borderColor: "#2eb82e",
              borderRadius: 2,
              borderWidth: 1,
              marginBottom: 5
            }}
            numberOfLines={6}
            value={this.props.obs}
            onChangeText={t => this.props.mudaObs(t)}
          />

          <Button
            title="Finalizar pedido"
            onPress={() =>
              Actions.confirmapedido({
                nome: this.props.nome,
                foto: this.props.foto
              })
            }
          />

          {/* <Dialog.Container visible={this.state.dialog}>
          <Dialog.Title>Confira o pedido</Dialog.Title>
          <Dialog.Description>
            <Text>{this.props.nome}</Text>
            <Text>Lista com os pedidos</Text>
            <Text>Tipo de pagamento: a vista</Text>
            <Text>Entrega: {this.state.date}</Text>
          </Dialog.Description>
          <Dialog.Button label="Cancelar" onPress={()=> this.setState({ dialog: false})} />
          <Dialog.Button label="Confirmar" />
        </Dialog.Container> */}
        </ScrollView>
      </View>
    );
  }
}

const style = StyleSheet.create({
  IncluirNovoProduto: {
    padding: 20,
    borderColor: "#2eb82e",
    borderWidth: 2,
    borderRadius: 20
  },
  TextoBase: {
    paddingTop: 10,
    textAlign: "center",
    fontWeight: "bold"
  },

  TextoBaseNotCenter: {
    paddingTop: 10,
    fontSize: 16,
    fontWeight: "bold"
  },

  TextoTotalPedido: {
    fontSize: 25,
    color: "#1a75ff"
  },

  TextoTipoPagamento: {
    fontSize: 20,
    color: "#2eb82e"
  },

  picker: {
    alignSelf: "auto"
  },
  pickerItem: {
    color: "red"
  }
});

mapStateToProps = state => {

  return {
    listaDeProdutos: state.AppReducer.listaDeProdutos,
    tipoDePagamento: state.AppReducer.tipoDePagamento,
    dataDeEntrega: state.AppReducer.dataDeEntrega,
    obs: state.AppReducer.obs,
    contato: state.AppReducer.contato,
    totalPedido: state.AppReducer.totalPedido,
    entregaBalcao: state.AppReducer.entregaBalcao,
    nomeCliente: state.AppReducer.nomeCliente
  };
};

export default connect(
  mapStateToProps,
  {
    mudaDataEntrega,
    mudaObs,
    mudaTotalPedido,
    mudatipoPagamento,
    mudaContato,
    mudaEntregaBalcao,
    mudaNomeCliente
  }
)(Pedido);
