import React from "react";

import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export const AuthContext = React.createContext();

export const AuthProviderComponent = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || ""
  );

  const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const [favorites, setFavorites] = useState(storedFavorites);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

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
    setFavorites([]);
    {
      <Navigate to="/" />;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        logIn,
        logOut,
        setUser,
        favorites,
        setFavorites,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
