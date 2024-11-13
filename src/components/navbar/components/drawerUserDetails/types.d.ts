import { IPlaylist } from "../../../playlistSideBar/types";

export interface IUserDetails {
 id?: string;
 name: string;
 email: string;
 password: string;
 role: UserRoles;
 photo?: string;
 myPlaylists?: Array<IPlaylist>;
}