import { refreshToken } from "api/auth";
import {
  authLogin,
  authSignup,
  signInWithGoogle,
  getLoggedUser,
} from "api/auth";
import { getPermissionByRole } from "api/permission";
import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
const initialValue = {
  user: {},
  accessToken: "",
};
export const AuthContext = createContext(initialValue);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [token, setToken] = useState("");
  const [permission, setPermission] = useState();

  useEffect(() => {
    const accessToken = JSON.stringify(localStorage.getItem("accessToken"));
    if (accessToken != "null") {
      logged();
    }
  }, []);
  //Login
  const login = async (data) => {
    const res = await authLogin(data);
    if (res?.success) {
      setUser(res);
      setToken(res?.jwtToken);
      localStorage.setItem("accessToken", res?.jwtToken);
      Cookies.set("refreshToken", res?.refreshToken);
      getPermission();
    }
    return res;
  };

  //Permission
  const getPermission = async () => {
    try {
      const permission = await getPermissionByRole();
      setPermission(permission);
    } catch (error) { }
  };

  //Signup
  const signup = async (data) => {
    const res = await authSignup(data);
    // if (res?.success) {
    // setUser(res);
    // setToken(res?.jwtToken);
    // localStorage.setItem("accessToken", res?.jwtToken);
    // Cookies.set("refreshToken", res?.refreshToken);
    // } 
    return res;
  };

  //LoginWithGoogle
  const loginWithGoogle = async (idToken, isUser) => {
    const res = await signInWithGoogle({
      tokenId: idToken,
      isUser: isUser
    });
    if (res?.success) {
      setUser(res);
      setToken(res?.jwtToken);
      localStorage.setItem("accessToken", res?.jwtToken);
      Cookies.set("refreshToken", res?.refreshToken);
      getPermission();
    }
    return res;
  };

  //Logout
  const logout = async () => {
    localStorage.removeItem("accessToken");
    setUser({});
    setToken("");
    return;
  };

  //logged
  const logged = async () => {
    const res = await getLoggedUser();
    setUser(res);
    setToken(res?.jwtToken);
    localStorage.setItem("accessToken", res?.jwtToken);
    localStorage.setItem("userId", res?.id);
    return res;
  };
  const AuthContextData = {
    user,
    token,
    setUser,
    login,
    signup,
    logout,
    logged,
    loginWithGoogle,
    permission,
    getPermission,
  };
  return (
    <AuthContext.Provider value={AuthContextData}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
