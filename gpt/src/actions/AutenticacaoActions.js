import Axios from "axios";
import {
  URL,
  MODIFICA_EMAIL_CADASTRO,
  MODIFICA_SENHA_CADASTRO,
  LOGIN_EM_ANDAMENTO,
  AUTENTICAR_USUARIO_ERRO,
  AUTENTICAR_USUARIO_SUCESSO
} from "../actions/types";
import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from "react-native"


export const modificaEmailCadastro = texto => ({
  type: MODIFICA_EMAIL_CADASTRO,
  payload: texto
});

export const modificaSenhaCadastro = texto => ({
  type: MODIFICA_SENHA_CADASTRO,
  payload: texto
});

export const autenticarUsuario = ({ email, senha }) => {
  return dispatch => {
    dispatch({
      type: LOGIN_EM_ANDAMENTO
    });

    Axios.post(`${URL}login`, { email, password: senha })
    .then(res => {
      console.log(res);
      autenticarUsuarioSucesso(dispatch, res.data.token, res.data.perfil)
    })
    .catch(erro => {
      console.log(erro);
      autenticarUsuarioErro(erro, dispatch)
    });

    // firebase
    //   .auth()
    //   .signInWithEmailAndPassword(email, senha)
    //   .then(user => autenticarUsuarioSucesso(dispatch, email, senha))
    //   .catch(erro => autenticarUsuarioErro(erro, dispatch));
  };
};

const autenticarUsuarioErro = (erro, dispatch) => {
  dispatch({
    type: AUTENTICAR_USUARIO_ERRO,
    payload: erro.message
  });
};

const autenticarUsuarioSucesso = (dispatch, token, perfil) => {
  _storeData(token, perfil);

  Axios.defaults.headers.common['Authorization'] = `bearer ${token}`;
  dispatch({
    type: AUTENTICAR_USUARIO_SUCESSO
  });
  Actions.HomeVendedor();
};

_storeData = async (token, perfil) => {
  try {
    let uid = {
      token,
      perfil
    }
    await AsyncStorage.setItem("token", JSON.stringify(uid));
    
  } catch (error) {
    // Error saving data
    console.log(error);
  }
};
