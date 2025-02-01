"use client";

import { QrCodeDialog } from "@/components/dialogs";
import React from "react";
import { useForm } from "react-hook-form";
import { useSession, signIn } from "next-auth/react";
import { useTheme } from "next-themes";
import { ThemeSwitch } from "@/components/switch/themeswitch";
import LoginLottie from "@/components/animations/LoginLottie";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

export default function Page() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const { theme } = useTheme();
  const { data } = useSession();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
} = useForm<RegisterRequest>({
    resolver: yupResolver(registerSchema)
});


  return (
    <div className="min-h-screentext-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white dark:bg-slate-800 shadow sm:rounded-lg flex justify-center flex-1">
        <div className="flex-1 bg-stone-200 dark:bg-slate-600 text-center hidden lg:flex">
          <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat">
            <LoginLottie></LoginLottie>
          </div>
        </div>
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-8">
          <div className="mt-6 flex flex-col items-center">
            {theme === "dark" ? (
              <img
                src="/images/logo-white.png"
                className="scale-[75%]"
                alt=""
              />
            ) : (
              <img
                src="/images/logo-color.png"
                className="scale-[75%]"
                alt=""
              />
            )}
            <div className="w-full flex-1 mt-8">
              <div className="flex flex-col items-center">
                <button
                  onClick={() => {
                    signIn("google");
                  }}
                  className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-primary text-white flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline"
                >
                  <FcGoogle className="w-6 h-6" />
                  <span className="ml-4">Cadastrar com o Google</span>
                </button>

                <button
                  onClick={() => {
                    signIn("github");
                  }}
                  className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-primary text-white flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5"
                >
                  <FaGithub className="w-6 h-6" />
                  <span className="ml-4">Cadastrar com o GitHub</span>
                </button>
              </div>
              <div className="my-8 border-b text-center">
                <div className="leading-none px-2 inline-block text-sm tracking-wide font-medium bg-white dark:bg-slate-800 transform translate-y-1/2">
                  Ou faça o caastro com um email
                </div>
              </div>

              <div className="mx-auto max-w-xs">
                <form onSubmit={() => {}} action="">
                  <input
                    type="text"
                    {...register("nome")}
                    name="nome"
                    id="nome"
                    placeholder="Nome"
                    className="w-full mt-5 px-6 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-md focus:outline-none focus:border-gray-400 focus:bg-white dark:text-black"
                  />
                  {errors.nome && (
                    <p className="text-red-500 text-sm mb-1">
                      {errors.nome.message}
                    </p>
                  )}
                  <input
                    type="text"
                    {...register("login")}
                    name="login"
                    id="login"
                    placeholder="Email"
                    className="w-full mt-5 px-6 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-md focus:outline-none focus:border-gray-400 focus:bg-white dark:text-black"
                  />
                  {errors.login && (
                    <p className="text-red-500 text-sm mb-1">
                      {errors.login.message}
                    </p>
                  )}
                  <div className="flex mt-5 items-center relative">
                    <input
                      type={isPasswordVisible ? "text" : "password"}
                      {...register("senha")}
                      onChange={(e) => setPassword(e.target.value)}
                      name="senha"
                      id="senha"
                      placeholder="Senha"
                      className="w-full px-6 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-md focus:outline-none focus:border-gray-400 focus:bg-white dark:text-black"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <button
                        type="button"
                        className="cursor-pointer"
                        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                      >
                        {isPasswordVisible ? (
                          <IoMdEye size={28} color="#181818" />
                        ) : (
                          <IoMdEyeOff size={28} color="#181818" />
                        )}
                      </button>
                    </div>
                  </div>
                  {errors.senha && (
                    <p className="text-red-500 text-sm mb-1">
                      {errors.senha.message}
                    </p>
                  )}

                  <div className="flex mt-5 items-center relative">
                    <input
                      type={isConfirmPasswordVisible ? "text" : "password"}
                      {...register("confirmarSenha", {
                        required: true,
                        validate: (val: string) => {
                          if (watch("senha") != val) {
                            return "As senhas devem corresponder";
                          }
                        },
                      })}
                      name="confirmarSenha"
                      id="confirmarSenha"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirmar Senha"
                      className="w-full px-6 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-md focus:outline-none focus:border-gray-400 focus:bg-white dark:text-black"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <button
                        type="button"
                        className="cursor-pointer"
                        onClick={() =>
                          setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                        }
                      >
                        {isConfirmPasswordVisible ? (
                          <IoMdEye size={28} color="#181818" />
                        ) : (
                          <IoMdEyeOff size={28} color="#181818" />
                        )}
                      </button>
                    </div>
                  </div>
                  {errors.confirmarSenha && (
                    <p className="text-red-500 text-sm mb-1">
                      {errors.confirmarSenha.message}
                    </p>
                  )}
                  <button
                    type="submit"
                    className="mt-5 tracking-wide font-semibold bg-primary text-gray-100 w-full py-4 rounded-lg hover:bg-secondary transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  >
                    <svg
                      className="w-6 h-6 -ml-2"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                      <circle cx="8.5" cy="7" r="4" />
                      <path d="M20 8v6M23 11h-6" />
                    </svg>
                    <span className="ml-3">Entrar</span>
                  </button>
                </form>
              </div>
            </div>
            <div className="flex items-center mt-5 justify-center">
              <p>Já tem uma conta?</p>
              <a
                href="/register"
                className="ml-2 text-sm font-semibold text-primary dark:text-tertiary text-primary-600 hover:underline dark:text-primary-500"
              >
                Faça o Login!
              </a>
            </div>
            <div className="flex items-center mt-8 justify-center">
              <ThemeSwitch></ThemeSwitch>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function useState(arg0: string): [any, any] {
    throw new Error("Function not implemented.");
}

