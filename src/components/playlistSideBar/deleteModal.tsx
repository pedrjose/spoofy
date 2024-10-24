import { X } from "lucide-react";
import { useRef, useEffect } from "react";
import { IPlaylist } from "./types";

interface DeleteModalProps {
  playlist: IPlaylist | null;
  onCancel: () => void;
  onDelete: (playlist: IPlaylist) => void;
}

export const DeleteModal = ({
  playlist,
  onCancel,
  onDelete,
}: DeleteModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onCancel();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onCancel]);

  if (!playlist) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div
        ref={modalRef}
        className="bg-gray-800 rounded-lg p-6 max-w-sm w-full"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Confirmar exclusão</h3>
          <button onClick={onCancel} className="text-gray-400 hover:text-white">
            <X className="h-4 w-4" />
          </button>
        </div>
        <p className="mb-4">
          Tem certeza que deseja excluir a playlist "{playlist.playlistName}"? Esta ação
          não pode ser desfeita.
        </p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors duration-200"
          >
            Cancelar
          </button>
          <button
            onClick={() => onDelete(playlist)}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors duration-200"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
};
