'use client'

import { ThemeSwitch } from "@/components/switch/themeswitch";
import React from "react";

export default function Home() {
  return (
    <div className="relative" id="home">
      <div
        aria-hidden="true"
        className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20"
      >
        <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-200 dark:from-tertiary-400"></div>
        <div className="blur-[106px] h-32 bg-gradient-to-r from-secondary-400 to-sky-200 dark:to-indigo-300"></div>
      </div>
        <div className="relative pt-28 ml-auto">
          <div className="lg:w-2/3 text-center mx-auto">
            <h1 className="text-gray-900 text-balance dark:text-white font-bold text-5xl md:text-6xl xl:text-7xl">
            Seu acesso. Suas regras. Nossa{" "}
              <span className="text-tertiary dark:text-white">
                Segurança.
              </span>
            </h1>
            <p className="mt-8 text-gray-700 dark:text-gray-300">
            No cenário digital de hoje, autenticação não é apenas uma barreira — é a base da confiança. O Auth Guard oferece um sistema robusto, inteligente e adaptável, garantindo proteção sem comprometer a experiência do usuário.
            </p>
            <div className="mt-16 flex flex-wrap justify-center gap-y-4 gap-x-6">
              <a
                href="/login"
                className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
              >
                <span className="relative text-base font-semibold text-white">
                  Comece agora
                </span>
              </a>
              <a
                href="/about"
                className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-primary/10 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:border-gray-700 dark:before:bg-gray-800 sm:w-max"
              >
                <span className="relative text-base font-semibold text-primary dark:text-white">
                  Saiba mais
                </span>
              </a>
              <ThemeSwitch></ThemeSwitch>
            </div>
            <div className="hidden gap-16 py-8 mt-16 border-y border-gray-100 dark:border-gray-800 sm:flex justify-between">
              <div className="text-left">
                <h6 className="text-lg font-semibold text-gray-700 dark:text-white">
                  Identidade sem fricção
                </h6>
                <p className="mt-2 text-gray-500">Autenticação fluida e segura, garantindo acesso confiável sem obstáculos desnecessários.</p>
              </div>
              <div className="text-left">
                <h6 className="text-lg font-semibold text-gray-700 dark:text-white">
                  Arquitetura inteligente
                </h6>
                <p className="mt-2 text-gray-500">Integração ágil e escalável, pronta para evoluir com as necessidades do seu negócio.</p>
              </div>
              <div className="text-left">
                <h6 className="text-lg font-semibold text-gray-700 dark:text-white">
                  Segurança em cada camada
                </h6>
                <p className="mt-2 text-gray-500">Criptografia avançada, conformidade rigorosa e defesa contínua contra ameaças emergentes.</p>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}
