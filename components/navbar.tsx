import Image from "next/image";
import Link from "next/link";
import { Input } from "./ui/input";
import { Search } from "lucide-react";

export const Navbar = () => {
  return (
    <div className="fixed top-0 flex justify-between px-7 py-3 items-center bg-white z-50">
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
      <div></div>
    </div>
  );
};
