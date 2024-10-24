import { api } from "../../../services/axios-config/api";
import { IPlaylist } from "../types";

export class PlaylistSideBarServices {
  static async get(): Promise<IPlaylist[]> {
    const { data } = await api.get("/playlists");
    return data;
  }

  static async create(playlistName: string): Promise<IPlaylist[]> {
    const { data } = await api.post(`/playlists/${playlistName}`);
    return data;
  }

  static async delete(playlistName: string): Promise<IPlaylist[]> {
    const { data } = await api.delete(`/playlists/${playlistName}`);
    return data;
  }
}
