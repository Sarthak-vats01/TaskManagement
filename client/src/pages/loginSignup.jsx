import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserURL } from "../constants/constant.js";

function LoginSignup({ onLogin, isLoggedIn }) {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    axios
      .post(`${UserURL}/signin`, {
        email: email,
        password: password,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        onLogin(res.data.token);
        navigate(`/task/${res.data.userId}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function handleSignup(e) {
    e.preventDefault();

    axios
      .post(`${UserURL}/signup`, {
        name: name,
        email: email,
        password: password,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        onLogin(res.data.token);
        navigate(`/task/${res.data.userId}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          {isLogin ? "Login" : "Sign Up"}
        </h2>
        {isLogin ? (
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2" htmlFor="password">
                Password
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
              onClick={handleLogin}
            >
              Login
            </button>
          </form>
        ) : (
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="name">
                Name
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                type="text"
                id="name"
                placeholder="Enter your username"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2" htmlFor="password">
                Password
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
              onClick={handleSignup}
            >
              Sign Up
            </button>
          </form>
        )}
        <div className="text-center mt-4">
          <button
            className="text-blue-500 hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin
              ? "Don't have an account? Sign Up"
              : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginSignup;
