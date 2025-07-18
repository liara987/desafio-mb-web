const api = import.meta.env.VITE_API_URL_BASE;
export async function registerUser(userData) {
  const response = await fetch(`${api}/registration`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  return await response.json();
}
