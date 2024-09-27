import { Outlet } from "react-router-dom";
import { NavBar } from "../../components/navbar";

export const LayoutDefault = () => {
  return (
    <div className="flex flex-col h-dvh bg-gray-900 text-slate-200">
      <header className="pt-1">
        <NavBar />
      </header>

      <main className="flex-grow p-2">
        <Outlet />
      </main>
    </div>
  );
};
