export interface IPlaylist {
  playlistName: string;
  playlistLyrics: ILyric[];
}

export interface ILyric {
  artist: string;
  musicName: string;
  musicLyric: string;
  translate: string;
  badwords: boolean;
}
