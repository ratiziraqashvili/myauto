"use client";

import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ProfilePicture } from "./profile-picture";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const ProfileButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const onExpand = () => {
    setIsExpanded((prev) => !prev);
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
      <DropdownMenuTrigger onClick={onExpand} asChild>
        <Button className="duration-500 rounded-xl" variant="outline">
          <ProfilePicture className="size-6" />
          <span className="font-semibold mx-2 tracking-tight">rati</span>
          <ChevronDown
            className={cn(
              "size-4 text-muted-foreground duration-500 transition",
              isExpanded && "rotate-180 text-black"
            )}
          />
        </Button>
      </DropdownMenuTrigger>
      {isExpanded && (
        <DropdownMenuContent className="rounded-xl mr-5" onBlur={onExpand}>
          <div className="flex gap-4 items-center py-2 border-b px-6 w-full">
            <ProfilePicture className="size-10" />
            <div className="flex flex-col">
              <span className="truncate w-40 text-sm">
                rziraqashvili@gmail.comssssssssssssssssssssssssssssssssssssss
              </span>
              <span className="text-sm font-sans">ID: Id</span>
            </div>
          </div>
          <div className="flex flex-col pt-2 border-b">
            {buttons.map((button) => (
              <Link href={button.href}>
                <button className="hover:bg-gray-100 transition duration-500 w-full text-start py-2 px-5 text-[0.9rem]">
                  {button.label}
                </button>
              </Link>
            ))}
          </div>
          <div className="py-2">
            <button className="hover:bg-gray-100 transition duration-500 w-full text-start py-2 px-5 text-[0.9rem]">
              {/* TODO: Sign out user */}
              გასვლა
            </button>
          </div>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
};
