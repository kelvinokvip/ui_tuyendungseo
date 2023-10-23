import axios from "axios";
import { getInstance } from "helper/axios";
import { getInstanceCheckAuth } from "helper/axios";
import Cookies from "js-cookie";
//Đăng nhập
export async function getPermissionByRole() {
  try {
    const res = await getInstanceCheckAuth().get("/permission/getByRole");
    return res?.data?.data;
  } catch (error) {
    const refreshToken = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/user/refresh-token`,
      {},
      { withCredentials: true }
    );
    if (refreshToken?.data?.success) {
      localStorage.setItem("accessToken", refreshToken?.data?.jwtToken);
      Cookies.set("refreshToken", refreshToken?.data?.refreshToken);
      const res = await getInstanceCheckAuth().get("/permission/getByRole");
      return res?.data?.data;
    } else {
      localStorage.clear();
    }
  }
}
