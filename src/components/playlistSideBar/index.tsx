import { useState } from "react";
import { PlusCircle, Music, X } from "lucide-react";

interface Playlist {
  id: number;
  name: string;
  songs: string[];
}

export const PlaylistSidebar = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([
    { id: 1, name: "Favoritas", songs: ["Song 1", "Song 2"] },
    { id: 2, name: "Rock", songs: ["Song 3", "Song 4"] },
  ]);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [isAddingPlaylist, setIsAddingPlaylist] = useState(false);

  const addPlaylist = () => {
    if (newPlaylistName.trim()) {
      setPlaylists([
        ...playlists,
        { id: Date.now(), name: newPlaylistName, songs: [] },
      ]);
      setNewPlaylistName("");
      setIsAddingPlaylist(false);
    }
  };

  const deletePlaylist = (id: number) => {
    setPlaylists(playlists.filter((playlist) => playlist.id !== id));
  };

  return (
    <div className="w-full h-full rounded-lg bg-[#56595e30] text-white p-4">
      <h2 className="text-xl font-bold mb-2">Suas Playlists</h2>
      <div className="h-[500px] border border-[#56595e30] rounded-2xl p-2">
        {playlists.map((playlist) => (
          <div
            key={playlist.id}
            className="flex items-center justify-between py-2 group"
          >
            <div className="flex items-center">
              <Music className="mr-2 h-4 w-4" />
              <span>{playlist.name}</span>
            </div>
            <button
              onClick={() => deletePlaylist(playlist.id)}
              className="text-gray-400 hover:text-white hidden group-hover:block"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      {isAddingPlaylist ? (
        <div className="mt-2">
          <input
            type="text"
            placeholder="Nome da playlist"
            value={newPlaylistName}
            onChange={(e) => setNewPlaylistName(e.target.value)}
            className="w-full bg-gray-800 text-white p-2 rounded mb-2"
          />
          <button
            onClick={addPlaylist}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded"
          >
            Adicionar
          </button>
        </div>
      ) : (
        <button
          onClick={() => setIsAddingPlaylist(true)}
          className="w-full mt-2 bg-gray-800 hover:bg-gray-700 text-white py-2 rounded flex items-center justify-center"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Nova Playlist
        </button>
      )}
    </div>
  );
};
