import axios from "axios";
import { responseInterceptor } from "./interceptores/responseInterceptor";
import { errorInterceptor } from "./interceptores/errorInterceptor";
import { requestInterceptor } from "./interceptores/requesteInterceptor";

export const api = axios.create({
  baseURL: "http://localhost:3000/api/v1/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => responseInterceptor(response),
  (erro) => errorInterceptor(erro)
);

api.interceptors.request.use(
  (req) => requestInterceptor(req),
  (erro) => errorInterceptor(erro)
);
