import { Search, UserRound, House, AlignJustify, X } from "lucide-react";
import { useReducer, useRef } from "react";
import { DropdownMenu } from "./components/dropdownMenu";

export const NavBar = () => {
  const [openSideMenu, toggleOpenSideMenu] = useReducer((prev) => !prev, false);
  const [openUserMenu, toggleOpenUserMenu] = useReducer((prev) => !prev, false);
  const sideMenuRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: any) => {
    if (sideMenuRef.current && !sideMenuRef.current.contains(event.target)) {
      toggleOpenSideMenu();
    }
  };

  return (
    <>
      <div className="flex flex-row justify-between items-center md:px-5 sm:px-2 h-10">
        <div className="text-white text-xl font-bold hidden sm:block">
          spoofy
        </div>

        <div className="flex flex-row items-center gap-4 w-full sm:max-w-md md:w-1/3">
          <div className="bg-[#2c3444] w-12 h-10 hidden sm:flex items-center justify-center rounded-full p-1">
            <button className="focus:outline-none">
              <House className="w-6 h-6" />
            </button>
          </div>

          <div className="relative w-full">
            <input
              type="text"
              placeholder="Procure músicas ou desafios"
              className="w-full bg-[#2c3444] text-gray-400 h-10 rounded-full py-2 px-4 pl-10 text-sm brightness-100 hover:brightness-125 transition ease-in-out"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>

          <div className="block sm:hidden bg-[#2c3444] w-12 h-10 flex items-center justify-center rounded-full p-1">
            <button onClick={toggleOpenSideMenu}>
              {!openSideMenu ? <AlignJustify /> : <X />}
            </button>
          </div>
        </div>

        <div className="relative hidden sm:block">
          <button className="focus:outline-none" onClick={toggleOpenUserMenu}>
            <UserRound className="w-6 h-6" color="#4ade80" />
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
        <div className="p-4 overflow-auto">
          <p className="text-white whitespace-normal break-words">
            {
              "rewonutrgvurenvierjnvnvrruvrriiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiinnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnwllllllllllllnfvneirjnn"
            }
          </p>
        </div>
      </div>
    </>
  );
};
