import { useState } from "react";
import { ChevronRight, Eye, EyeOff, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { schema } from "./schema";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { customToast } from "../../customToast/customToast";
import { RegisterService } from "./services/registerService.service";
import { IRegisterRequest } from "./services/types";
import { IErrorResponse } from "../../../types/errorResponse";

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
    <div className="flex justify-center items-center h-dvh bg-slate-900">
      <form onSubmit={handleSubmit(submit)}>
        <div className="md:w-[500px] rounded-2xl bg-[#1E293B] p-8 shadow-xl">
          <h2 className="mb-6 text-3xl font-bold text-white">cadastro</h2>

          <div className="mb-3">
            <input
              type="text"
              disabled={isPending}
              placeholder="Nome"
              value={watch("name")}
              {...register("name")}
              className="w-full  rounded-lg border-1 border-[#4ADE80]  p-3  placeholder-gray-400 focus:border-[#4ADE80] focus:outline-none focus:ring-2 focus:ring-[#4ADE80] disabled:opacity-50 disabled:cursor-not-allowed"
            />
            {errors.name && (
              <div className="p-1">
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              </div>
            )}
          </div>

          <div className="mb-3">
            <input
              type="text"
              disabled={isPending}
              placeholder="Email"
              value={watch("email")}
              {...register("email")}
              className="w-full  rounded-lg border-1 border-[#4ADE80]  p-3  placeholder-gray-400 focus:border-[#4ADE80] focus:outline-none focus:ring-2 focus:ring-[#4ADE80] disabled:opacity-50 disabled:cursor-not-allowed"
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
              className="w-full rounded-lg  border-1 border-[#4ADE80]  p-3  placeholder-gray-400 focus:border-[#4ADE80] focus:outline-none focus:ring-2 focus:ring-[#4ADE80] disabled:opacity-50 disabled:cursor-not-allowed"
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

          <div className="relative mt-3">
            <input
              type={showConfirmedPassword ? "text" : "password"}
              placeholder="Confirmar senha"
              disabled={isPending}
              value={watch("passwordConfirmation")}
              {...register("passwordConfirmation")}
              className="w-full rounded-lg  border-1 border-[#4ADE80]  p-3  placeholder-gray-400 focus:border-[#4ADE80] focus:outline-none focus:ring-2 focus:ring-[#4ADE80] disabled:opacity-50 disabled:cursor-not-allowed"
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
              className="w-full rounded-lg bg-[#4ADE80] p-3 text-lg font-semibold text-white transition-colors hover:bg-[#22c55e] focus:outline-none focus:ring-2 focus:ring-[#4ADE80] focus:ring-offset-2 focus:ring-offset-[#1E293B] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? (
                <Loader2 className="w-5 h-5 animate-spin mx-auto" />
              ) : (
                "Cadastrar"
              )}
            </button>
          </div>

          <div className="mt-6 flex items-center justify-center space-x-2 text-sm text-gray-400">
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
