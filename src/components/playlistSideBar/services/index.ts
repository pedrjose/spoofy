import { IResponseData } from "../../../@types/responseData";
import { api } from "../../../services/axios-config/api";
import { ISearchDataType } from "../../../services/searchMusic/type";
import { IPlaylist } from "../types";

export class PlaylistSideBarServices {
  static async get(): Promise<IResponseData<IPlaylist[]>> {
    const { data } = await api.get("/playlists");
    return data;
  }

  static async create(playlistName: string): Promise<IPlaylist[]> {
    const { data } = await api.post(`/playlist/${playlistName}`);
    return data;
  }

  static async delete(playlistId: string): Promise<IPlaylist[]> {
    const { data } = await api.delete(`/playlist/${playlistId}`);
    return data;
  }

  static async addSongToPlaylist(
    playlistId: string,
    searchDataSelected: ISearchDataType
  ): Promise<void> {
    const { data } = await api.patch(`/playlist/lyrics`, {
      playlistId,
      searchDataSelected,
    });
    return data;
  }
}
