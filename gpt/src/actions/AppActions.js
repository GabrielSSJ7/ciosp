import Axios from "axios";
import {
  URL,
  BUSCA_CLIENTES_SUCESSO,
  MUDA_TIPO_PAGAMENTO,
  MUDA_DATA_ENTREGA,
  MUDA_TOTAL_PEDIDO,
  MUDA_OBS,
  MUDA_LISTA_PRODUTO,
  MUDA_LISTA_SELECIONADO,
  MUDA_TEXTO_QUANTIDADE,
  CLONE_WITH_ROW,
  BUSCA_PRODUTOS_SUCESSO,
  MUDA_CONTATO,
  MUDA_ENTREGA_BALCAO,
  MUDA_NOME_CLIENTE,
  MUDA_MEIA,
  MUDA_MEIA_DATA
} from "./types";
import { AsyncStorage } from "react-native";

export const buscarClientes = () => {
  return dispatch => {
    AsyncStorage.getItem("token").then(d => {
      const j = JSON.parse(d);
      const instance = Axios.create({
        headers: { Authorization: `bearer ${j.token}` }
      });
      instance
        .get(`${URL}buscarclientes`)
        .then(res => {
          console.log(res.data);

          dispatch({
            type: BUSCA_CLIENTES_SUCESSO,
            payload: res.data
          });
        })
        .catch(erro => {
          console.error(erro);
        });
    });
  };
};

export const mudatipoPagamento = value => {
  return {
    type: MUDA_TIPO_PAGAMENTO,
    payload: value
  };
};

export const mudaEntregaBalcao = value => {
  return {
    type: MUDA_ENTREGA_BALCAO,
    payload: value
  };
};

export const mudaDataEntrega = value => {
  return {
    type: MUDA_DATA_ENTREGA,
    payload: value
  };
};

export const mudaTotalPedido = value => {
  return {
    type: MUDA_TOTAL_PEDIDO,
    payload: value
  };
};

export const mudaObs = value => {
  return {
    type: MUDA_OBS,
    payload: value
  };
};

export const mudaNomeCliente = value => {
  return {
    type: MUDA_NOME_CLIENTE,
    payload: value
  };
};

export const mudaContato = value => {
  return {
    type: MUDA_CONTATO,
    payload: value
  };
};

export const mudaMeia = value => {
  return {
    type: MUDA_MEIA,
    payload: value
  };
};


export const mudaMeiaData = value => {
  return {
    type: MUDA_MEIA_DATA,
    payload: value
  };
};


/* ALTERA A LISTA VISUAL DE PRODUTOS */
export const mudaListaProduto = (lista, id, qtde, meia) => {
  /* SE A PIZZA NÃO TIVER SABORES DIVIDOS */
  if (!meia) {
    /* SE A PIZZA NÃO ESTIVER SELECIONADO */
    if (lista[id].selecionado === 0) {

      if (lista[id].qtde > qtde) {
        lista[id].selecionado = 1;

        lista[id].qtde = parseInt(lista[id].qtde) - parseInt(qtde);
      
      }
    } else {
      lista[id].selecionado = 0;
      lista[id].qtde = lista[id].qtde + qtde;
    }
  } else {
  /* SE A PIZZA TIVER SABORES DIVIDOS */
    /* SE A PIZZA NÃO ESTIVER SELECIONADO */
    if (lista[id].selecionado === 0) {
      if (lista[id].qtde > qtde) {
        lista[id].selecionado = 2;

        lista[id].qtde = parseInt(lista[id].qtde) - parseInt(qtde);
        console.log(lista[id].qtde);
      }
    } else {
      lista[id].selecionado = 0;
      lista[id].qtde = lista[id].qtde + qtde;
    }
  }

  //cloneWithRowProdutos(ds, lista);

  return {
    type: MUDA_LISTA_PRODUTO,
    payload: lista
  };
};

/* ALTERA A LISTA DE PRODUTOS ESCOLHIDOS */
export const mudaListaSelecionado = (lista, value, qtde, meia) => {
  if (meia != null) {
    const novoNome = `${meia.nome} + ${value.nome}`;
    let novoPreco = 0;

    
    
    if (parseFloat(meia.preco) > parseFloat(value.preco)) {
      console.log("meia", meia.preco)
      novoPreco = meia.preco;
    } else {
      console.log("value", value.preco)
      novoPreco = value.preco;
    }

    value = {
      nome: novoNome,
      preco: novoPreco,
      qtdeEscolhido: qtde,
      meia: true
    };

    lista.push(value);
    totalPedido(lista);
    console.log("mudaListaSelecionado", lista);
    return {
      type: MUDA_LISTA_SELECIONADO,
      payload: lista
    };
  }

  value = { ...value, qtdeEscolhido: qtde, meia: false };
  lista.push(value);
  totalPedido(lista);
  return {
    type: MUDA_LISTA_SELECIONADO,
    payload: lista
  };
};

export const totalPedido = lista => {
  let total = 0;
  for (let i = 0; i < lista.length; i++) {
    total = total + lista[i].qtde * lista[i].preco;
  }

  return {
    type: MUDA_TOTAL_PEDIDO,
    payload: total
  };
};

export const mudaTextoQuantidade = t => {
  //   if(isNaN(num)){
  //     document.write('não é')
  //  } else {
  //    document.write('é')
  //  }
  return {
    type: MUDA_TEXTO_QUANTIDADE,
    payload: t
  };
};

export const cloneWithRowProdutos = (ds, lista) => {
  ds = ds.cloneWithRows(lista);
  return {
    type: CLONE_WITH_ROW,
    payload: ds
  };
};

export const buscarListaDeProdutos = () => {
  return dispatch => {
    AsyncStorage.getItem("token").then(_ => {
      const j = JSON.parse(_);
      const instance = Axios.create({
        headers: { Authorization: `bearer ${j.token}` }
      });

      instance.get(`${URL}buscarprodutos`).then(res => {
        console.log(res);
        dispatch({ type: BUSCA_PRODUTOS_SUCESSO, payload: res.data });
      });
    });
  };
};
