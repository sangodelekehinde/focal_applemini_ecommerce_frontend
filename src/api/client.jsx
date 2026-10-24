// A fetch helper that automatically sends the login token to Django.
// Use apiFetch instead of fetch for anything that needs a logged-in user.
import { BASE_URL } from "../config";

// removes the token AND the saved cart (used by the Log out button)
export function logout() {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  localStorage.removeItem("cart_count");
}

export async function apiFetch(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    },
  });

  // 401 = not logged in, or the token has expired
  if (res.status === 401) {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    window.location.href = "/login";
    throw { detail: "Please log in again." };
  }

  const data = await res.json().catch(() => null);
  if (!res.ok) throw data || { detail: "Request failed" }; // same style as auth.jsx
  return data;
}