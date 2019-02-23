import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  MainContainer: {
    flex: 11,
    backgroundColor: "#f0ede9"
  },
  masker: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,.6)",
    zIndex: 100
  },
  container: {
    alignSelf: "center",
    width: "75%",
    marginTop: 150,
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden"
  },
  title: {
    textAlign: "center",
    paddingTop: 13,
    paddingHorizontal: 6,
    fontSize: 15,
    color: "#777",
    fontWeight: "bold",
    lineHeight: 20,
    marginBottom: 10
  },
  input: {
    paddingVertical: 0,
    paddingHorizontal: 8,
    height: 34,
    backgroundColor: "#eee",
    marginVertical: 10,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: "#ccc",
    fontSize: 15
  },
  btn_container: {
    flexDirection: "row",
    borderTopWidth: 0.5,
    borderColor: "#ddd",
    marginTop: 10
  },
  btn: {
    width: "50%",
    textAlign: "center",
    fontWeight: "bold",
    paddingVertical: 12
  }
});

export const authStyle = StyleSheet.create({
  FBbutton: {
    backgroundColor: "#3B5998",
    padding: 8,
    alignItems: "center",
    elevation: 3,
    marginTop: 3
  },

  FBbuttonText: {
    color: "white"
  },
  btnEntrar: {
    padding: 15,
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    backgroundColor: "#148fb8"
  },

  TextInput: {
    flex: 1
  },

  viewTextInput: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#8dd8f2",
    height: 40,
    borderRadius: 2,
    marginBottom: 25
  },

  emailIcon: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: "stretch",
    alignItems: "center"
  }
});

export const principalTopStyle = StyleSheet.create({
  rootView: {
    flex: 2,
    flexDirection: "column",
    alignItems: "flex-start",
    backgroundColor: "#fff",
    paddingTop: 15,
    paddingLeft: 8
  },

  TextoRendaFixa: {
    fontSize: 13,
    color: "#2cc5f9",
    textAlign: "center",
    fontWeight: "bold"
  },

  ValorRendaFixa: {
    fontSize: 19,
    color: "#3e4b54",
    marginTop: 10
  },

  TextoSaldoAtual: {
    fontSize: 13,
    color: "#2cc5f9",
    fontWeight: "bold",
    marginTop: 30
  },

  ValorSaldoAtual: {
    fontSize: 19,
    color: "#3e4b54",
    marginTop: 10
  }
});

export const bodyPrincipalStyle = StyleSheet.create({
  rootView: {
    flex: 4,
    backgroundColor: "#fff",
    marginTop: 10
  },

  TextoGastoMes: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 5
  },

  TotalGastoMes: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#2cc5f9",
    paddingBottom: 5
  },

  ViewRootRenderRow: {
    flex: 1,
    padding: 10,
    borderBottomWidth: 2,
    borderColor: "#2cc5f9"
  },

  imgRenderRow: {
    width: 24,
    height: 24
  },

  imgRenderRowSmall: {
    width: 18,
    height: 18
  },

  itemRenderRow: {
    fontSize: 18,
    flex: 3,
    paddingLeft: 10,
    fontWeight: "bold"
  },

  valorDateRenderRow: {
    fontSize: 18,
    paddingRight: 10,
    paddingLeft: 10
  }
});
