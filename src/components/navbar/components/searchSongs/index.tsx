import { useMutation } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { useState } from "react";
import { NavBarServices } from "../../services/index.service";
import { customToast } from "../../../customToast/customToast";
import { ISearchDataType } from "../../services/type";
import { IErrorResponse } from "../../../../@types/errorResponse";

interface ISearchSongs {
  setSearchData: (value: ISearchDataType | null) => void;
  setIsLoadingSearchData: (isLoading: boolean) => void;
}

export const SearchSongs = ({
  setSearchData,
  setIsLoadingSearchData,
}: ISearchSongs) => {
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
      const data = await NavBarServices.searchMusic({
        music: songName,
        artist: artistName,
      });

      setSearchData(data);
      setIsLoadingSearchData(isPending);
      return data;
    },
    onError(error: IErrorResponse) {
      const errorMessage = error.response?.data?.errors[0].message;
      customToast({
        msg: errorMessage || "Musica não encontrada",
        type: "error",
      });
    },
  });

  return (
    <div className="flex items-center bg-gray-800 rounded-3xl brightness-100 hover:brightness-125 transition ease-in-out p-1">
      <input
        type="text"
        placeholder="Música"
        value={songName}
        onChange={(e) => setSongName(e.target.value)}
        className="border-e-[#3e424a] border-e w-full h-9 pl-2 text-lg text-white text-center bg-transparent focus:outline-none"
        aria-label="Música"
      />

      <div className="w-px bg-gray-700 my-1" />

      <input
        type="text"
        placeholder="Artista"
        value={artistName}
        onChange={(e) => setArtistName(e.target.value)}
        className="w-full h-9 pl-2 text-lg text-center text-white bg-transparent focus:outline-none"
        aria-label="Artista"
      />

      <button
        onClick={handleSearch}
        disabled={!artistName || !songName || isPending}
        className={`h-9 text-white px-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 
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
