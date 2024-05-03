"use client";

import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  //   const [token, setToken] = useState(null);

  const login = ({ accessToken, refreshToken, user }) => {
    // You can also save the token to localStorage for persistence if needed
    // localStorage.setItem("token", token);
    localStorage.setItem("accessToken", JSON.stringify(accessToken));
    localStorage.setItem("refreshToken", JSON.stringify(refreshToken));
    localStorage.setItem("user", JSON.stringify(user));

    // setToken({
    //   accessToken: sessionStorage.getItem("accessToken"),
    //   refreshToken: sessionStorage.getItem("refreshToken"),
    // });
  };

  const logout = () => {
    // setToken(null);
    localStorage.clear();
    // sessionStorage.removeItem("accessToken");
    // sessionStorage.removeItem("refreshToken");
  };

  const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  const refreshToken = JSON.parse(localStorage.getItem("refreshToken"));
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <AuthContext.Provider
      value={{ user, accessToken, refreshToken, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
