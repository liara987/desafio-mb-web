export function maskDate(date) {
  return date
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d)/, "$1/$2") // dd/
    .replace(/^(\d{2})\/(\d{2})(\d)/, "$1/$2/$3"); // dd/mm/yyyy
}

export function dateIsValid(date) {
  // garante que a data é uma string
  if (typeof date !== "string") {
    return false;
  }

  // garante que a data esta no formato correto
  // dd/mm/aaaa
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(date)) {
    return false;
  }

  // separa a data em um objeto pela /
  const dateParts = date.split("/");
  const data = {
    day: dateParts[0],
    month: dateParts[1],
    year: dateParts[2],
  };

  // transforma a data em numeros
  const day = parseInt(data.day);
  const month = parseInt(data.month);
  const year = parseInt(data.year);

  // dias de cada mes, incluindo ajuste para ano bissexto
  const daysOfMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // verifca ano bissexto e altera o mes de fevereiro
  if (year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0)) {
    daysOfMonth[2] = 29;
  }

  // mes deve estar entre 1 e 12
  // dia deve ser maior que zero
  if (month < 1 || month > 12 || day < 1) {
    return false;
  }

  // dias deve estar dentro do limite do mes
  else if (day > daysOfMonth[month]) {
    return false;
  }

  // Data é valida
  return true;
}
