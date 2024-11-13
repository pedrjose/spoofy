import { joiResolver } from "@hookform/resolvers/joi";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ChevronRight, Eye, EyeOff, Loader2, Music } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { IErrorResponse } from "../../@types/errorResponse";
import { customToast } from "../../components/customToast/customToast";
import { schema } from "./schema";
import { RegisterService } from "./services/registerService";
import { IRegisterRequest } from "./services/types";

export const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmedPassword, setShowConfirmedPassword] = useState(false);

  const form = useForm<IRegisterRequest>({
    mode: "onChange",
    resolver: joiResolver(schema),
  });
  const navigate = useNavigate();

  const {
    formState: { errors },
    handleSubmit,
    register,
    watch,
  } = form;

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (values: IRegisterRequest) => {
      await RegisterService.register(values);
    },
    onError: (error: IErrorResponse) => {
      if (error.response?.data?.errors) {
        error.response.data.errors.forEach((erro) => {
          customToast({
            msg: erro.message || "Erro ao tentar criar conta",
            type: "error",
          });
        });
      } else {
        customToast({
          msg: "Ocorreu um erro inesperado",
          type: "error",
        });
      }
    },
    onSuccess: () => {
      navigate("/login");
    },
  });

  const submit = (values: IRegisterRequest) => mutateAsync(values);

  return (
    <div className="flex justify-center items-center flex-col h-dvh w-full bg-gradient-to-b from-spoof-blue from-70% to-green-500">
      <div className="mb-8 flex flex-col justify-center items-center">
        <h2 className="text-6xl font-bold text-white text-shadow-lg bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500 p-2">
          Spoofy
        </h2>
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <Music className="h-16 w-16 text-[#4ADE80]" />
        </motion.div>
      </div>

      <form
        onSubmit={handleSubmit(submit)}
        className="w-full flex justify-center items-center p-3"
      >
        <div className="w-full md:w-[500px] rounded-xl bg-[#1E293B] px-8 py-10 shadow-2xl">
          <h2 className="text-center text-3xl font-bold text-white">
            Cadastro
          </h2>
          <p className="mb-5 text-center text-slate-400">
            Preencha os dados abaixo para se cadastrar
          </p>

          <div className="mb-4">
            <input
              type="text"
              disabled={isPending}
              placeholder="Nome"
              value={watch("name")}
              {...register("name")}
              className="w-full text-white rounded-md border-1 border-[#4ADE80]  p-3  placeholder-gray-400 focus:border-[#4ADE80] focus:outline-none focus:ring-2 focus:ring-[#4ADE80] disabled:opacity-50 disabled:cursor-not-allowed bg-gray-700"
            />
            {errors.name && (
              <div className="p-1">
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              </div>
            )}
          </div>

          <div className="mb-4">
            <input
              type="text"
              disabled={isPending}
              placeholder="Email"
              value={watch("email")}
              {...register("email")}
              className="w-full text-white rounded-md border-1 border-[#4ADE80]  p-3  placeholder-gray-400 focus:border-[#4ADE80] focus:outline-none focus:ring-2 focus:ring-[#4ADE80] disabled:opacity-50 disabled:cursor-not-allowed bg-gray-700"
            />
            {errors.email && (
              <div className="p-1">
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              </div>
            )}
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Senha"
              disabled={isPending}
              value={watch("password")}
              {...register("password")}
              className="w-full text-white rounded-md  border-1 border-[#4ADE80]  p-3  placeholder-gray-400 focus:border-[#4ADE80] focus:outline-none focus:ring-2 focus:ring-[#4ADE80] disabled:opacity-50 disabled:cursor-not-allowed bg-gray-700"
            />
            <button
              type="button"
              disabled={isPending}
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {errors.password && (
            <div className="p-1 mb-3">
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            </div>
          )}

          <div className="relative mt-4">
            <input
              type={showConfirmedPassword ? "text" : "password"}
              placeholder="Confirmar senha"
              disabled={isPending}
              value={watch("passwordConfirmation")}
              {...register("passwordConfirmation")}
              className="w-full text-white rounded-md  border-1 border-[#4ADE80]  p-3  placeholder-gray-400 focus:border-[#4ADE80] focus:outline-none focus:ring-2 focus:ring-[#4ADE80] disabled:opacity-50 disabled:cursor-not-allowed bg-gray-700"
            />
            <button
              type="button"
              disabled={isPending}
              onClick={() => setShowConfirmedPassword(!showConfirmedPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {showConfirmedPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {errors.passwordConfirmation && (
            <div className="p-1 ">
              <p className="text-red-500 text-sm">
                {errors.passwordConfirmation.message}
              </p>
            </div>
          )}

          <div className="mt-5">
            <button
              type="submit"
              disabled={isPending}
              className="w-full rounded-md bg-[#4ADE80] p-3 text-lg font-semibold text-white transition-colors hover:bg-[#22c55e] focus:outline-none focus:ring-2 focus:ring-[#4ADE80] focus:ring-offset-2 focus:ring-offset-[#1E293B] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? (
                <Loader2 className="w-5 h-5 animate-spin mx-auto" />
              ) : (
                "Cadastrar"
              )}
            </button>
          </div>

          <div className="mt-4 flex items-center justify-center space-x-2 text-sm text-gray-400">
            <span>Já tem uma conta?</span>
            <motion.a
              style={{
                pointerEvents: isPending ? "none" : "auto",
                cursor: "pointer",
              }}
              className="font-semibold text-[#4ADE80] hover:underline flex  items-center justify-center"
              whileHover={{ scale: 1.1 }}
              onClick={() => navigate("/")}
            >
              Login
              <motion.span
                className="ml-1"
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1 }}
              >
                <ChevronRight className="h-4 w-4" />
              </motion.span>
            </motion.a>
          </div>
        </div>
      </form>
    </div>
  );
};
