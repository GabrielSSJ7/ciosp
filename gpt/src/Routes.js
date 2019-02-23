import React, { Component } from  'react';
import { View} from 'react-native';
import { Router, Scene, Stack, Actions } from 'react-native-router-flux';

import Login from './components/Login'
import HomeVendedor from './components/HomeVendedor';
import Clientes from './components/Clientes';
import Cliente from './components/Cliente';
import Pedido from './components/Pedido';
import ConfirmaPedido from './components/ConfirmaPedido';
import Produtos from './components/Produtos';


export default class Routes extends Component {
   render() {
        return (
        <Router navigationBarStyle={{ backgroundColor: "#2eb82e" }}
            titleStyle={{ color: "#fff" }}>
            <Stack>
                <Scene key="login" component={Login} hideNavBar={true} initial />
                <Scene key="HomeVendedor" component={HomeVendedor}  renderLeftButton={<View />} />
                <Scene key="clientes" component={Clientes} />
                <Scene key="cliente" component={Cliente} />
                <Scene key="pedido" component={Pedido} />
                <Scene key="confirmapedido" component={ConfirmaPedido} />
                <Scene key="produtos" component={Produtos} />
            </Stack>
        </Router> 
        );
    }
}

