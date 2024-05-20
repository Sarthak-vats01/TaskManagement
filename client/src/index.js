import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import AccountProvider from "./context/AccountProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AccountProvider>
        <App />
      </AccountProvider>
    </BrowserRouter>
  </React.StrictMode>
);
