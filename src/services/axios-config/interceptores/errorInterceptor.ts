import { AxiosError } from "axios";
import { refreshToken } from "../../refresh-token";
import { api } from "../api";

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (
  error: AxiosError | null,
  token: string | null = null
) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

export const errorInterceptor = async (error: AxiosError) => {
  if (error.response?.status === 401) {
    const originalRequest = error.config;

    if (!isRefreshing) {
      isRefreshing = true;
      try {
        const { accessToken } = await refreshToken();
        localStorage.setItem("authToken", accessToken);

        processQueue(null, accessToken);
        isRefreshing = false;

        return api(originalRequest!);
      } catch (err) {
        processQueue(err as AxiosError, null);
        isRefreshing = false;
        return Promise.reject(err);
      }
    } else {
      return new Promise(function (resolve, reject) {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          if (token && originalRequest) {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          }
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    }
  }

  if (error.message === "Network Error") {
    return Promise.reject(new Error("Erro de Conexão"));
  }

  return Promise.reject(error);
};
