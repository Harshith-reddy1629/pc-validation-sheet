import Cookies from "js-cookie";
import React from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

import pc from "../../assets/logo5.png";
import Header from "../Header";

function AuthUser() {
  const isAuth = Cookies.get("jwt_token");

  const navigate = useNavigate();

  const onLogout = () => {
    Cookies.remove("jwt_token");
    navigate("/login");
  };

  if (isAuth) {
    return (
      <div className="bg-gray-50 min-h-screen ">
        <Header />
        <Outlet />
      </div>
    );
  }
  return <Navigate to="/login" />;
}

export default AuthUser;
