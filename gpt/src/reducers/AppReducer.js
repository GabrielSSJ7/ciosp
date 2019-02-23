import {
  BUSCA_CLIENTES_SUCESSO,
  MUDA_DATA_ENTREGA,
  MUDA_TIPO_PAGAMENTO,
  MUDA_TOTAL_PEDIDO,
  MUDA_OBS,
  MUDA_LISTA_SELECIONADO,
  MUDA_LISTA_PRODUTO,
  CLONE_WITH_ROW,
  MUDA_TEXTO_QUANTIDADE,
  BUSCA_PRODUTOS_SUCESSO,
  MUDA_CONTATO,
  MUDA_ENTREGA_BALCAO,
  MUDA_NOME_CLIENTE,
  MUDA_MEIA,
  MUDA_MEIA_DATA
} from "../actions/types";

import { ListView } from "react-native";

const INITIAL_STATE = {
  clientes: [],
  tipoDePagamento: 1,
  entregaBalcao: 1,
  dataDeEntrega: "01-02-2019",
  nomeCliente: "",
  totalPedido: 0,
  obs: "",
  produtos: [],
  contato: "",
  produtosEscolhidos: [],
  ds: new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2
  }),
  textoQtde: "",
  meia: false,
  meiaData: { nome: "", preco: 0 }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case BUSCA_CLIENTES_SUCESSO:
      return { ...state, clientes: action.payload };
    case MUDA_TIPO_PAGAMENTO:
      return { ...state, tipoDePagamento: action.payload };
    case MUDA_ENTREGA_BALCAO:
      return { ...state, entregaBalcao: action.payload };
    case MUDA_DATA_ENTREGA:
      return { ...state, dataDeEntrega: action.payload };
    case MUDA_TOTAL_PEDIDO:
      return { ...state, totalPedido: action.payload };
    case MUDA_OBS:
      return { ...state, obs: action.payload };

    case MUDA_NOME_CLIENTE:
      return { ...state, nomeCliente: action.payload };

    case MUDA_CONTATO:
      return { ...state, contato: action.payload };

    case MUDA_LISTA_PRODUTO:
      return { ...state, produtos: action.payload };

    case MUDA_LISTA_SELECIONADO:
      return { ...state, produtosEscolhidos: action.payload };

    case CLONE_WITH_ROW:
      return { ...state, ds: action.payload };

    case MUDA_TEXTO_QUANTIDADE:
      return { ...state, textoQtde: action.payload };

    case BUSCA_PRODUTOS_SUCESSO:
      return { ...state, produtos: action.payload };

      case MUDA_MEIA:
      return { ...state, meia: action.payload };

      case MUDA_MEIA_DATA:
      return { ...state, meiaData: action.payload };

    default:
      return state;
  }
};
