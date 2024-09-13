import { useState } from "react";
import { ChevronRight, Eye, EyeOff, Loader2, Music } from "lucide-react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { schema } from "./schema";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../../services/axios-config/api";
import { useAuthContext } from "../../../context/auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { customToast } from "../../customToast/customToast";
import { ILoginRequest } from "./services/types";
import { LoginService } from "./services/loginService.service";

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<ILoginRequest>({
    resolver: joiResolver(schema),
  });
  const navigate = useNavigate();

  const { setAuthToken } = useAuthContext();
  const {
    formState: { errors },
    handleSubmit,
    register,
    watch,
  } = form;

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (values: ILoginRequest) => {
      const response = await LoginService.login(values);
      setAuthToken(response.data.token);
    },
    onSuccess: () => {
      navigate("/home");
    },
    onError: () =>
      customToast({ msg: "Erro ao tentar fazer login", type: "error" }),
  });

  const submit = (values: ILoginRequest) => mutateAsync(values);

  return (
    <div className="flex justify-center items-center flex-col h-dvh bg-slate-900">
      <div className="mb-8 flex justify-center items-center">
        <h2 className="text-5xl font-bold text-white">Spoofy</h2>
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <Music className="h-16 w-16 text-[#4ADE80]" />
        </motion.div>
      </div>

      <form onSubmit={handleSubmit(submit)}>
        <div className="md:w-[500px] rounded-2xl bg-[#1E293B] p-8 shadow-xl">
          <h2 className="mb-6  text-3xl font-bold text-white">Login</h2>

          <div className="mb-4">
            <input
              type="text"
              disabled={isPending}
              placeholder="Email"
              value={watch("email")}
              {...register("email")}
              className="w-full text-gray-950 rounded-lg border-1 border-[#4ADE80]  p-3  placeholder-gray-400 focus:border-[#4ADE80] focus:outline-none focus:ring-2 focus:ring-[#4ADE80] disabled:opacity-50 disabled:cursor-not-allowed"
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
              placeholder="Password"
              disabled={isPending}
              value={watch("password")}
              {...register("password")}
              className="w-full rounded-lg text-gray-950 border-1 border-[#4ADE80]  p-3  placeholder-gray-400 focus:border-[#4ADE80] focus:outline-none focus:ring-2 focus:ring-[#4ADE80] disabled:opacity-50 disabled:cursor-not-allowed"
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
            <div className="p-1 mb-4">
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            </div>
          )}

          <div className="mt-9">
            <button
              type="submit"
              disabled={isPending}
              className="w-full rounded-lg bg-[#4ADE80] p-3 text-lg font-semibold text-white transition-colors hover:bg-[#22c55e] focus:outline-none focus:ring-2 focus:ring-[#4ADE80] focus:ring-offset-2 focus:ring-offset-[#1E293B] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? (
                <Loader2 className="w-5 h-5 animate-spin mx-auto" />
              ) : (
                "Entrar"
              )}
            </button>
          </div>

          <div className="mt-6 flex items-center justify-center space-x-2 text-sm text-gray-400">
            <span>Não tem uma conta?</span>
            <motion.a
              style={{ pointerEvents: isPending ? "none" : "auto" }}
              className="font-semibold text-[#4ADE80] hover:underline flex  items-center justify-center"
              whileHover={{ scale: 1.1 }}
              onClick={() => navigate("register")}
            >
              Inscrever-se
              <motion.span
                className="ml-1 "
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
