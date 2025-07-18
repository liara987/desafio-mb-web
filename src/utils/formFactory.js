// utils/formFactory.js

export function createFormData(type, step = 1, data = {}) {
  const base = {
    step: step,
    email: "",
    password: "",
    personType: type,
  };

  if (type === "pessoa-fisica") {
    return {
      ...base,
      name: "",
      cpf: "",
      birthDay: "",
      telephone: "",
      ...data,
    };
  }

  if (type === "pessoa-juridica") {
    return {
      ...base,
      companyName: "",
      cnpj: "",
      openDate: "",
      telephone: "",
      ...data,
    };
  }

  // fallback genérico, caso o tipo não seja conhecido
  return {
    ...base,
    ...data,
  };
}

export function createErrors(typePerson) {
  return {
    email: false,
    telephone: false,
    password: false,
    ...(typePerson === "pessoa-fisica"
      ? {
          name: false,
          cpf: false,
          birthDay: false,
        }
      : {
          companyName: false,
          cnpj: false,
          openDate: false,
        }),
  };
}

export function createProps() {
  return {
    title: "",
    step: "",
    data: {},
  };
}
