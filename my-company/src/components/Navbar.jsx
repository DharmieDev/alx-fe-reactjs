import { Link } from "react-router-dom";

function Navbar() {
  const divStyle = {
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  };

  const navStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "70%",
    height: "20px",
    margin: "0 auto",
    padding: "10px",
  };

  const ulStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    padding: "0",
  };

  const linkStyle = {
    listStyle: "none",
  };

  const aStyle = {
    textDecoration: "none",
    fontFamily: "Inter",
    fontSize: "14px",
    fontWeight: "400",
  };

  const pStyle = {
    fontFamily: "Michroma",
    fontSize: "20px",
    fontWeight: "900",
  };

  return (
    <div style={divStyle}>
      <nav style={navStyle}>
        <p style={pStyle}>LOGO</p>
        <ul style={ulStyle}>
          <li style={linkStyle}>
            <Link to="/" style={aStyle}>
              Home
            </Link>
          </li>
          <li style={linkStyle}>
            <Link to="/about" style={aStyle}>
              About
            </Link>
          </li>
          <li style={linkStyle}>
            <Link to="/services" style={aStyle}>
              Services
            </Link>
          </li>
          <li style={linkStyle}>
            <Link to="/contact" style={aStyle}>
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;