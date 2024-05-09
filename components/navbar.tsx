import Link from "next/link";
import { Input } from "./ui/input";
import { Plus, Search, User } from "lucide-react";
import { Button } from "./ui/button";
import { ProfileButton } from "./profile-button";
import { MobileNavMenu } from "./mobile-nav-menu";
import { LoginButton } from "./auth/login-button";
import { MyAuto } from "./images/myauto";
import { auth } from "@/auth";
import { getUserById } from "@/data/user";
import { cn } from "@/lib/utils";
import { Container } from "./container";

export const Navbar = async ({ className }: { className?: string }) => {
  const session = await auth();
  const user = await getUserById(session?.user?.id!);

  return (
    <div
      className={cn(
        "fixed top-0 flex justify-between px-7 py-3 items-center z-50 w-full bg-white",
        className
      )}
    >
      <Container className="flex justify-between items-center w-full">
        <div className="flex md:gap-7 items-center">
          <Link href="/">
            <MyAuto />
          </Link>
          <div className="relative hidden md:flex">
            <Input
              className="rounded-xl placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-xs pl-10 w-[20rem]"
              placeholder="ძებნა"
            />
            <Search className="size-5 absolute left-3 top-2.5" />
          </div>
        </div>
        <div className="md:flex hidden md:gap-7 items-center">
          <Link href="/add">
            <Button
              variant="amber"
              className="bg-opacity-15 rounded-xl hover:bg-opacity-25 transition duration-500 px-6"
            >
              <div className="rounded-full bg-[#fd4100] p-[0.20rem] lg:mr-2">
                <Plus className="size-3 text-white" strokeWidth={4} />
              </div>
              <span className="lg:block hidden text-[#fd4100] text-xs">
                დამატება
              </span>
            </Button>
          </Link>
          {!!session ? (
            <ProfileButton user={user} />
          ) : (
            <LoginButton>
              <Button variant="outline">
                <User />
                <span className="text-[0.85rem] ml-2">შესვლა</span>
              </Button>
            </LoginButton>
          )}
        </div>
        <div className="flex md:hidden gap-8">
          <button>
            <Search strokeWidth={2} className="size-6" />
          </button>
          <MobileNavMenu />
        </div>
      </Container>
    </div>
  );
};
