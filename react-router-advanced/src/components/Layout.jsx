import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const linkStyle = ({ isActive }) => ({
  padding: "8px 12px",
  textDecoration: "none",
  borderRadius: 8,
  fontWeight: 600,
  background: isActive ? "#eef" : "transparent",
});

export default function Layout() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", padding: 16 }}>
      <header style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 16 }}>
        <NavLink to="/" style={linkStyle} end>Home</NavLink>
        <NavLink to="/about" style={linkStyle}>About</NavLink>
        <NavLink to="/blog" style={linkStyle}>Blog</NavLink>
        <NavLink to="/profile" style={linkStyle}>Profile</NavLink>

        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          {isAuthenticated ? (
            <button onClick={logout}>Log out</button>
          ) : (
            <NavLink to="/login" style={linkStyle}>Log in</NavLink>
          )}
        </div>
      </header>

      <main style={{ padding: 12, border: "1px solid #eee", borderRadius: 12 }}>
        <Outlet />
      </main>

      <footer style={{ marginTop: 16, fontSize: 12, color: "#666" }}>
        Router demo — nested, dynamic, protected
      </footer>
    </div>
  );
}
