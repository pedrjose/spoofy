import { AxiosError } from "axios";
import { api } from "../api";

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

async function refreshAccessToken() {
  if (!isRefreshing) {
    isRefreshing = true;
    try {
      const response = await api.post("/refresh");
      const newAccessToken = response.data;

      refreshSubscribers.forEach((callback) =>
        callback(newAccessToken.data.token)
      );
      refreshSubscribers = []; 

      return newAccessToken;
    } catch (error) {
      console.error("Erro ao renovar o access token", error);
      throw error;
    } finally {
      isRefreshing = false;
    }
  } else {
    return new Promise<string>((resolve) => {
      console.log('entrei')
      refreshSubscribers.unshift((token: string) => {
        resolve(token);
      });
    });
  }
}

export const errorInterceptor = async (error: AxiosError) => {
  if (error.message === "Network Error") {
    return Promise.reject(new Error("Erro de Conexão"));
  }

  const originalRequest = error.config as any;
  if (error.response && error.response.status === 401) {
    try {
      const newAccessToken = await refreshAccessToken();

      localStorage.setItem("authToken", newAccessToken.data.token);

      return api(originalRequest);
    } catch (refreshError) {
      console.error("Não foi possível renovar o token");
      return Promise.reject(refreshError);
    }
  }

  return Promise.reject(error);
};
