import { getInstance } from "helper/axios";

//get random
export async function getRandomPostsList(category) {
  const res = await getInstance().get(`/post/random?category=${category}`);
  return res?.data;
}

//get paging
export async function getPagingCtv(pageSize = 10, pageIndex = 1, search = "", isUser = "", isPost = "") {
  const res = await getInstance().get(
    `/user/ctv?pageSize=${pageSize}&pageIndex=${pageIndex}&search=${search}&isUser=${isUser}&isPost=${isPost}`
  );
  return res?.data;
}

//Update ctv status
export async function updateCtvStatus(id, status, isVerify) {
  const res = await getInstance().put(`/user/ctv/${id}`, { status, isVerify });
  return res?.data;
}

//get all user ctv
export async function getAllCTV() {
  const res = await getInstance().get(`/user/ctv/all`);
  return res?.data;
}