import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const SearchSchema = z.object({
  artist: z.string().nonempty("Informe um artista ou banda"),
  music: z.string().nonempty("Informe uma música do artista citado"),
});

export function SearchModal() {
  const [solvingPromise, setSolvingPromise] = useState(false);

  const submitFormData = async () => {
    const { artist, music } = getValues();

    console.log(`Você pesquisou a música ${music} do artista ${artist}`);
  };

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SearchSchema),
  });
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 pl-4 pr-4">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            onSubmit={handleSubmit(submitFormData)}
            className="space-y-6"
            action="#"
            method="POST"
          >
            <div>
              <div className="mt-2">
                <input
                  {...register("artist")}
                  placeholder="Artista ou Banda"
                  type="text"
                  className="input-settings block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.artist ? (
                  <span className="block text-sm font-medium leading-6 text-orange-400 pt-1.5">
                    {errors.artist.message}
                  </span>
                ) : null}
              </div>
            </div>

            <div>
              <div className="mt-2">
                <input
                  {...register("music")}
                  placeholder="Música"
                  type="text"
                  className="input-settings block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.music ? (
                  <span className="block text-sm font-medium leading-6 text-orange-400 pt-1.5">
                    {errors.music.message}
                  </span>
                ) : null}
              </div>
            </div>

            <div className="center-basic">
              {!solvingPromise ? (
                <button className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Pesquisar
                </button>
              ) : (
                <solvingPromise />
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
