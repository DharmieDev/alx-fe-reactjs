import { NavLink, Outlet } from "react-router-dom";

const tabStyle = ({ isActive }) => ({
  padding: "8px 10px",
  textDecoration: "none",
  borderRadius: 8,
  fontWeight: 600,
  background: isActive ? "#efe" : "transparent",
});

export default function Profile() {
  return (
    <div>
      <h1>Profile</h1>
      <p>Only logged-in users can see this area.</p>

      <nav style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <NavLink to="details" style={tabStyle}>Details</NavLink>
        <NavLink to="settings" style={tabStyle}>Settings</NavLink>
      </nav>

      {/* Child routes render here */}
      <Outlet />
    </div>
  );
}
