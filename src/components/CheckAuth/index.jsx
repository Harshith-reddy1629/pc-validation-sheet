import Cookies from "js-cookie";
import React from "react";

import pc from "../../assets/logo5.png";

import { Link, Navigate, Outlet, useLocation } from "react-router-dom";

function CheckAuth() {
  const isAuth = Cookies.get("jwt_token");
  const location = useLocation();
  if (isAuth) {
    return <Navigate to="/" />;
  }
  return (
    <div className="flex justify-center mt-32 items-center">
      <img src={pc} alt="website logo" className="absolute top-3 left-9 h-8" />
      <div className=" bg-neutral-50 w-[100%] max-w-[400px] shadow-[0px_4px_12px_#00000020]  font-sans border-[1px]">
        <div className=" flex w-full grid grid-cols-prime ">
          <Link
            to="/login"
            className={`text-center py-1.5 p-2 tracking-[1px] font-[500]  ${
              location.pathname === "/login" &&
              "bg-[#256047]  text-white shadow-[3px_6px_10px_#00000030]"
            } `}
          >
            Login
          </Link>
          <Link
            to="/register"
            className={`text-center py-1 p-2 ${
              location.pathname === "/register" &&
              "bg-[#256047]  text-white shadow-[3px_6px_10px_#00000030]"
            } `}
          >
            Register
          </Link>
        </div>{" "}
        <Outlet />
      </div>
    </div>
  );
}

export default CheckAuth;
