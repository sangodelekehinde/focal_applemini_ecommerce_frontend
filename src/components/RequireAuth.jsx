// Wrap a page in <RequireAuth> and only logged-in users can open it.
// Everyone else is sent to /login, and sent back here afterwards.

import { Navigate, useLocation } from "react-router-dom";

function RequireAuth({ children }) {
  const location = useLocation();

  if (!localStorage.getItem("access")) {
    return (
      <Navigate
        to="/login"
        state={{ from: location.pathname + location.search }}
        replace
      />
    );
  }

  return children;
}

export default RequireAuth;