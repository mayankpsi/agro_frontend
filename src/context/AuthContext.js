import { useState, createContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    roles:[2001,2002],
    user:null,
  });
  const [onUserLogin, setOnUserLogin] = useState({ email: "", password: "" });

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleUserLoginChange = (event) => {
    const { name, value } = event.target;
    setOnUserLogin({ ...onUserLogin, [name]: value });
  };

  const handleUserLoginSubmit = () => {
    console.log(onUserLogin, "onUserLogin");
    setOnUserLogin({ email: "", password: "" });
    navigate(from, { replace: true });
  };
  return (
    <AuthContext.Provider
      value={{
        handleUserLoginChange,
        handleUserLoginSubmit,
        onUserLogin,
        auth,
        setAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
