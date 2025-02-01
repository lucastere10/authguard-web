import React, { FC } from "react";
import { signOut } from "next-auth/react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
export const HeaderDropdown: FC = () => {

  const handleLogout = () => {
    signOut();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-lg hover:text-tertiary px-3 py-1">Minha Conta</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Configurações</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Perfil</DropdownMenuItem>
        <DropdownMenuItem>Time</DropdownMenuItem>
        <DropdownMenuItem className="text-red-500" onClick={() => {handleLogout()}}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
