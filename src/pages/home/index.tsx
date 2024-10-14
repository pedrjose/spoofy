import { ListFilter } from "lucide-react";
import { CardSong } from "../../components/cardSong";
import { useQuery } from "@tanstack/react-query";
import { homeQueryKeys } from "./utils/queryKeys";
import { HomeServices } from "./services/index.service";
import { customToast } from "../../components/customToast/customToast";
import { Spinner } from "../../components/Spinner";
import { useOutletContext } from "react-router-dom";
import { NotFound } from "../../components/notFound";

export const Home = () => {
  const { navBarData, isLoading: isLoadingSearch } = useOutletContext<any>();

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
    <div className="flex h-full gap-1">
      <aside className="w-80 bg-[#56595e30] hidden md:block text-white p-4 rounded-lg">
        <h2 className="text-lg font-bold">Explorar Músicas</h2>
      </aside>

      <main className="flex-1 bg-[#56595e30] p-2 rounded-lg overflow-y-auto max-h-[calc(100vh-64px)] scrollbar-thin scrollbar-thumb-[#4ade8086] scrollbar-track-[#2c3444] mr-1">
        <div className="my-7 flex flex-row justify-between items-center pr-1">
          <h1 className="text-2xl font-bold mb-4 uppercase tracking-wide">
            Escolha Sua Próxima Música
          </h1>

          <button>
            <ListFilter className="w-[100px]" />
          </button>
        </div>

        {isLoading || isLoadingSearch ? (
          <div className="flex justify-center items-center h-64">
            <Spinner />
          </div>
        ) : data || navBarData ? (
          <div className="flex flex-row flex-wrap gap-6 md:justify-start justify-center">
            <CardSong songs={(data || navBarData) ?? []} />
          </div>
        ) : (
          <NotFound />
        )}
      </main>
    </div>
  );
};
