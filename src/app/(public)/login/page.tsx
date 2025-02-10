/* eslint-disable @next/next/no-img-element */
"use client";

import { QrCodeDialog } from "@/components/dialogs/TotpDialog";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { signIn } from "next-auth/react";
import { yupResolver } from '@hookform/resolvers/yup';
import { useTheme } from "next-themes";
import { ThemeSwitch } from "@/components/switch/themeswitch";
import LoginLottie from "@/components/animations/LoginLottie";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { sendEmailValidation } from "@/services/api/api";
import { EmailTokenDialog } from "@/components/dialogs/EmailTokenDialog";
import { emailRequestSchema } from "@/schemas/authSchema";


export default function Page() {
  const { theme } = useTheme();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailRequest>({
    resolver: yupResolver(emailRequestSchema)
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit: SubmitHandler<EmailRequest> = async (data: EmailRequest) => {
    const response = await sendEmailValidation(data.email);
    if (response.error) {
      console.error("Error sending email validation:", response.error);
      setErrorMessage("fez merda né paizão");
    } else {
      console.log("Email validation sent successfully:", response);
      setIsDialogOpen(true);
      setErrorMessage("");
    }
  };

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
                <form onSubmit={handleSubmit(onSubmit)} action="">
                  <input
                    type="text"
                    {...register("email")}
                    name="email"
                    id="email"
                    placeholder="Email"
                    className="w-full px-6 py-3 rounded-lg dark:text-black font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 focus:outline-none focus:border-gray-400 focus:bg-white"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mb-1">
                      {errors.email.message}
                    </p>
                  )}
                  {errorMessage && (
                    <p className="text-red-500 text-sm mb-1">{errorMessage}</p>
                  )}
                  <EmailTokenDialog isOpen={isDialogOpen} />
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
