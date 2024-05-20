import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginSignup from "./pages/loginSignup.jsx";
import Task from "./pages/tasks.jsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const handleLogin = (token) => {
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={<LoginSignup onLogin={handleLogin} isLoggedIn={isLoggedIn} />}
      />
      <Route
        path="/task/:id"
        element={
          isLoggedIn ? <Task onLogout={handleLogout} /> : <Navigate to="/" />
        }
      />
    </Routes>
  );
}

export default App;
