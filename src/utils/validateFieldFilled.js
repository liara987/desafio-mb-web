export function isAllFieldsFilled(formData) {
  return Object.values(formData).every((value) => {
    return typeof value === "string" ? value !== "" : true;
  });
}
