export function isAllFieldsFilled(formData) {
  console.log(formData);

  return Object.values(formData).every((value) => {
    return typeof value === "string" ? value.trim() !== "" : true;
  });
}
