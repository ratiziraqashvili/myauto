"use client";

import { cn } from "@/lib/utils";
import { Heart, Home, PlusCircle, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const MobileBottomNavbar = () => {
  const pathname = usePathname();

  const routes = [
    {
      icon: Home,
      href: "/",
      label: "მთავარი",
    },
    {
      icon: PlusCircle,
      href: "/add",
      label: "დამატება",
    },
    {
      icon: Heart,
      href: "/mypage/favorites",
      label: "რჩეულები",
    },
    {
      icon: User,
      href: `#`,
      label: "შესვლა",
    },
  ];

  return (
    <div className="w-full flex justify-center fixed bottom-0 z-50 bg-white py-2 md:hidden">
      <div className="flex justify-between items-center w-[100%] ">
        {routes.map((route, index) => (
          <Link
            href={route.href}
            key={index}
            className="p-3 w-full flex justify-center cursor-pointer flex-col items-center gap-1"
          >
            <route.icon
              strokeWidth={1.7}
              className={cn(
                "text-gray-800",
                pathname === route.href && "text-orange-600"
              )}
            />
            <span className="text-muted-foreground text-[0.7rem]">
              {route.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};