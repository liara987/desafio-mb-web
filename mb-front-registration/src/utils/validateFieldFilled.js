export function isAllFieldsFilled(formData) {
  for (const key in formData) {
    const value = formData[key];

    if (typeof value === "string" && value.trim() === "") {
      return false;
    }
  }
  return true;
}
