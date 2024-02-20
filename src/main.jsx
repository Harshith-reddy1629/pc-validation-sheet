import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./Store/store.jsx";

// import

// import { ApiProvider } from "@reduxjs/toolkit/dist/query/react/ApiProvider.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      {/* <ApiProvider api={packsApi}> */}
      <App />
      {/* </ApiProvider> */}
    </Provider>
  </BrowserRouter>
  // </React.StrictMode>,
);
