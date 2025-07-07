export function isEmailValid(email) {
  //email valido text@texto.text
  const regex = /^[^\s]+@[^\s]+\.[^\s]+$/;
  return regex.test(email);
}
