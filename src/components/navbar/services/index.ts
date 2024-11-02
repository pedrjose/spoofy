import { api } from "../../../services/axios-config/api";

export class NavBarServices {
  static async logout(): Promise<any> {
    const { data } = await api.post("/logout");
    return data;
  }
}
