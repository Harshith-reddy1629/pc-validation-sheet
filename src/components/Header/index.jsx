import Cookies from "js-cookie";
import React from "react";
import { useNavigate } from "react-router-dom";
import pc from "../../assets/logo5.png";

function Header() {
  const navigate = useNavigate();

  const onLogout = () => {
    Cookies.remove("jwt_token");
    navigate("/login");
  };
  return (
    <nav className="nav_bar">
      <img src={pc} className="h-[28px] " alt="..." />
      {/* <h1 className="text-[20px] font-[600]">Validation Sheets</h1> */}
      <button onClick={onLogout} className="log_out">
        Logout
      </button>
    </nav>
  );
}

export default Header;
