// The address of the Django backend.
// On Vercel we set VITE_API_URL. On your PC it falls back to the local server.
export const API_ROOT = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
export const BASE_URL = `${API_ROOT}/api`;