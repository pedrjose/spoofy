import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";

import spoofy from "../../../public/logo/spoofy.png";
import { LoaderAnimation } from "../Animation/Loader";
import "./login.components.css";

import { initAccount } from "../../Services/user.service";

const SignUpSchema = z.object({
  email: z.string().nonempty("Este campo é obrigatório"),
  password: z
    .string()
    .nonempty("Este campo é obrigatório")
    .min(10, "A senha deve conter, no mínimo, 10 caracteres")
    .refine((password) => /[0-9]/.test(password), {
      message: "A senha deve conter pelo menos 1 número",
    })
    .refine((password) => /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password), {
      message: "A senha deve conter pelo menos 1 caractere especial",
    }),
  avatar: z.string().nonempty("Este campo é obrigatório"),
});

export function SignUpModal() {
  const navigate = useNavigate();

  const [solvingPromise, setSolvingPromise] = useState(false);
  const [promiseError, setPromiseError] = useState({
    error: false,
    message: "",
  });

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignUpSchema),
  });

  const submitFormData = async () => {
    const { email, password, avatar } = getValues();

    setSolvingPromise(true);
    const creating = await initAccount(email, password, avatar);
    setSolvingPromise(false);

    if (creating.error) {
      setPromiseError(creating);
    } else {
      navigate("/login");
    }
  };
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 pl-4 pr-4">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Link to="/">
            <img
              className="mx-auto h-10 w-auto"
              src={spoofy}
              alt="Your Company"
            />
          </Link>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            onSubmit={handleSubmit(submitFormData)}
            className="space-y-6"
            action="#"
            method="POST"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-white"
              >
                Melhor Email
              </label>
              <div className="mt-2">
                <input
                  {...register("email")}
                  placeholder="user@spoofy.com"
                  type="email"
                  className="input-settings block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.email ? (
                  <span className="block text-sm font-medium leading-6 text-orange-400 pt-1.5">
                    {errors.email.message}
                  </span>
                ) : null}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Melhor Senha
                </label>
              </div>
              <div className="mt-2">
                <input
                  {...register("password")}
                  placeholder="***********"
                  type="password"
                  className="input-settings block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.password ? (
                  <span className="block text-sm font-medium leading-6 text-orange-400 pt-1.5">
                    {errors.password.message}
                  </span>
                ) : null}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  <a
                    href="https://www.youtube.com/watch?v=OkJ9qfhNZBU"
                    target="_blank"
                  >
                    Avatar URL
                  </a>
                </label>
              </div>
              <div className="mt-2">
                <input
                  {...register("avatar")}
                  placeholder="i.imgur.com/JplfOLA.jpg"
                  type="text"
                  className="input-settings block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.avatar ? (
                  <span className="block text-sm font-medium leading-6 text-orange-400 pt-1.5">
                    {errors.avatar.message}
                  </span>
                ) : null}
              </div>
            </div>

            <div className="center-basic">
              {!solvingPromise ? (
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Cadastrar
                </button>
              ) : (
                <LoaderAnimation />
              )}
            </div>
            {promiseError.error && !solvingPromise ? (
              <span className="block text-sm font-medium leading-6 text-orange-400">
                {promiseError.message}
              </span>
            ) : null}
          </form>
        </div>
      </div>
    </>
  );
}
