import React, { Component, CameraRoll } from "react";
import { View, Text, Image, Button, TextInput, ScrollView } from "react-native";
import ImagePicker from "react-native-image-picker";
import { Actions } from "react-native-router-flux";

export default class Cliente extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Edit: false,
      avatarSource: ""
    };
  }

  async pickImage() {
    const options = {
      title: "Select Avatar"
    };
    console.log(ImagePicker);
    ImagePicker.showImagePicker(options, response => {});
  }

  renderizaBtnSelecionaCliente() {
    console.log(this.props.incluirPedido);
    return this.props.incluirPedido ? (
      <Button
        title="Selecionar este cliente"
        onPress={() => this.navegaParaPedido()}
      />
    ) : null;
  }

  navegaParaPedido() {
    Actions.pedido({
      nome: this.props.nome,
      endereco: this.props.endereco,
      numero: this.props.numero,
      bairro: this.props.bairro,
      cidade: this.props.cidade,
      cep: this.props.cep,
      telefone: this.props.telefone,
      cpf_cnpj: this.props.cpf_cnpj,
      ins_estadual: this.props.ins_estadual,
      email: this.props.email,
      obs: this.props.obs,
      foto: this.props.foto
    });
  }

  render() {
    if (this.state.Edit) {
      return (
        <View>
          <ScrollView>
            <Button
              onPress={() => {
                this.pickImage();
              }}
              title="selecionar imagem"
            />
            <TextInput value={this.props.nome} />
            <TextInput value={this.props.endereco} />
            <TextInput value={this.props.numero} />
            <TextInput value={this.props.bairro} />
            <TextInput value={this.props.cidade} />
            <TextInput value={this.props.cep} />
            <TextInput value={this.props.telefone} />
            <TextInput value={this.props.cpf_cnpj} />
            <TextInput value={this.props.ins_estadual} />
            <TextInput value={this.props.email} />
            <TextInput value={this.props.obs} numberOfLines={5} />
          </ScrollView>
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1, padding: 10, backgroundColor: "#fff" }}>
          <Image
            style={{ width: 150, height: 150 }}
            source={{ uri: this.props.foto }}
          />
          <Text>{this.props.nome}</Text>
          <Text>
            {this.props.endereco} {this.props.numero}, {this.props.bairro} -{" "}
            {this.props.cidade}, {this.props.cep}
          </Text>
          <Text>Telefone: {this.props.telefone}</Text>
          <Text>CPF/CNPJ: {this.props.cpf_cnpj}</Text>
          <Text>Ins. estadual: {this.props.ins_estadual}</Text>
          <Text>E-mail: {this.props.email}</Text>
          <Text>Observações</Text>
          <Text>{this.props.obs}</Text>
          <View style={{ marginBottom: 10}}>
            <Button
              title="Editar"
              onPress={() => {
                this.setState({ Edit: true });
              }}
            />
          </View>

          {this.renderizaBtnSelecionaCliente()}
        </View>
      );
    }
  }
}
