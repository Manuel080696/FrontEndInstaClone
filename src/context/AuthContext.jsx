import React from "react";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export const AuthContext = React.createContext();

export const AuthProviderComponent = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || ""
  );

  useEffect(() => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  }, [token, user]);

  const logIn = (data) => {
    setUser(data);
    setToken(data.token);
  };

  const logOut = () => {
    setToken("");
    setUser("");
    {
      <Navigate to="/" />;
    }
  };

  return (
    <AuthContext.Provider value={{ token, user, logIn, logOut, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
