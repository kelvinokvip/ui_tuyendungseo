
import { getInstance } from "helper/axios";

export async function createOrtherPost(formData) {
  const res = await getInstance().post(`/order-post/create`, formData);
  return res?.data;
}

export async function getOrderPost() {
  const res = await getInstance().get(`/order-post/getOrderPost`);
  return res?.data;
}

export async function updateOrtherPost(id, formData) {
  const res = await getInstance().post(`/order-post/update/${id}`, formData);
  return res?.data;
}

export async function deleteOrderPost(id) {
  const res = await getInstance().post(`/order-post/delete/${id}`);
  return res?.data;
}
export async function sortOrderPost(data) {
  const res = await getInstance().post(`/order-post/sort`, {sort: data});
  return res?.data;
}
