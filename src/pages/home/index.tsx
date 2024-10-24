import { ListFilter } from "lucide-react";
import { CardSong } from "../../components/cardSong";
import { useQuery } from "@tanstack/react-query";
import { homeQueryKeys } from "./utils/queryKeys";
import { HomeServices } from "./services/index.service";
import { customToast } from "../../components/customToast/customToast";
import { Spinner } from "../../components/Spinner";
import { NotFound } from "../../components/notFound";
import { NavBar } from "../../components/navbar";
import { useState } from "react";
import { PlaylistSidebar } from "../../components/playlistSideBar";
import { ISearchDataType } from "../../components/navbar/services/type";
import { PlaylistSideBarServices } from "../../components/playlistSideBar/services";

export const Home = () => {
  const [searchData, setSearchData] = useState<ISearchDataType | null>();
  const [isLoadingSearchData, setIsLoadingSearchData] =
    useState<boolean>(false);

  const { isLoading, data } = useQuery({
    queryKey: homeQueryKeys.card_song,
    queryFn: async () => {
      try {
        const res = await HomeServices.getTop();
        return res.data.mus.month.all;
      } catch (error) {
        customToast({ msg: "Erro ao carregar músicas", type: "error" });
        throw error;
      }
    },
  });

  const {
    isLoading: isLoadingPlaylists,
    data: Playlists,
    refetch: refetchPlaylists,
  } = useQuery({
    queryKey: homeQueryKeys.playlist,
    queryFn: async () => {
      try {
        const res = await PlaylistSideBarServices.get();
        return res;
      } catch (error) {
        customToast({ msg: "Erro ao carregar playlists", type: "error" });
        throw error;
      }
    },
  });

  const isAnyLoading = isLoading || isLoadingSearchData || isLoadingPlaylists;

  return (
    <>
      <header className="mt-1">
        <NavBar
          setSearchData={setSearchData}
          setIsLoadingSearchData={setIsLoadingSearchData}
        />
      </header>

      <div className="flex gap-1 p-2" style={{ height: "calc(100vh - 66px)" }}>
        <aside className="w-80 hidden md:block text-white">
          {isLoadingPlaylists ? (
            <div className="flex justify-center items-center h-full">
              <Spinner />
            </div>
          ) : (
            <PlaylistSidebar playlists={Playlists} refetch={refetchPlaylists} />
          )}
        </aside>

        <main className="flex-1 bg-[#56595e30] p-2 rounded-lg overflow-y-auto scrollbar-thin scrollbar-thumb-[#4ade8086] scrollbar-track-[#2c3444] mr-1 text-white">
          <div className="my-1 flex flex-row justify-between items-center pr-1">
            <h1 className="text-2xl font-bold mb-5 uppercase tracking-wide">
              {"Escolha Sua Próxima Música"}
            </h1>

            <button>
              <ListFilter className="w-[100px]" />
            </button>
          </div>

          {isAnyLoading ? (
            <div className="flex justify-center items-center h-64">
              <Spinner />
            </div>
          ) : data ? (
            <div className="flex flex-row flex-wrap gap-6 md:justify-start justify-center">
              <CardSong songs={(data || searchData) ?? []} />
            </div>
          ) : (
            <NotFound />
          )}
        </main>
      </div>
    </>
  );
};
