export function fillFormData(formData, payload) {
  for (const key in payload) {
    if (formData.hasOwnProperty(key)) {
      formData[key] = payload[key];
    }
  }
}
