import { api } from "../../../services/axios-config/api";
import { IMusicData } from "../../cardSong/types";

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
  }): Promise<IMusicData> {
    const { data } = await api.post("/lyrics", { music, artist });
    return data;
  }
}
