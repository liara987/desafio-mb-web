export function isPasswordValid(password) {
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
}
