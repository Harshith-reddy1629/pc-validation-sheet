import Cookies from "js-cookie";
import React from "react";
import { useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

function Logout({ className }) {
  const navigate = useNavigate();

  const onLogout = () => {
    Cookies.remove("jwt_token");
    navigate("/login");
  };
  return (
    <Popup
      modal
      trigger={
        <button className={className} type="button">
          Logout
        </button>
      }
    >
      {(close) => (
        <div className="logout-container">
          <div className="logout-logo-container">
            <LuLogOut color="#D97706" className="logout-logo" />
          </div>
          <div className="logout-cont">
            <div className="logout-txt-con">
              <h3 className="sure-text">Are you sure you want to Logout?</h3>
              <p>If you click on Yes , you'll be logged out</p>
            </div>
            <div className="logout-btn-cont">
              <button className="logout-btn " onClick={onLogOut}>
                Yes, Logout
              </button>
              <button className="cancel-btn " onClick={() => close()}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </Popup>
  );
}

export default Logout;
