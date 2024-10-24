import { IMusicData } from "../../../components/cardSong/types";
import { api } from "../../../services/axios-config/api";
import { ISearchDataType } from "../../../components/navbar/services/type";

export class HomeServices {
  static async getTop(): Promise<IMusicData> {
    const { data } = await api.get("/lyrics/top");
    return data;
  }

  static async getSearch({
    songName,
    artistName,
  }: {
    songName: string;
    artistName: string;
  }): Promise<ISearchDataType> {
    const { data } = await api.post<ISearchDataType>("/lyrics", {
      songName,
      artistName,
    });

    return data;
  }
}
