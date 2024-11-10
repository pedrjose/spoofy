import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../services/axios-config/api";

interface CreateReviewFormProps {
  onSuccess?: () => void;
}

const CreateReviewForm: React.FC<CreateReviewFormProps> = ({ onSuccess }) => {
  const [musicId, setMusicId] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState<string | null>(null);

  const { isPending, mutateAsync } = useMutation({
    mutationFn: async () => {
      const response = await api.post("review", {
        musicId,
        image,
        url,
      });
      return response.data;
    },
    onSuccess: () => {
      setMusicId("");
      setImage("");
      setUrl("");
      setError(null);

      if (onSuccess) onSuccess();
    },
    onError: (err: any) => {
      if (err.response && err.response.status === 409) {
        setError("Review já existe para essa música.");
      } else {
        setError("Erro ao criar review. Tente novamente.");
      }
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await mutateAsync();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg mt-9">
      <h2 className="text-2xl font-bold mb-6 text-center">Review</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="musicId" className="font-medium mb-1">
            Music ID:
          </label>
          <input
            type="text"
            id="musicId"
            value={musicId}
            onChange={(e) => setMusicId(e.target.value)}
            required
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="image" className="font-medium mb-1">
            Imagem URL:
          </label>
          <input
            type="text"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="url" className="font-medium mb-1">
            URL da Música:
          </label>
          <input
            type="text"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={isPending}
          className={`w-full py-2 px-4 mt-4 rounded-lg font-semibold text-white ${
            isPending ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isPending ? "Criando..." : "Criar Review"}
        </button>
      </form>
    </div>
  );
};

export default CreateReviewForm;
