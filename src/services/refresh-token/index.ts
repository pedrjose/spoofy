import { api } from "../axios-config/api";

export const refreshToken = async () => {
  try {
    const response = await api.post(
      "/auth/refresh",
      {},
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw new Error("Erro ao renovar o token.");
  }
};
