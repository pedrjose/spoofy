import { ListFilter } from "lucide-react";
import { CardSong } from "../../components/cardSong";

const songs = [
  {
    id: 1,
    name: "Stairway to Heaven",
    artist: "Led Zeppelin",
    unlocked: true,
    favorite: true,
  },
  { id: 1, name: "Stairway to Heaven", artist: "Led Zeppelin", unlocked: true },
  { id: 1, name: "Stairway to Heaven", artist: "Led Zeppelin", unlocked: true },
  { id: 1, name: "Stairway to Heaven", artist: "Led Zeppelin", unlocked: true },
  { id: 1, name: "Stairway to Heaven", artist: "Led Zeppelin", unlocked: true },
  {
    id: 1,
    name: "Stairway to Heaven",
    artist: "Led Zeppelin",
    unlocked: false,
  },
  {
    id: 1,
    name: "Stairway to Heaven",
    artist: "Led Zeppelin",
    unlocked: false,
  },
  {
    id: 1,
    name: "Stairway to Heaven",
    artist: "Led Zeppelin",
    unlocked: false,
  },
  { id: 1, name: "Stairway to Heaven", artist: "Led Zeppelin", unlocked: true },
  { id: 1, name: "Stairway to Heaven", artist: "Led Zeppelin", unlocked: true },
  { id: 1, name: "Stairway to Heaven", artist: "Led Zeppelin", unlocked: true },
  { id: 1, name: "Stairway to Heaven", artist: "Led Zeppelin", unlocked: true },
  { id: 1, name: "Stairway to Heaven", artist: "Led Zeppelin", unlocked: true },
];
export const Home = () => {
  return (
    <div className="flex h-full gap-2 ">
      <aside className="w-80 bg-[#2c3444] hidden sm:block text-white p-4 rounded-lg">
        <h2 className="text-lg font-bold">mwdioeiwdoiw</h2>
      </aside>

      <main className="flex-1 bg-[#2c3444] p-2 rounded-lg overflow-y-auto max-h-[calc(100vh-64px)] scrollbar-thin scrollbar-thumb-[#4ade8086] scrollbar-track-[#2c3444]">
        <div className="my-7 flex flex-row justify-between pr-5">
          <h1 className="text-2xl font-bold  mb-4 uppercase tracking-wide">
            {"ESCOLHA SUA PRÓXIMA MÚSICA"}
          </h1>
          <button>
            <ListFilter className="w-[100px] " />
          </button>
        </div>

        <div className="flex flex-row flex-wrap gap-6">
          <CardSong songs={songs} />
        </div>
      </main>
    </div>
  );
};
