import { useContext, useEffect } from "react";
import { AuthContext } from "./../context/authContext";
import { getLoggedUser } from "api/auth";
import { getPermissionByRole } from "api/permission";

const useAuthContext = () => {
  const { user, setUser, getPermission, permission } = useContext(AuthContext);
  const pathname = window.location.pathname;
  // console.log("user:", user);
  // console.log("pathname:", pathname);
  useEffect(() => {
    if (Object.keys(user).length) {
    } else {
      if (localStorage.getItem("accessToken")) {
        if (!permission) {
          getPermission();
        }
      } else {
        window.location.href = "/auth/login";
      }
      // Chuyển hướng ngay lập tức
    }
  }, [pathname]);
  return { user };
};
export default useAuthContext;
