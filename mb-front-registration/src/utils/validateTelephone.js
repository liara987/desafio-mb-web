export function maskPhone(value) {
  return value
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d)/, "($1) $2") // (XX)
    .replace(/(\d{4,5})(\d{4})$/, "$1-$2"); // XXXX-XXXX ou XXXXX-XXXX
}
