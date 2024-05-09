"use client";

import { cn } from "@/lib/utils";
import { Heart, Home, PlusCircle, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LoginButton } from "./auth/login-button";
import { useSession } from "next-auth/react";
import { ProfilePicture } from "./profile-picture";

export const MobileBottomNavbar = ({ className }: { className: string }) => {
  const { status } = useSession();
  const pathname = usePathname();

  const isUnauthenticated = status === "unauthenticated";

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
      icon: isUnauthenticated ? User : ProfilePicture,
      href: isUnauthenticated ? "#" : "/mypage",
      label: isUnauthenticated ? "შესვლა" : "პროფილი",
    },
  ];

  return (
    <div
      className={cn(
        "w-full flex justify-center fixed bottom-0 z-50 bg-white py-2 md:hidden",
        className
      )}
    >
      <div className="flex w-[100%]">
        {routes.map((route, index) => (
          <div
            key={index}
            className="flex justify-between items-center w-[100%]"
          >
            {route.label !== "შესვლა" ? (
              <Link
                href={route.href}
                className="p-3 w-full flex justify-center cursor-pointer flex-col items-center gap-1"
              >
                <route.icon
                  strokeWidth={1.7}
                  className={cn(
                    "text-gray-800",
                    pathname === route.href && "text-orange-600",
                    isUnauthenticated ? "" : "size-6"
                  )}
                />
                <span className="text-muted-foreground text-[0.7rem]">
                  {route.label}
                </span>
              </Link>
            ) : (
              <LoginButton className="w-full">
                <Link
                  href={route.href}
                  className="flex justify-center cursor-pointer flex-col items-center gap-1"
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
              </LoginButton>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
