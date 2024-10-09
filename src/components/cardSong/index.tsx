import { Lock, Music, Star } from "lucide-react";
import { motion } from "framer-motion";

interface ICardSong {
  songs: any[];
}

export const CardSong = ({ songs }: ICardSong) => {
  return (
    <>
      {songs.map((song) => (
        <motion.div
          key={song.id}
          className={`relative w-[260px] bg-[#232d3df4] rounded-lg p-3`}
          whileHover={{ scale: 1.02 }}
          whileTap={{
            borderRadius: "100%",
          }}
        >
          <div className="w-full h-40 bg-[#0F172A] rounded-md mb-1 flex items-center justify-center">
            <Music className="w-10 h-10 text-[#4ADE80]" />
          </div>

          <div className="py-1">
            <h3 className="font-semibold text-lg">{song.name}</h3>
            <p className="text-sm text-gray-400">{song.artist}</p>
          </div>

          {song?.unlocked ? (
            <button className="w-full bg-[#4ADE80] text-[#0F172A] font-semibold py-2 rounded-md hover:bg-green-400 transition-colors duration-300 animate-pulse">
              {"Selecionar"}
            </button>
          ) : (
            <button className="w-full bg-gray-600 text-gray-300 font-semibold py-2 rounded-md cursor-not-allowed flex items-center justify-center">
              <Lock className="w-4 h-4 mr-2" /> {"Bloqueado"}
            </button>
          )}

          {song?.favorite && (
            <div className="absolute top-2 right-2">
              <Star className="w-6 h-6 text-yellow-400 fill-current" />
            </div>
          )}
        </motion.div>
      ))}
    </>
  );
};
