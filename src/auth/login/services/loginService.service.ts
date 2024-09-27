import { api } from "../../../services/axios-config/api";
import { ILoginRequest, ILoginResponse } from "./types";

export class LoginService {
  static async login(values: ILoginRequest): Promise<ILoginResponse> {
    const { data } = await api.post<ILoginResponse>("login", values);
    return data;
  }
}
