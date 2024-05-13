import { MobileBottomNavbar } from "@/components/mobile-bottom-navbar";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const NotFound = () => {
  return (
    <div>
      <Navbar />
      <div className="bg-[#f2f3f6] flex justify-center items-center flex-col gap-8 h-[100vh]">
        <Image
          src="https://www.myauto.ge/build/assets/e597003b90e0b50af00e.png"
          alt=""
          width={400}
          height={400}
        />
        <h1 className="text-4xl text-[#272a37] text-center font-semibold">
          გვერდი ვერ მოიძებნა
        </h1>
        <p className="text-center text-[#272a37] w-[50%]">
          ვებგვერდის მისამართი დროებით არ იძებნება. დაბრუნდი მთავარ გვერდზე ან
          დაგვიკავშირდი ნომერზე:
          <span className="text-[#fd4100]"> +995 32 280 00 45</span>
        </p>
        <Link href="/">
          <Button
            variant="amber"
            className="text-white py-7 text-lg px-10 rounded-2xl"
          >
            მთავარზე დაბრუნება
          </Button>
        </Link>
      </div>
      <MobileBottomNavbar />
    </div>
  );
};

export default NotFound;
