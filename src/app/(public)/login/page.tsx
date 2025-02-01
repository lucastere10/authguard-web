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

export default function Page() {
  const { theme } = useTheme();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { data } = useSession();

  return (
    <div className="min-h-screentext-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white dark:bg-slate-800 shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-8">
          <div className="mt-6 flex flex-col items-center">
            {theme === "dark" ? (
              <img
                src="/images/logo-white.png"
                className="scale-[50%]"
                alt=""
              />
            ) : (
              <img
                src="/images/logo-color.png"
                className="scale-[50%]"
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
                  <span className="ml-4">Entrar com o Google</span>
                </button>

                <button
                  onClick={() => {
                    signIn("github");
                  }}
                  className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-primary text-white flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5"
                >
                  <FaGithub className="w-6 h-6" />
                  <span className="ml-4">Entrar com o GitHub</span>
                </button>

                <QrCodeDialog />
              </div>
              <div className="my-8 border-b text-center">
                <div className="leading-none px-2 inline-block text-sm tracking-wide font-medium bg-white dark:bg-slate-800 transform translate-y-1/2">
                  Ou faça o login com um email
                </div>
              </div>

              <div className="mx-auto max-w-xs">
                <form onSubmit={() => {}} action="">
                  <input
                    type="text"
                    {...register("email")}
                    name="email"
                    id="email"
                    placeholder="Email"
                    className="w-full px-6 py-3 rounded-lg dark:text-black font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 focus:outline-none focus:border-gray-400 focus:bg-white"
                  />
                  {errors.login && (
                    <p className="text-red-500 text-sm mb-1">
                      {errors.login.message}
                    </p>
                  )}
                  <div className="flex items-center justify-between mt-5">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="rememberMe"
                          {...register("rememberMe")}
                          type="checkbox"
                          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor="remember"
                          className="text-gray-500 dark:text-gray-300"
                        >
                          Lembrar Login
                        </label>
                      </div>
                    </div>
                    <a
                      href="/register"
                      className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Esqueceu a senha?
                    </a>
                  </div>
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
              <p>Não tem uma conta?</p>
              <a
                href="/register"
                className="ml-2 text-sm font-semibold text-primary dark:text-tertiary text-primary-600 hover:underline dark:text-primary-500"
              >
                Registre-se!
              </a>
            </div>
            <div className="flex items-center mt-8 justify-center">
              <ThemeSwitch></ThemeSwitch>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-stone-200 dark:bg-slate-600 text-center hidden lg:flex">
          <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat">
            <LoginLottie></LoginLottie>
          </div>
        </div>
      </div>
    </div>
  );
}
