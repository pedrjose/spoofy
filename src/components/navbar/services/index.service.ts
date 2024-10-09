import { api } from "../../../services/axios-config/api";

export class LogoutServices {
  static async logout(): Promise<any> {
    const { data } = await api.post("logout");
    return data;
  }
}
