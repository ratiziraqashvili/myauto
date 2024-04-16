import { AlignJustify } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "./ui/sheet";
import Link from "next/link";

export const MobileNavMenu = () => {
  const buttons = [
    {
      label: "განბაჟება/გაფორმება",
      href: "/calculator",
    },
    {
      label: "დილერები",
      href: "/dealers",
    },
    {
      label: "აუტოსალონი",
      href: "/autosalons",
    },
    {
      label: "კატალოგი",
      href: "/catalog",
    },
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button>
          <AlignJustify strokeWidth={2} className="size-6" />
        </button>
      </SheetTrigger>
      <SheetContent className="h-full" side="top">
        <SheetHeader className="text-gray-400 text-sm">მენიუ</SheetHeader>
        <div className="pt-4 flex flex-col gap-2">
          {buttons.map((button) => (
            <Link href={button.href}>
              <button className="hover:text-[#fd4100] text-lg">{button.label}</button>
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};
