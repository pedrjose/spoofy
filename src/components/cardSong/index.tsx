import { motion } from "framer-motion";
import { Music as MusicData } from "./types";
import { useNavigate } from "react-router-dom";
import { learningPageRoutes } from "../../pages/learningPage/utils/routes";

interface ICardSong {
  songs: MusicData[];
}

export const CardSong = ({ songs }: ICardSong) => {
  const navigate = useNavigate();
  return (
    <>
      {songs.map((song) => (
        <motion.div
          key={song.id}
          className="relative w-[260px] bg-[#232d3df4] rounded-lg p-3 flex flex-col justify-between"
          whileHover={{ scale: 1.02 }}
          onClick={() => navigate(learningPageRoutes.learningPage(song.id))}
        >
          <div className="w-full h-49 bg-[#0F172A] rounded-md mb-1 flex items-center justify-center overflow-hidden ">
            <img
              src={song.art.pic_medium}
              alt={`${song.art.name} image`}
              className="object-cover w-full h-full transition duration-700 ease-in-out grayscale hover:grayscale-0"
            />
          </div>

          <div className="py-1">
            <h3 className="font-semibold text-lg text-white">{song.name}</h3>
            <p className="text-sm text-gray-400">{song.art.name}</p>
          </div>

          <button className="w-full bg-[#4ADE80] text-[#0F172A] font-semibold py-2 rounded-md hover:bg-green-400 transition-colors duration-300 animate-pulse ">
            Selecionar
          </button>
        </motion.div>
      ))}
    </>
  );
};
