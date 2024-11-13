import { IResponseData } from "../../../../../@types/responseData";
import { api } from "../../../../../services/axios-config/api";
import { IUserDetails } from "../types";

export class DrawerUserDetailsServices {
  static async getDetails(): Promise<IResponseData<IUserDetails>> {
    const { data } = await api.get("profile");
    return data;
  }
}
