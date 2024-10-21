import { Loader, LogOut } from "lucide-react";
import { sideBarMenuItems } from "./sideBarMenuItems";
import { useAuthContext } from "../../../../context/auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { NavBarServices } from "../../services/index.service";
import { customToast } from "../../../customToast/customToast";

export const SideBar = () => {
  const { setAuthToken } = useAuthContext();
  const navigate = useNavigate();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async () => {
      await NavBarServices.logout();
    },
    onSuccess: () => {
      setAuthToken("");
      navigate("/");
    },
    onError: () =>
      customToast({ msg: "Erro ao tentar deslogar", type: "error" }),
  });
  return (
    <div className="flex flex-col h-full w-64 bg-gray-900 text-gray-100">
      <div className="p-4">
        <h1 className="text-2xl font-bold">Logo</h1>
      </div>
      <nav className="flex-1">
        <ul className="space-y-2 px-2">
          {sideBarMenuItems.map((item, index) => (
            <li key={index}>
              <button className="flex items-center w-full px-4 py-2 text-left rounded-md hover:bg-gray-800 transition-colors">
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4">
        <div className="h-px bg-gray-700 my-4" />

        <button
          onClick={() => mutateAsync()}
          disabled={isPending}
          className={`flex items-center  ${
            isPending ? "justify-center" : ""
          } w-full px-4 py-2 text-left rounded-md text-red-400 hover:bg-red-400/10 hover:text-red-300 transition-colors`}
        >
          {isPending ? (
            <Loader className="animate-spin w-4 h-4 mr-2" />
          ) : (
            <>
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </>
          )}
        </button>
      </div>
    </div>
  );
};
