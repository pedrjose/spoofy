import { api } from "../../../services/axios-config/api";
import { ISearchDataType } from "./type";

export class NavBarServices {
  static async logout(): Promise<any> {
    const { data } = await api.post("/logout");
    return data;
  }

  static async searchMusic({
    music,
    artist,
  }: {
    music: string;
    artist?: string;
  }): Promise<ISearchDataType> {
    const { data } = await api.post("/lyrics", { music, artist });
    return data;
  }
}
