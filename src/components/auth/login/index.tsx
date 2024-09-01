import { useState } from "react";
import { ChevronRight, Eye, EyeOff, Music } from "lucide-react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { schema } from "./schema";

interface IFormLogin {
  email: string;
  password: string;
}

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<IFormLogin>({
    resolver: joiResolver(schema),
  });

  const {
    formState: { errors },
    handleSubmit,
    register,
    watch,
  } = form;

  const submit = (values: IFormLogin) => {
    console.log(values);
  };

  return (
    <div className="flex justify-center items-center h-dvh bg-slate-900">
      <form onSubmit={handleSubmit(submit)}>
        <div className="max-w-md rounded-2xl bg-[#1E293B] p-8 shadow-xl">
          <motion.div
            className="mb-8 flex justify-center"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Music className="h-16 w-16 text-[#4ADE80]" />
          </motion.div>
          <h2 className="mb-6  text-3xl font-bold text-white">
            Login to Your Account
          </h2>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Email"
              value={watch("email")}
              {...register("email")}
              className="w-full text-gray-950 rounded-lg border-1 border-[#4ADE80]  p-3 text-white placeholder-gray-400 focus:border-[#4ADE80] focus:outline-none focus:ring-2 focus:ring-[#4ADE80]"
            />
            {errors.email && (
              <div className="p-1">
                <p className="text-red-500">{errors.email.message}</p>
              </div>
            )}
          </div>

          <div className="mb-4 relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={watch("password")}
              {...register("password")}
              className="w-full rounded-lg text-gray-950 border-1 border-[#4ADE80]  p-3 text-white placeholder-gray-400 focus:border-[#4ADE80] focus:outline-none focus:ring-2 focus:ring-[#4ADE80]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 focus:outline-none"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>

          <div>
            <button
              type="submit"
              className="w-full rounded-lg bg-[#4ADE80] p-3 text-lg font-semibold text-white transition-colors hover:bg-[#22c55e] focus:outline-none focus:ring-2 focus:ring-[#4ADE80] focus:ring-offset-2 focus:ring-offset-[#1E293B]"
            >
              Login
            </button>
          </div>

          <div className="mt-6 flex items-center justify-center space-x-2 text-sm text-gray-400">
            <span>Don't have an account?</span>
            <motion.a
              href="#"
              className="font-semibold text-[#4ADE80] hover:underline"
              whileHover={{ scale: 1.1 }}
            >
              Sign up
              <motion.span
                className="ml-1 inline-block"
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
