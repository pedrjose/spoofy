import { useState } from "react";
import { X, Camera } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { DrawerUserDetailsServices } from "./services";
import { customToast } from "../../../customToast/customToast";

interface IDrawerUserDetails {
  open: boolean;
  onClose: () => void;
}

export const DrawerUserDetails = ({ onClose, open }: IDrawerUserDetails) => {
  const [imagePreview, setImagePreview] = useState("/placeholder.svg");

  const { data } = useQuery({
    queryKey: ["DrawerUserDetails"],
    queryFn: async () => {
      try {
        const res = await DrawerUserDetailsServices.getDetails();
        return res.data;
      } catch (error) {
        customToast({ msg: "Erro ao carregar os dados", type: "error" });
        throw error;
      }
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => onClose()}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-[#1A1B1F] z-50 transform transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full text-white">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-[#282828]">
            <h2 className="text-lg font-bold">Configurações</h2>
            <button
              onClick={() => onClose()}
              className="p-2 hover:bg-[#282828] rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Profile Image */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative group">
                <img
                  src={imagePreview || data?.photo}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover"
                />
                <label className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                  <Camera className="w-6 h-6 text-white" />
                  <input
                    disabled={!!data?.photo}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
              <span className="text-sm text-[#B3B3B3]">
                Clique para alterar a foto
              </span>
            </div>

            {/* User Information */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm text-[#B3B3B3]">
                  Nome
                </label>
                <input
                  type="text"
                  id="name"
                  value={data?.name}
                  disabled
                  placeholder="Seu nome"
                  className="w-full bg-[#282828] text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1ED760]"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm text-[#B3B3B3]">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={data?.email}
                  disabled
                  placeholder="seu@email.com"
                  className="w-full bg-[#282828] text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1ED760]"
                />
              </div>
            </div>

            {/* Settings Options */}
            {/* <div className="space-y-4">
              <button className="w-full flex items-center space-x-3 p-3 hover:bg-[#282828] rounded-md transition-colors">
                <LogOut className="w-5 h-5 text-[#1ED760]" />
                <span>Sair</span>
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};
