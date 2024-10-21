import { Search, UserRound, AlignJustify, X } from "lucide-react";
import { useReducer, useRef, useState } from "react";
import { DropdownMenu } from "./components/dropDownMenu/dropdownMenu";
import { useQuery } from "@tanstack/react-query";
import { NavBarServices } from "./services/index.service";
import { customToast } from "../customToast/customToast";
import { SideBar } from "./components/sideBarMenu";
interface INavBar {
  setSearchData: (data: any) => void;
  setIsLoadingSearchData: (isLoading: boolean) => void;
}

export const NavBar = ({ setSearchData, setIsLoadingSearchData }: INavBar) => {
  const [openSideMenu, toggleOpenSideMenu] = useReducer((prev) => !prev, false);
  const [openUserMenu, toggleOpenUserMenu] = useReducer((prev) => !prev, false);
  const sideMenuRef = useRef<HTMLDivElement>(null);
  const [inputSearch, setInputSearch] = useState("");

  const { isLoading } = useQuery({
    queryKey: ["search", inputSearch],
    queryFn: async () => {
      try {
        const data = await NavBarServices.searchMusic({
          music: inputSearch,
        });

        setSearchData(data ?? []);
        setIsLoadingSearchData(isLoading);
      } catch (error) {
        customToast({ msg: "Musica não encontrada", type: "error" });
      }
    },
  });

  const handleClickOutside = (event: any) => {
    if (sideMenuRef.current && !sideMenuRef.current.contains(event.target)) {
      toggleOpenSideMenu();
    }
  };

  return (
    <>
      <div className="flex flex-row justify-between items-center px-2 h-[50px]">
        <div className="text-white text-xl font-bold hidden sm:block md:pl-[10px]">
          spoofy
        </div>

        <div className="flex flex-row items-center gap-4 w-full  sm:max-w-md ">
          <div className="relative w-full flex justify-start items-center">
            <input
              type="text"
              placeholder="Procurar músicas"
              onChange={(e) => setInputSearch(e.target.value)}
              className="w-full bg-[#2c3444]  text-gray-400 h-12 rounded-full px-3 pl-12 text-lg brightness-100 hover:brightness-125 transition ease-in-out"
            />
            <Search className="absolute left-2  h-7 w-7 text-gray-400" />
          </div>

          <div className="block sm:hidden bg-[#2c3444] w-12 h-10 flex items-center justify-center rounded-full p-1">
            <button onClick={toggleOpenSideMenu}>
              {!openSideMenu ? <AlignJustify /> : <X />}
            </button>
          </div>
        </div>

        <div className="relative hidden sm:block bg-[#2c3444] w-12 h-12 hidden sm:flex items-center justify-center rounded-full p-1">
          <button className="focus:outline-none" onClick={toggleOpenUserMenu}>
            <UserRound className="w-7 h-7" color="#4ade80" />
          </button>

          {openUserMenu && <DropdownMenu />}
        </div>
      </div>

      {openSideMenu && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30"
          onClick={handleClickOutside}
        />
      )}

      <div
        ref={sideMenuRef}
        className={`z-40 fixed top-0 left-0 h-full w-64 bg-[#2c3444] transform transition-transform duration-300 ${
          openSideMenu ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SideBar />
      </div>
    </>
  );
};
