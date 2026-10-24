import { BASE_URL } from "../config";

export async function registerUser(data) {
  const res = await fetch(`${BASE_URL}/register/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data), // { username, email, password }
  });
  const result = await res.json();
  if (!res.ok) throw result; // Django's error messages
 
  return result;
  
}


export async function loginUser(data) {
  const res = await fetch(`${BASE_URL}/token/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data), // { username, password }
  });
  const result = await res.json();
  if (!res.ok) throw result;
   
  return result; // { access, refresh }
}


// reset password

// saves a new password   data = { username, email, password }
export async function resetPassword(data) {
  const res = await fetch(`${BASE_URL}/reset-password/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  if (!res.ok) throw result; // Django's error message

  return result;
}