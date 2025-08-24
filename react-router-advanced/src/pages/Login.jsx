import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // where should we go after login?
  const from = location.state?.from?.pathname || "/profile";

  function handleLogin(e) {
    e.preventDefault();
    login();
    navigate(from, { replace: true });
  }

  if (isAuthenticated) {
    // Already logged in? Send to profile
    navigate("/profile", { replace: true });
    return null;
  }

  return (
    <form onSubmit={handleLogin} style={{ display: "grid", gap: 12, maxWidth: 360 }}>
      <h1>Login</h1>
      <p>This demo accepts any credentials.</p>
      <label>
        Email
        <input type="email" placeholder="you@example.com" required />
      </label>
      <label>
        Password
        <input type="password" placeholder="••••••••" required />
      </label>
      <button type="submit">Log in</button>
      {location.state?.from && (
        <small>After login you’ll go to: <code>{from}</code></small>
      )}
    </form>
  );
}
