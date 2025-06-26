export function maskCpf(cpf) {
  // Remove tudo que não for número
  cpf = cpf.replace(/\D/g, "");

  // Adiciona os pontos e traço
  cpf = cpf
    .replace(/(\d{3})(\d)/, "$1.$2") // 000.
    .replace(/(\d{3})(\d)/, "$1.$2") // 000.
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2"); // 000-00

  return cpf;
}
