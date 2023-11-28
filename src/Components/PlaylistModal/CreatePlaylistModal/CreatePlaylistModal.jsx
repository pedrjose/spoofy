import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import { createPlaylist } from "../../../Services/playlist.service";

export function CreatePlaylistModal() {
  const { register, handleSubmit, getValues } = useForm();
  const navigate = useNavigate();

  const submitFormData = async () => {
    const { artist } = getValues();

    const response = await createPlaylist(Cookies.get("profileId"), artist);

    console.log(response);

    navigate("/profile");
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(submitFormData)}
        className="space-y-4"
        action="#"
        method="POST"
      >
        <input
          {...register("artist")}
          placeholder="ex.: The Beatles"
          type="text"
          className="input-settings block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Criar Playlist
        </button>
      </form>
    </>
  );
}
