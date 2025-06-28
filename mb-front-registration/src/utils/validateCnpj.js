export function isCnpjValid(cnpj) {
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
}
