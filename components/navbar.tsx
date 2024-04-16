import Image from "next/image";
import Link from "next/link";
import { Input } from "./ui/input";
import { Plus, Search } from "lucide-react";
import { Button } from "./ui/button";
import { ProfileButton } from "./profile-button";

export const Navbar = () => {
  return (
    <div className="fixed top-0 flex justify-between px-7 py-3 items-center bg-white z-50 w-full">
      <div className="flex md:gap-7 items-center">
        <Link className="relative w-36 h-12" href="/">
          <Image src="/myauto.jpg" alt="myauto" fill />
        </Link>
        <div className="relative hidden md:flex">
          <Input
            className="rounded-xl placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-xs pl-10 w-[20rem]"
            placeholder="ძებნა"
          />
          <Search className="size-5 absolute left-3 top-2.5" />
        </div>
      </div>
      <div className="flex md:gap-7 items-center">
        <Link href="/add">
          <Button
            variant="amber"
            className="bg-opacity-15 rounded-xl hover:bg-opacity-25 transition duration-500 px-6"
          >
            <div className="rounded-full bg-[#fd4100] p-[0.20rem] mr-2">
              <Plus className="size-3 text-white" strokeWidth={4} />
            </div>
            <span className="md:block hidden text-[#fd4100] text-xs">
              დამატება
            </span>
          </Button>
        </Link>
        <ProfileButton />
      </div>
    </div>
  );
};