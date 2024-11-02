import { IMusicData } from "../../../components/cardSong/types";
import { api } from "../../../services/axios-config/api";

export class HomeServices {
  static async getTop(): Promise<IMusicData> {
    const { data } = await api.get("/lyrics/top");
    return data;
  }
}
