"use client";

import { FaUser } from "react-icons/fa";
import { useCurrentUser } from "@/hooks/use-current-user";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const AccountCard = () => {
  const user = useCurrentUser();
  console.log();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-full">
        <div className="w-full flex p-3 gap-4 rounded-lg border border-zinc-800 bg-zinc-900">
          <Avatar>
            <AvatarImage src={user?.image || ""} className="object-cover" />
            <AvatarFallback className="bg-orange-600">
              <FaUser className="text-white" />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start justify-start">
            <p className="text-sm font-semibold">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs text-gray-400">{user?.email}</p>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Hello there</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AccountCard;
