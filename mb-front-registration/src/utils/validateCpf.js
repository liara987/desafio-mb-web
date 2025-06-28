export function cpfIsValid(cpf) {
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
}
