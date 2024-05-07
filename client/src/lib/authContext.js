"use client";

import { createContext, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const login = ({ accessToken, refreshToken, user }) => {
    localStorage.setItem("accessToken", JSON.stringify(accessToken));
    localStorage.setItem("refreshToken", JSON.stringify(refreshToken));
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    localStorage.clear();
  };

  const isAuthenticated = () => {
    const accessToken = JSON.parse(localStorage.getItem("accessToken"));
    const refreshToken = JSON.parse(localStorage.getItem("refreshToken"));
    const user = JSON.parse(localStorage.getItem("user"));

    if (!accessToken || !refreshToken || !user) {
      logout();
      return null;
    }

    return {
      accessToken,
      refreshToken,
      uid: user.uid,
      username: user.username,
    };
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
