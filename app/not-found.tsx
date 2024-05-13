import { MobileBottomNavbar } from "@/components/mobile-bottom-navbar";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const NotFound = () => {
  return (
    <div>
      <Navbar />
      <div className="bg-[#f2f3f6] flex justify-center items-center flex-col gap-4">
        <div>
          <Image
            src="https://www.myauto.ge/build/assets/e597003b90e0b50af00e.png"
            alt=""
            width={100}
            height={100}
          />
          <h1 className="text-xl text-center tracking-wide font-semibold">
            გვერდი ვერ მოიძებნა
          </h1>
          <p className="text-center">
            ვებგვერდის მისამართი დროებით არ იძებნება. დაბრუნდი მთავარ გვერდზე ან
            დაგვიკავშირდი ნომერზე:
            <span className="text-[#fd4100]">+995 32 280 00 45</span>
          </p>
          <Button variant="amber" className="text-white py-6 px-4">
            მთავარზე დაბრუნება
          </Button>
        </div>
      </div>
      <MobileBottomNavbar />
    </div>
  );
};

export default NotFound;
