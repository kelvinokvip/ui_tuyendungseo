import { getInstance } from "helper/axios";
import { getInstanceCheckAuth } from "helper/axios";

//Đăng nhập
export async function authLogin(data) {
  const res = await getInstanceCheckAuth().post("/login", data);
  return res?.data;
}
//Đăng kí
export async function authSignup(data) {
  const res = await getInstanceCheckAuth().post("/register", data);
  return res?.data;
}
export async function refreshToken() {
  const res = await getInstanceCheckAuth().get("/user/refresh-token");
  return res.data;
}
//đăng nhập khi tồn lại access token
export async function getLoggedUser() {
  const res = await getInstance().post("/logged");
  return res?.data;
}
//đăng nhập với google
export const signInWithGoogle = async ({ tokenId }) => {
  const res = await getInstanceCheckAuth().post("/loginWithGoogle", {
    tokenId,
  });
  return res?.data;
};
