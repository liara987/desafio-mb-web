export function maskPhone(phone) {
  return phone
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d)/, "($1) $2") // (XX)
    .replace(/(\d{4,5})(\d{4})$/, "$1-$2"); // XXXX-XXXX ou XXXXX-XXXX
}

export function isPhoneValid(phone) {
  // remove todos os caracteres que não são numeros
  const onlyNumbers = phone.replace(/\D/g, "");

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
    11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 24, 27, 28, 31, 32, 33, 34, 35,
    37, 38, 41, 42, 43, 44, 45, 46, 47, 48, 49, 51, 53, 54, 55, 61, 62, 63, 64,
    65, 66, 67, 68, 69, 71, 73, 74, 75, 77, 79, 81, 82, 83, 84, 85, 86, 87, 88,
    89, 91, 92, 93, 94, 95, 96, 97, 98, 99,
  ]);

  if (!codigosDDD.has(Number(ddd))) return false;

  // se for fixo (10 digitos), prefixo deve começar com 2, 3, 4, 5 ou 7
  const prefixosFixos = ["2", "3", "4", "5", "7"];
  if (onlyNumbers.length === 10 && !prefixosFixos.includes(prefix)) {
    return false;
  }

  // se passar em todas as validações o numero é valido
  return true;
}
