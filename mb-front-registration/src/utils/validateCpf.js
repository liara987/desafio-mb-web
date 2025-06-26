export function maskCpf(cpf) {
  cpf = cpf
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2") // 000.
    .replace(/(\d{3})(\d)/, "$1.$2") // 000.
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2"); // 000-00

  return cpf;
}
