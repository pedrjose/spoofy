import { useState } from "react";
import { PlusCircle, Music, Trash2 } from "lucide-react";
import { DeleteModal } from "./deleteModal";
import { IPlaylist } from "./types";
import { useMutation } from "@tanstack/react-query";
import { PlaylistSideBarServices } from "./services";
import { IErrorResponse } from "../../@types/errorResponse";
import { customToast } from "../customToast/customToast";
import { Spinner } from "../Spinner";

interface IPlaylistSideBar {
  playlists?: IPlaylist[];
  refetch?: () => void;
}

export const PlaylistSidebar = ({ playlists, refetch }: IPlaylistSideBar) => {
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [isAddingPlaylist, setIsAddingPlaylist] = useState(false);
  const [playlistToDelete, setPlaylistToDelete] = useState<IPlaylist | null>(
    null
  );

  const addPlaylist = () => {
    if (!newPlaylistName.trim()) return;
    mutateAsync(newPlaylistName);

    setNewPlaylistName("");
    setIsAddingPlaylist(false);
  };

  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (playlistName: string) => {
      const data = await PlaylistSideBarServices.create(playlistName);
      return data;
    },
    onError(error: IErrorResponse) {
      const errorMessage = error.response?.data?.errors[0].message;
      customToast({
        msg: errorMessage || "Erro ao tentar criar uma playlist",
        type: "error",
      });
    },
    onSuccess() {
      refetch && refetch();
    },
  });

  const deletePlaylist = (playlist: IPlaylist) => {
    console.log(playlist);
    setPlaylistToDelete(null);
  };

  return (
    <div className="w-full h-full rounded-lg bg-gray-800 text-white p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Suas Playlists</h2>
        <button
          disabled={isPending}
          onClick={() => setIsAddingPlaylist(true)}
          className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-full transition-colors duration-200"
          aria-label="Adicionar nova playlist"
        >
          <PlusCircle className="h-5 w-5" />
        </button>
      </div>

      {isPending ? (
        <div className="flex justify-center items-center h-[500px] border border-gray-700 rounded-lg p-2">
          <Spinner />
        </div>
      ) : (
        <div className="h-[500px] border border-gray-700 rounded-lg p-2 overflow-y-auto">
          {playlists?.map((playlist, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-2 px-3 group hover:bg-gray-700 rounded-md transition-colors duration-200"
            >
              <div className="flex items-center space-x-3">
                <Music className="h-5 w-5 text-green-500" />
                <span className="font-medium">{playlist.playlistName}</span>
              </div>
              <button
                className="p-1 text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                onClick={() => setPlaylistToDelete(playlist)}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {isAddingPlaylist && (
        <div className="mt-4 space-y-2">
          <input
            type="text"
            disabled={isPending}
            placeholder="Nome da playlist"
            value={newPlaylistName}
            onChange={(e) => setNewPlaylistName(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <div className="flex gap-2">
            <button
              disabled={isPending || !newPlaylistName}
              onClick={addPlaylist}
              className={`flex-1 px-4 py-2 rounded-md transition-colors duration-200 text-white ${
                !newPlaylistName
                  ? "brightness-50 bg-green-500 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              Adicionar
            </button>

            <button
              disabled={isPending}
              onClick={() => setIsAddingPlaylist(false)}
              className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors duration-200"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {playlistToDelete && (
        <DeleteModal
          playlist={playlistToDelete}
          onCancel={() => setPlaylistToDelete(null)}
          onDelete={deletePlaylist}
        />
      )}
    </div>
  );
};
