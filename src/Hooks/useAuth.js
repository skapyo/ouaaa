import React, { useState, useContext, createContext } from "react";
import { log } from "util";

const useAuth = () => {
  const [isLogged, setIsLoggedInd] = useState(false);
  const [userInfo, setuserInfo] = useState(null);

  const login = () => {
    setIsLoggedInd(true);
  };

  const logout = () => {
    setIsLoggedInd(false);
  };

  return [isLogged, userInfo, { login, logout }];
};

const withAuth = Component => props => {
  const value = useContext(AuthContext);
  return <Component {...props} userAuth={value} />;
};

const AuthContext = createContext();
const AuthContextProvider = AuthContext.Provider;

export { AuthContextProvider, withAuth };
export default useAuth;
