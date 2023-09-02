import axios from "axios";
import { userSchema } from "./user.schema";

const apiUrl = `https://spoofy-api.onrender.com`;

export const initSession = async (email, password) => {
  try {
    const response = await axios.post(`${apiUrl}/user/login`, {
      email,
      password,
    });

    return { error: false, response: response.data };
  } catch (error) {
    return {
      error: true,
      message: "O email ou a senha não estão corretos. Tente novamente!",
    };
  }
};

export const initAccount = async (email, password, avatar) => {
  try {
    const response = await axios.post(`${apiUrl}/user/sign-up`, {
      email,
      password,
      avatar,
    });
  } catch (error) {
    return {
      message: "Erro ao criar a conta. Tente novamente!",
    };
  }
};

export const validSession = async (token) => {
  try {
    const response = await axios.get(`${apiUrl}/user/auth`, {
      headers: { Authorization: `${userSchema} ${token}` },
    });

    return response.data;
  } catch (error) {
    return error.message;
  }
};
