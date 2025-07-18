export const validationType = {
  email: (email) => /^[^\s]+@[^\s]+\.[^\s]+$/.test(email),
  cnpj: (cnpj) => {
    let soma = 0;
    let resto;

    // Remove tudo que não for número
    // Entrada: "12.345.678/0001-95"
    // Saída: "12345678000195"
    let cnpjLimpo = String(cnpj).replace(/[^\d]/g, "");

    // Verifica se tem 14 dígitos
    if (cnpjLimpo.length !== 14) return false;

    // Verifica se todos os dígitos são iguais (ex: 00000000000000)
    if (/^(\d)\1{13}$/.test(cnpjLimpo)) return false;

    // Valida o primeiro dígito verificador
    let pesos1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    soma = 0;
    for (let i = 0; i < 12; i++) {
      soma += parseInt(cnpjLimpo.charAt(i)) * pesos1[i];
    }

    resto = soma % 11;
    let primeiroDigito = resto < 2 ? 0 : 11 - resto;

    if (parseInt(cnpjLimpo.charAt(12)) !== primeiroDigito) return false;

    // Valida o segundo dígito verificador
    let pesos2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    soma = 0;
    for (let i = 0; i < 13; i++) {
      soma += parseInt(cnpjLimpo.charAt(i)) * pesos2[i];
    }

    resto = soma % 11;
    let segundoDigito = resto < 2 ? 0 : 11 - resto;

    if (parseInt(cnpjLimpo.charAt(13)) !== segundoDigito) return false;

    // Se passou por todas as validações, o CNPJ é válido
    return true;
  },
  cpf: (cpf) => {
    let soma = 0;
    let resto;

    // Remove tudo que não for numero
    // Entrada: "123.456.789-09"
    // Saida: "12345678909"
    let cpfLimpo = String(cpf).replace(/[^\d]/g, "");

    // se não tiver 11 digitos CPF é invalido
    if (cpfLimpo.length !== 11) return false;

    // se for uma sequencia de números repetidos CPF é invalido
    if (/^(\d)\1{10}$/.test(cpfLimpo)) return false;

    // valida o primeiro digito verificador
    // percorre os 9 primeiros dígitos
    for (let i = 1; i <= 9; i++) {
      // extrai cada digito do cpf e multiplica de 10 até 2 em ordem decrescente
      // acumula o resultado dessa multiplicação na soma
      soma += parseInt(cpfLimpo.substring(i - 1, i)) * (11 - i);
    }

    // tira o resto da divisão da soma * 10, o resto deve receber o primeiro digito verificador
    resto = (soma * 10) % 11;

    // se o resto for 10 ou 11 resto deve ser 0 porque o digito vai de 0-9
    if (resto == 10 || resto == 11) resto = 0;

    // extrai o primeiro digito verificador
    const primeiroDigito = cpfLimpo.substring(9, 10);

    // valida se o resto é igual o primeiro digito
    if (resto != parseInt(primeiroDigito)) return false;

    // reseta a soma
    soma = 0;

    // valida o segundo digito verificador
    // percorre os 10 primeiros dígitos incluindo o primeiro digito verificador
    for (let i = 1; i <= 10; i++) {
      // extrai cada digito do cpf e multiplica de 11 até 2 em ordem decrescente
      // acumula o resultado dessa multiplicação na soma
      soma += parseInt(cpfLimpo.substring(i - 1, i)) * (12 - i);
    }

    // tira o resto da divisão da soma * 10, o resto deve receber o primeiro digito verificador
    resto = (soma * 10) % 11;

    // se o resto for 10 ou 11 resto deve ser 0 porque o digito vai de 0-9
    if (resto == 10 || resto == 11) resto = 0;

    // extrai o segundo digito verificador
    const segundoDigito = cpfLimpo.substring(10, 11);

    // valida se o resto é igual o segundo digito
    if (resto != parseInt(segundoDigito)) return false;

    // se passar com sucesso por todas as validações CPF é valido
    return true;
  },
  phone: (phone) => {
    // remove todos os caracteres que não são numeros
    const onlyNumbers = String(phone).replace(/\D/g, "");

    // deve ter 10 ou 11 digitos
    if (onlyNumbers.length < 10 || onlyNumbers.length > 11) return false;

    const ddd = onlyNumbers.slice(0, 2);
    const prefix = onlyNumbers[2];

    // se for celular (11 digitos), obriga o terceiro digito a ser 9
    // if (apenasNumeros.length === 11 && prefix !== "9") return false;

    // verifica se são numeros repetidos (ex: 1111111111)
    if (/^(\d)\1{9,10}$/.test(onlyNumbers)) return false;

    // lista de DDDs válidos no brasil
    const codigosDDD = new Set([
      11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 24, 27, 28, 31, 32, 33, 34,
      35, 37, 38, 41, 42, 43, 44, 45, 46, 47, 48, 49, 51, 53, 54, 55, 61, 62,
      63, 64, 65, 66, 67, 68, 69, 71, 73, 74, 75, 77, 79, 81, 82, 83, 84, 85,
      86, 87, 88, 89, 91, 92, 93, 94, 95, 96, 97, 98, 99,
    ]);

    if (!codigosDDD.has(Number(ddd))) return false;

    // se for fixo (10 digitos), prefixo deve começar com 2, 3, 4, 5 ou 7
    const prefixosFixos = ["2", "3", "4", "5", "7"];
    if (onlyNumbers.length === 10 && !prefixosFixos.includes(prefix)) {
      return false;
    }

    // se passar em todas as validações o numero é valido
    return true;
  },
  password: (password) => {
    // Verifica se todos os critérios são atendidos
    // 8 caracteres
    // 1 letra maiúscula
    // 1 letra minúscula
    // 1 número
    // 1 caractere especial (como !@#$%&*)
    const minLength = /.{8,}/;
    const hasUpperCase = /[A-Z]/;
    const hasLowerCase = /[a-z]/;
    const hasNumber = /\d/;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

    return (
      minLength.test(password) &&
      hasUpperCase.test(password) &&
      hasLowerCase.test(password) &&
      hasNumber.test(password) &&
      hasSpecialChar.test(password)
    );
  },
  date: (dateOrYear, month, day) => {
    let year, dateMonth, dateDay;

    // se a string vir "aaaa-mm-dd"
    if (
      typeof dateOrYear === "string" &&
      /^\d{4}-\d{2}-\d{2}$/.test(dateOrYear)
    ) {
      const [y, m, d] = dateOrYear.split("-");
      year = parseInt(y, 10);
      dateMonth = parseInt(m, 10);
      dateDay = parseInt(d, 10);
    }
    // se a string vir ano, mês e dia separado
    else if (
      (typeof dateOrYear === "number" || typeof dateOrYear === "string") &&
      (typeof month === "number" || typeof month === "string") &&
      (typeof day === "number" || typeof day === "string")
    ) {
      year = parseInt(dateOrYear, 10);
      dateMonth = parseInt(month, 10);
      dateDay = parseInt(day, 10);
    } else {
      return false;
    }

    // valida do mes e do dia
    if (dateMonth < 1 || dateMonth > 12 || dateDay < 1) {
      return false;
    }

    const daysOfMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // ano bissexto
    if (year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0)) {
      daysOfMonth[2] = 29;
    }

    if (dateDay > daysOfMonth[dateMonth]) {
      return false;
    }

    return true;
  },
  empty: (field = "") => {
    return !(field === "");
  },
};

export function validateField(fieldName, value) {
  return validationType[fieldName](value);
}
