
import { getInstance } from "helper/axios";

export async function getOrderEntity() {
  const res = await getInstance().get(`/orderEntity`);
  return res?.data;
}
//create
export async function createOrderEntity(data) {
  const res = await getInstance().post(`/orderEntity`, data);
  return res?.data;
}
//update
export async function updateOrderEntity(id, data) {
  const res = await getInstance().put(`/orderEntity/${id}`, data);
  return res?.data;
}

//remove
export async function deleteOrderEntity(id) {
  const res = await getInstance().delete(`/orderEntity/${id}`);
  return res?.data;
}

export async function getRandomEntity() {
  const res = await getInstance().get(`/orderEntity/random`);
  return res?.data;
}

export async function getOrderById(id) {
  const res = await getInstance().get(`/orderEntity/${id}`);
  return res?.data;
}