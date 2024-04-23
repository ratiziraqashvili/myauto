"use client";

import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ProfilePicture } from "./profile-picture";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { User } from "@prisma/client";

interface ProfileButtonProps {
  user: User | null;
}

export const ProfileButton = ({ user }: ProfileButtonProps) => {
  const onSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  //   TODO: Create pages

  const buttons = [
    {
      label: "ჩემი განცხადებები",
      href: "/mypage/myads",
    },
    {
      label: "ბალანსის შევსება",
      href: "/mypage/balance",
    },
    {
      label: "შედარება",
      href: "/mypage/compare",
    },
    {
      label: "რჩეულები",
      href: "/mypage/favorites",
    },
    {
      label: "მონაცემების რედაქტირება",
      href: "/mypage/profile",
    },
    {
      label: "შეტყობინებები",
      href: "/mypage/chat",
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="duration-500 rounded-xl" variant="outline">
          <ProfilePicture className="size-6" />
          <span className="font-semibold mx-2 tracking-tight">
            {user?.name}
          </span>
          <ChevronDown className="size-4 text-muted-foreground duration-500 transition" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="rounded-xl mr-5">
        <div className="flex gap-4 items-center py-2 border-b px-6 w-full">
          <ProfilePicture className="size-10" />
          <div className="flex flex-col">
            <span className="truncate w-40 text-sm">{user?.email}</span>
            <span className="text-sm font-sans">ID: {user?.id}</span>
          </div>
        </div>
        <div className="flex flex-col pt-2 border-b">
          {buttons.map((button) => (
            <Link key={button.href} href={button.href}>
              <button className="hover:bg-gray-100 transition duration-500 w-full text-start py-2 px-5 text-[0.9rem]">
                {button.label}
              </button>
            </Link>
          ))}
        </div>
        <div className="py-2">
          <button
            onClick={onSignOut}
            className="hover:bg-gray-100 transition duration-500 w-full text-start py-2 px-5 text-[0.9rem]"
          >
            გასვლა
          </button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
