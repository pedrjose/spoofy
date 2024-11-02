import { ISearchDataType } from "./type";
import { api } from "../axios-config/api";
import { IResponseData } from "../../@types/responseData";

export class SearchMusicServices {
  static async get({
    music,
    artist,
  }: {
    music: string;
    artist?: string;
  }): Promise<IResponseData<ISearchDataType>> {
    const { data } = await api.get("/lyrics", {
      params: {
        music,
        artist,
      },
    });
    return data;
  }
}
