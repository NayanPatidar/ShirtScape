import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();
export const SearchContext = createContext();
const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(
    localStorage.getItem("isUserLoggedIn") === "true"
  );

  useEffect(() => {
    const storedIsUserLoggedIn = localStorage.getItem("isUserLoggedIn");
    if (storedIsUserLoggedIn !== null) {
      setIsUserLoggedIn(storedIsUserLoggedIn === "true");
    }
  }, []);

  const login = () => {
    setIsUserLoggedIn(true);
    localStorage.setItem("isUserLoggedIn", "true");
  };

  const logout = () => {
    setIsUserLoggedIn(false);
    localStorage.setItem("isUserLoggedIn", "false");
  };

  return (
    <AuthContext.Provider value={{ isUserLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
