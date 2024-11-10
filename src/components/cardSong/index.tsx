import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { learningPageRoutes } from "../../pages/learningPage/utils/routes";
import { ISearchDataType } from "../../services/searchMusic/type";
import { useMutation } from "@tanstack/react-query";
import { SearchMusicServices } from "../../services/searchMusic";

interface ICardSong {
  songs: ISearchDataType[];
}

export const CardSong = ({ songs }: ICardSong) => {
  const navigate = useNavigate();

  const { mutateAsync } = useMutation({
    mutationFn: async (song: ISearchDataType) => {
      if (!!song.lyrics) {
        return navigate(
          learningPageRoutes.learningPage(decodeURIComponent(song.lyrics))
        );
      }
      const { data } = await SearchMusicServices.getById(song.musicId);
      if (!!data.lyrics) {
        return navigate(
          learningPageRoutes.learningPage(decodeURIComponent(data.lyrics))
        );
      }
    },
  });

  return (
    <>
      {songs?.map((song) => (
        <motion.div
          key={song.id}
          className="relative w-[260px] bg-[#232d3df4] rounded-lg p-3 flex flex-col justify-between"
          whileHover={{ scale: 1.02 }}
        >
          <div className="w-full  h-40 bg-[#0F172A] rounded-md mb-1 flex items-center justify-center overflow-hidden ">
            <img
              src={song.albumArt || song.image}
              alt={`${song.title} image`}
              className="object-cover w-full transition duration-700 ease-in-out grayscale hover:grayscale-0"
            />
          </div>

          <div className="py-1">
            <p className="text-md text-gray-400">{song.title}</p>
          </div>

          <button
            onClick={() => mutateAsync(song)}
            className="w-full bg-[#4ADE80] text-[#0F172A] font-semibold py-2 rounded-md hover:bg-green-400 transition-colors duration-300 animate-pulse "
          >
            Selecionar
          </button>
        </motion.div>
      ))}
    </>
  );
};
