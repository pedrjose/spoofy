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

export const Home = () => {
  const [searchData, setSearchData] = useState();
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

  return (
    <>
      <header className="p-1">
        <NavBar
          setSearchData={setSearchData}
          setIsLoadingSearchData={setIsLoadingSearchData}
        />
      </header>

      <div className="flex gap-1 p-2" style={{ height: "calc(100vh - 66px)" }}>
        <aside className="w-80 hidden md:block text-white">
          <PlaylistSidebar />
        </aside>

        <main className="flex-1 bg-[#56595e30] p-2 rounded-lg overflow-y-auto scrollbar-thin scrollbar-thumb-[#4ade8086] scrollbar-track-[#2c3444] mr-1 text-white">
          <div className="my-7 flex flex-row justify-between items-center pr-1">
            <h1 className="text-2xl font-bold mb-4 uppercase tracking-wide">
              {"Escolha Sua Próxima Música"}
            </h1>

            <button>
              <ListFilter className="w-[100px]" />
            </button>
          </div>

          {isLoading || isLoadingSearchData ? (
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
