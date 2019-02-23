module.exports = app => {
  function existsOrError(value, msg) {
    if (!value) throw msg;
    if (Array.isArray(value) && value.length === 0) throw msg;
    if (typeof value === "string" && !value.trim()) throw msg;
  }

  function notExistsOrError(value, msg) {
    try {
      existsOrError(value, msg);
    } catch (msg) {
      return;
    }
    throw msg;
  }

  function equalsOrError(valueA, valueB, msg) {
    if (valueA !== valueB) throw msg;
  }

  function validateEmail(value, msg) {
    usuario = value.substring(0, value.indexOf("@"));
    dominio = value.substring(value.indexOf("@") + 1, value.length);

    if (
      usuario.length >= 1 &&
      dominio.length >= 3 &&
      usuario.search("@") == -1 &&
      dominio.search("@") == -1 &&
      usuario.search(" ") == -1 &&
      dominio.search(" ") == -1 &&
      dominio.search(".") != -1 &&
      dominio.indexOf(".") >= 1 &&
      dominio.lastIndexOf(".") < dominio.length - 1
    ) {
    } else {
      throw msg;
    }
  }

  function validateCPF(strCPF) {
    var Soma;
    var Resto;
    Soma = 0;
    if (strCPF == "00000000000") return false;

    for (i = 1; i <= 9; i++)
      Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if (Resto == 10 || Resto == 11) Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10))) return false;

    Soma = 0;
    for (i = 1; i <= 10; i++)
      Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if (Resto == 10 || Resto == 11) Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11))) return false;
    return true;
  }

  function validateCardNumber(inputtxt, bandeira) {
    //MasterCard
    if (bandeira === "MasterCard") {
      var MasterCardno = /^(?:5[1-5][0-9]{14})$/;
      if (inputtxt.match(MasterCardno)) {
        return true;
      } else {
        let msg = "Este não é um número válido de cartão MasterCard";
        throw msg;
      }
    }

    //Visa
    if (bandeira === "Visa") {
      var VisaCardno = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
      if (inputtxt.match(VisaCardno)) {
        return true;
      } else {
        let msg = "Este não é um número válido de cartão MasterCard";
        throw msg;
      }
    }
  }

  return {
    existsOrError,
    notExistsOrError,
    equalsOrError,
    validateEmail,
    validateCPF,
    validateCardNumber
  };
};
