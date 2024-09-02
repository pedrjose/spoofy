import { InternalAxiosRequestConfig } from "axios";

export const requestInterceptor = (req: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("authToken");

  if (token) {
    req.headers = req.headers || {};
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
};
