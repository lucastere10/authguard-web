/* eslint-disable @next/next/no-img-element */
"use client";
import { useRouter } from "next/navigation";
import React, { FC, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { fetchUser } from "@/services/api/api";
import { useTheme } from "next-themes";
import { ThemeSwitch } from "@/components/switch/themeswitch";
import { HeaderDropdown } from "@/components/dropdowns";

interface HeaderProps {
  titulo?: string;
}

export const PageHeader: FC<HeaderProps> = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { theme } = useTheme();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function getUser() {
      const data = await fetchUser();
      setUser(data);
    }
    getUser();
  }, []);

  return (
    <header>
      <nav className="px-4 pt-8 py-2.5 m-4">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-2xl">
          <button
            onClick={() => {
              router.push("/");
            }}
          >
            <div className="sm:flex hidden items-center gap-4">
              {theme === "dark" ? (
                <img
                  src="/images/logo-white.png"
                  width={210}
                  height={64}
                  className=""
                  alt=""
                />
              ) : (
                <img
                  src="/images/logo-color.png"
                  width={210}
                  height={64}
                  className=""
                  alt=""
                />
              )}
            </div>
          </button>
          <div className="items-baseline gap-8 hidden xl:flex">
            <button
              onClick={() => {
                router.push("/cards");
              }}
              className="text-lg font-semibold leading-6 hover:text-primary"
            >
              Features 
            </button>
            <button
              onClick={() => {
                router.push("/search-profiles");
              }}
              className="text-lg font-semibold leading-6 hover:text-primary"
            >
              Documentação
            </button>
            <button
              onClick={() => {
                router.push("/about");
              }}
              className="text-lg font-semibold leading-6 hover:text-primary"
            >
              Preços
            </button>
            <button
              onClick={() => {
                router.push("/features");
              }}
              className="text-lg font-semibold leading-6 hover:text-primary"
            >
              Sobre
            </button>
            <button
              onClick={() => {
                router.push("/contact");
              }}
              className="text-lg font-semibold leading-6 hover:text-primary"
            >
              Contato
            </button>
            <button
              onClick={() => {
                router.push("/");
              }}
              className="text-xl ml-1 font-bold leading-6 hover:text-primary text-yellow-600"
            >
              AuthGuardPro+ Pro
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex">
              <ThemeSwitch />
            </div>
            {session ? (
              <div className="flex items-center gap-6">
                <div className="hidden md:flex items-center gap-4">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <p className="text-md font-semibold">{user?.nome}</p>
                    </div>
                  </div>
                </div>
                <HeaderDropdown />
              </div>
            ) : (
              <div className="px-1 flex gap-1">
                <button
                  className="text-lx cursor-pointer"
                  onClick={() => {
                    router.push("/login");
                  }}
                >
                  Login
                </button>
                <p>|</p>
                <button
                  className="ml-1 text-lx cursor-pointer"
                  onClick={() => {
                    router.push("/register");
                  }}
                >
                  Registrar
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};
