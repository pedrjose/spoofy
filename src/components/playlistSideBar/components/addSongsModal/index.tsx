import { useState } from "react";
import { Plus } from "lucide-react";
import { SearchSongs } from "../../../searchSongs";
import { ISearchDataType } from "../../../../services/searchMusic/type";
import { Spinner } from "../../../Spinner";
import { useMutation } from "@tanstack/react-query";
import { PlaylistSideBarServices } from "../../services";
import { customToast } from "../../../customToast/customToast";
import { IErrorResponse } from "../../../../@types/errorResponse";

interface AddSongModalProps {
  onClose: () => void;
  refetch?: () => void;
  playlistId: string;
}

export const AddSongModal = ({
  onClose,
  refetch,
  playlistId,
}: AddSongModalProps) => {
  const [searchData, setSearchData] = useState<ISearchDataType | null>();
  const [isLoadingSearchData, setIsLoadingSearchData] =
    useState<boolean>(false);

  const { isPending, mutateAsync } = useMutation({
    mutationFn: async ({
      playlistId,
      searchDataSelected,
    }: {
      playlistId: string;
      searchDataSelected: ISearchDataType;
    }) => {
      await PlaylistSideBarServices.addSongToPlaylist(
        playlistId,
        searchDataSelected
      );
    },
    onError(error: IErrorResponse) {
      const errorMessage = error.response?.data?.errors[0].message;
      customToast({
        msg: errorMessage || "Erro ao tentar deletar uma playlist",
        type: "error",
      });
    },
    onSuccess() {
      refetch && refetch();
    },
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-gray-900 p-6 rounded-lg w-5/12 max-h-[80vh] flex flex-col">
        <h2 className="text-xl font-bold mb-4 text-white">
          Adicionar Música à Playlist
        </h2>
        <div className="mb-5">
          <SearchSongs
            setSearchData={setSearchData}
            setIsLoadingSearchData={setIsLoadingSearchData}
          />
        </div>
        <div className="flex-grow overflow-y-auto mb-4">
          {isLoadingSearchData || isPending ? (
            <Spinner />
          ) : (
            searchData && (
              <div
                // key={searchData.mus.}
                className="flex justify-between items-center py-2 px-3 hover:bg-gray-700 rounded-md"
              >
                <div>
                  <p className="text-white font-medium">
                    {searchData.art.name}
                  </p>
                  <p className="text-gray-400 text-sm">{searchData.art.id}</p>
                </div>
                <button
                  onClick={() =>
                    mutateAsync({ playlistId, searchDataSelected: searchData })
                  }
                  className="p-1 bg-green-600 hover:bg-green-700 text-white rounded-full transition-colors duration-200"
                  aria-label={`Adicionar ${searchData.art.name}`}
                >
                  <Plus size={18} />
                </button>
              </div>
            )
          )}
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors duration-200"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
