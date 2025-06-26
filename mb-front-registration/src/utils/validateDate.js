export function maskDate(valor) {
  return valor
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d)/, "$1/$2") // dd/
    .replace(/^(\d{2})\/(\d{2})(\d)/, "$1/$2/$3"); // dd/mm/yyyy
}
