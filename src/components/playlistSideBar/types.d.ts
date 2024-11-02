export interface IPlaylist {
  playlistName: string;
  playlistLyrics: ILyric[];
  _id: string;
}

export interface ILyric {
  artist: string;
  musicName: string;
  musicLyric: string;
  translate: string;
  badwords: boolean;
}
