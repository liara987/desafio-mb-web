export function isDateValid(dateOrYear, month, day) {
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

  // Verifica ano bissexto
  if (year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0)) {
    daysOfMonth[2] = 29;
  }

  if (dateDay > daysOfMonth[dateMonth]) {
    return false;
  }

  return true;
}
