import { useMutation } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { useState } from "react";
import { NavBarServices } from "../../services/index.service";
import { customToast } from "../../../customToast/customToast";

export const SearchSongs = () => {
  const [songName, setSongName] = useState("");
  const [artistName, setArtistName] = useState("");

  const handleSearch = () => {
    mutateAsync({ artistName, songName });
  };

  const { isPending, mutateAsync } = useMutation({
    mutationFn: async ({
      songName,
      artistName,
    }: {
      songName: string;
      artistName: string;
    }) => {
      try {
        const data = await NavBarServices.searchMusic({
          music: songName,
          artist: artistName,
        });
        return data;
      } catch (error) {
        customToast({ msg: "Musica não encontrada", type: "error" });
      }
    },
  });

  return (
    <div className="flex items-center bg-gray-800 rounded-3xl brightness-100 hover:brightness-125 transition ease-in-out p-1">
      <input
        type="text"
        placeholder="música"
        value={songName}
        onChange={(e) => setSongName(e.target.value)}
        className="border-e-[#3e424a] border-e w-full h-10 pl-2 text-lg text-white bg-transparent focus:outline-none"
        aria-label="música"
      />

      <div className="w-px bg-gray-700 my-1" />

      <input
        type="text"
        placeholder="artista"
        value={artistName}
        onChange={(e) => setArtistName(e.target.value)}
        className="w-full h-10 pl-2 text-lg text-white bg-transparent focus:outline-none"
        aria-label="artista"
      />

      <button
        onClick={handleSearch}
        disabled={!artistName || !songName || isPending}
        className={`h-9 text-white px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 
    ${
      !artistName || !songName || isPending
        ? "cursor-not-allowed opacity-50"
        : ""
    }`}
        aria-label="Iniciar busca"
      >
        <Search className="h-8 w-8" />
      </button>
    </div>
  );
};
