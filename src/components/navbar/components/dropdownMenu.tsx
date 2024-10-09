import { useMutation } from "@tanstack/react-query";
import { LogoutServices } from "../services/index.service";
import { useAuthContext } from "../../../context/auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { customToast } from "../../customToast/customToast";
import { Loader } from "lucide-react";

export const DropdownMenu = () => {
  const { setAuthToken } = useAuthContext();
  const navigate = useNavigate();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async () => {
      const response = await LogoutServices.logout();
      setAuthToken("");
      console.log("res:", response);
    },
    onSuccess: () => {
      navigate("/");
    },
    onError: () =>
      customToast({ msg: "Erro ao tentar deslogar", type: "error" }),
  });

  return (
    <div className="absolute right-0 w-44 z-10 bg-[#2c3444] rounded-lg divide-gray-600">
      <ul className="py-2 text-sm text-gray-700">
        <li>
          <a
            onClick={() =>
              customToast({
                msg: "Dois reais ou um erro misterioso",
                type: "warning",
              })
            }
            className="block px-3 py-2 hover:bg-[#39445a28] text-sm font-medium text-slate-100 cursor-pointer"
          >
            {"Configurações"}
          </a>
        </li>
        <li>
          <a
            onClick={() => mutateAsync()}
            className={`block px-3 py-2 hover:bg-[#442c347f] text-red-500 text-sm font-medium cursor-pointer ${
              isPending ? "flex items-center justify-center" : ""
            } `}
          >
            {isPending ? (
              <Loader className="animate-spin w-4 h-4 mr-2" />
            ) : (
              "Sign out"
            )}
          </a>
        </li>
      </ul>
    </div>
  );
};
