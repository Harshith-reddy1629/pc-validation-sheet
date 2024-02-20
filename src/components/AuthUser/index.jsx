import Cookies from "js-cookie";
import React from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

import pc from "../../assets/pc.png";

function AuthUser() {
  const isAuth = !Cookies.get("jwt_Token");

  const navigate = useNavigate();

  const onLogout = () => {
    Cookies.remove("jwt_token");
    navigate("/login");
  };

  if (isAuth) {
    return (
      <div className="bg-gray-50 min-h-screen ">
        <nav className="bg-gray-300 p-2 flex justify-between  sticky top-0">
          <img src={pc} className="h-[35px] " alt="..." />
          <h1 className="text-[20px] font-[600]">Validation Sheets</h1>
          <button
            onClick={onLogout}
            className="bg-teal-950 px-3 text-white rounded-md"
          >
            Logout
          </button>
        </nav>
        <Outlet />
      </div>
    );
  }
  return <Navigate to="/login" />;
}

export default AuthUser;
