import { NavLink, Routes, Route, Outlet } from "react-router-dom";
import ProfileDetails from "../pages/ProfileDetails.jsx";
import ProfileSettings from "../pages/ProfileSettings.jsx";

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

      {/* Nested route definitions live here */}
      <Routes>
        <Route index element={<ProfileDetails />} />
        <Route path="details" element={<ProfileDetails />} />
        <Route path="settings" element={<ProfileSettings />} />
      </Routes>

      {/* Optional Outlet if you want extra nested levels */}
      <Outlet />
    </div>
  );
}

