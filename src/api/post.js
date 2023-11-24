import { getInstance } from "helper/axios";

//get random
export async function getRandomPostsList(category) {
  const res = await getInstance().get(`/post/random?category=${category}`);
  return res?.data;
}
//get receive post
export async function getReceivePost(id) {
  const res = await getInstance().post(`/post/receive/${id}`);
  return res?.data;
}

//get my post
export async function getMyPostList(pageSize, pageIndex, keyword, status) {
  const res = await getInstance().get(
    `/post/my-post?pageSize=${pageSize}&pageIndex=${pageIndex}&search=${keyword}&status=${status}`
  );
  return res?.data;
}

//get my post
export async function getPagingPost(
  pageSize = 10,
  pageIndex = 1,
  keyword = "",
  status = ""
) {
  const res = await getInstance().get(
    `/post?pageSize=${pageSize}&pageIndex=${pageIndex}&search=${keyword}&status=${status}`
  );
  return res?.data;
}

export async function getPostById(id) {
  const res = await getInstance().get(`/post/${id}`);
  return res?.data;
}

export async function startPost(id) {
  const res = await getInstance().put(`/post/start/${id}`);
  return res?.data;
}

export async function finishPost(id, data) {
  const res = await getInstance().put(`/post/finish/${id}`, data);
  return res?.data;
}

//update post status
export async function updatePostStatus(id, data) {
  const res = await getInstance().put(`/post/${id}`, data);
  return res?.data;
}

//delete post
export async function deletePostById(id, data) {
  const res = await getInstance().delete(`/post/${id}`, data);
  return res?.data;
}
// 
export async function receiveRandomPost(category) {
  const res = await getInstance().post(`/post/receive/random`, {category});
  return res?.data;
}

export async function updateDeadlinePost(id) {
  const res = await getInstance().put(`/post/update-deadline/${id}`);
  return res?.data;
}
