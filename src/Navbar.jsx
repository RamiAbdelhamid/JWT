import React from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const token = Cookies.get("token"); 

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    navigate("/login");
  };

  return (
    <nav style={{ padding: "10px", background: "#333", color: "#fff", display: "flex",justifyContent:"center" }}>
      <Link to="/" style={{ marginRight: "10px", color: "#fff" }}>
        Home
      </Link>

      {token ? (
        <>
          <Link to="/profile" style={{ marginRight: "10px", color: "#fff" }}>
            Profile
          </Link>
          <button onClick={handleLogout} style={{ color: "red" }}>
            Logout
          </button>
        </>
      ) : (
        <Link to="/login" style={{ color: "#fff" }}>
          Login
        </Link>
      )}
    </nav>
  );
}

export default Navbar;






