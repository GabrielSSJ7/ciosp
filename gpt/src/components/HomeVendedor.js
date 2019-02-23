import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  BackHandler,
  ToastAndroid,
  TouchableHighlight,
  Image,
  StyleSheet
} from "react-native";
import { AsyncStorage } from "react-native";
import { Actions } from "react-native-router-flux";

const newPedido = require("../images/new.png");
const historico = require("../images/test.png");

export default class HomeVendedor extends Component {
  componentDidMount() {
    backButtonPressedOnceToExit = false;
    BackHandler.addEventListener("hardwareBackPress", () => {
      if (backButtonPressedOnceToExit) {
        BackHandler.exitApp();
      } else {
        if (
          Actions.currentScene !== "principal" &&
          Actions.currentScene !== "login"
        ) {
          Actions.pop();
          return true;
        } else {
          ToastAndroid.show("Aperte novamente para sair.", ToastAndroid.SHORT);
          backButtonPressedOnceToExit = true;
          //setting timeout is optional
          // setTimeout(() => {
          //   backButtonPressedOnceToExit = false;
          // }, 1000);
          return true;
        }
      }
    });
    //AsyncStorage.removeItem('token');
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress");
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "space-around",
          alignContent: "space-around",
          padding: 35,
          backgroundColor: "#fff"
        }}
      >
        <View style={{ flex: 1, flexDirection: "column" }}>
          <View style={{ flex: 1 }}>
            <TouchableHighlight
              style={style.Opt}
              onPress={() =>
                Actions.pedido({ clientesRouter: "incluirPedido" })
              }
              underlayColor="#ddd"
            >
              <View>
                <Image source={newPedido} style={style.ImageOpt} />
                <Text style={style.TextOpt}>INCLUIR NOVO PEDIDO</Text>
              </View>
            </TouchableHighlight>
          </View>

          <View style={{ flex: 1 }}>
            <TouchableHighlight
              style={style.Opt}
              onPress={() =>
                Actions.pedido({ clientesRouter: "incluirPedido" })
              }
              underlayColor="#ddd"
            >
              <View>
                <Image source={historico} style={style.ImageOpt} />
                <Text style={style.TextOpt}>HISTÓRICO DE PEDIDOS</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>

        {/* <Button
          onPress={() => Actions.clientes({ clientesRouter: "incluirPedido" })}
          title="Incluir Pedidos"
        /> */}
        {/* <Button
          onPress={() => Actions.clientes({ clientesRouter: "listaClientes" })}
          title="Clientes"
        /> */}
      </View>
    );
  }
}

const style = StyleSheet.create({
  TextOpt: {
    textAlign: "center",
    paddingTop: 10,
    fontWeight: "bold"
  },
  ImageOpt: {
    width: 100,
    height: 100,
    alignSelf: "center"
  },

  Opt: {
    borderColor: "#aaa",
    borderWidth: 5
  }
});
