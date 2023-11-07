import { getInstance } from "helper/axios";

//get random
export async function getAllNotification() {
  const res = await getInstance().get(`/notification`);
  return res?.data;
}

//post send notificaiton by userId and all
export async function postSendNotificationByUserId(userId, data) {
  const res = await getInstance().post(`/notification/${userId}`, data);
  return res?.data;
}

//get send notificaiton by userId and all
export async function getSendNotificationByUserId(userId) {
  const res = await getInstance().get(`/notification/${userId}`);
  return res?.data;
}

//delete notificaiton byId
export async function deleteNotificationById(id) {
  const res = await getInstance().delete(`/notification/${id}`);
  return res?.data;
}

//get notificaiton byId
export async function getNotificationById(id) {
  const res = await getInstance().get(`/notificationById/${id}`);
  return res?.data;
}
