import { Outlet } from "react-router-dom";
import { NavBar } from "../../components/navbar";
import { useState } from "react";

export const LayoutDefault = () => {
  const [navBarData, setNavBarData] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  console.log(navBarData);
  return (
    <div className="flex flex-col h-dvh bg-gray-900 text-slate-200 ">
      <header className="p-1">
        <NavBar
          setSearchData={setNavBarData}
          setIsLoadingSearchData={setIsLoading}
        />
      </header>

      <main className="flex-grow p-2">
        <Outlet context={{ navBarData, isLoading }} />
      </main>
    </div>
  );
};
