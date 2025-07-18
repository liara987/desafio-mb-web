import { validateField } from "@/utils/validators";
import { reactive } from "vue";

export function useFieldValidation(formData, validationMap) {
  const errors = reactive({});

  for (const field in validationMap) {
    errors[field] = false;
  }

  function handleBlur(field) {
    const validationType = validationMap[field];
    if (!validationType) return;

    const isValid = validateField(validationType, formData[field]);
    errors[field] = !isValid;
  }

  function resetError(field) {
    if (field in errors) {
      errors[field] = false;
    }
  }

  function hasErrors() {
    return Object.values(errors).some((val) => val === true);
  }

  return {
    errors,
    handleBlur,
    resetError,
    hasErrors,
  };
}
