import React from "react";

function Logout({ className }) {
  return (
    <Popup
      modal
      trigger={
        <button className={className} type="button">
          Logout
        </button>
      }
    >
      {(close) => <div></div>}
    </Popup>
  );
}

export default Logout;
