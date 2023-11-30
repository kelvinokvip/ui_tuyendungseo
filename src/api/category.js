import { getInstance } from "helper/axios";

//get paging
export async function getCategoryList(pageSize, pageIndex) {
  const res = await getInstance().get(
    `/category?pageSize=${pageSize}&pageIndex=${pageIndex}`
  );
  return res?.data;
}

//get all
export async function getAllCategoriesList() {
  const res = await getInstance().get(`/category/all`);
  return res?.data;
}

//create
export async function createCategory(data) {
  const res = await getInstance().post(`/category`, data);
  return res?.data;
}

//update
export async function updateCategory(id, data) {
  const res = await getInstance().put(`/category/${id}`, data);
  return res?.data;
}

//remove
export async function removeCategory(id) {
  const res = await getInstance().delete(`/category/${id}`);
  return res?.data;
}
export async function getCateByUser() {
  const res = await getInstance().get(`/getCateByUser`);
  return res?.data;
}