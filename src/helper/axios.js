import axios from "axios";

const token = localStorage.getItem("accessToken");

const reLogin = () => {
  localStorage.removeItem("accessToken");
  window.history.pushState({}, "", "/login");
  window.location.reload();
};

export const getInstance = () => {
  const token = localStorage.getItem("accessToken");
  const instance = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/api`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return instance;
};

export const getInstanceCheckAuth = () => {
  const token = localStorage.getItem("accessToken");
  const instance = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/api`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return instance;
};
