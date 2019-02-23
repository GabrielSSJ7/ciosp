import React, { Component } from "react";
import {
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Text,
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
  Keyboard
} from "react-native";

import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import firebase from "firebase";
import {
  autenticarUsuario,
  modificaEmailCadastro,
  modificaSenhaCadastro,
  loginWithFacebook
} from "../actions/AutenticacaoActions";
import { AsyncStorage } from "react-native";

import { authStyle as styles } from "./../css/styles";

class Login extends Component {
  constructor(props) {
    super(props);
    console.log("constructor")
    this.state = { erro: "" };
  }

  componentDidMount() {
    console.log("did mount")
    AsyncStorage.getItem("token")
      .then(d => {
        console.log("Token", d);
        if (d == null) {
          AsyncStorage.removeItem("token");
          return;
        } else {
          const j = JSON.parse(d);
          switch(j.perfil) {
            case "vendedor":
              Actions.HomeVendedor();
            break;

            default: break;
          }
        }
      })
      .catch(erro => {
        console.error(erro);
      });
  }

  _autenticarUsuario() {
    const { email, senha } = this.props;

    if (email && senha) this.props.autenticarUsuario({ email, senha });
    else this.setState({ erro: "Você deixou de preencher os campos." });
  }

  onFBButtonPress() {
    this.props.loginWithFacebook();
  }

  renderBtn() {
    if (!this.props.login_em_andamento) {
      return (
        <TouchableHighlight
          onPress={() => {
            Keyboard.dismiss();
            this._autenticarUsuario();
          }}
        >
          <Text style={styles.btnEntrar}>Login</Text>
        </TouchableHighlight>
      );
    } else {
      return <ActivityIndicator size="large" />;
    }
  }

  render() {
    console.log("render")
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          padding: 20,
          backgroundColor: "#50c4eb"
        }}
      >
        <View style={styles.viewTextInput}>
          <Image
            source={require("../images/email-icon.png")}
            style={styles.emailIcon}
          />
          <TextInput
            placeholder="E-mail"
            onChangeText={texto => this.props.modificaEmailCadastro(texto)}
            style={styles.TextInput}
            placeholderTextColor="#fff"
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            value={this.props.email}
          />
        </View>

        <View style={styles.viewTextInput}>
          <Image
            source={require("../images/key.png")}
            style={styles.emailIcon}
          />
          <TextInput
            secureTextEntry={true}
            placeholder="Senha"
            onChangeText={texto => this.props.modificaSenhaCadastro(texto)}
            style={styles.TextInput}
            placeholderTextColor="#fff"
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            value={this.props.senha}
          />
        </View>
        <View>{this.renderBtn()}</View>
      </View>
    );
  }
}

const mapsStateToProps = state => {
  
  return {
    autenticar_usuario_txt_erro:
      state.AutenticacaoReducer.autenticar_usuario_txt_erro,
    email: state.AutenticacaoReducer.email,
    senha: state.AutenticacaoReducer.senha,
    login_em_andamento: state.AutenticacaoReducer.login_em_andamento
  };
};

export default connect(
  mapsStateToProps,
  {
    autenticarUsuario,
    modificaEmailCadastro,
    modificaSenhaCadastro,
    loginWithFacebook
  }
)(Login);
