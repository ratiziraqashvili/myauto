import { ChildrenContainer } from "@/components/children-container";
import { MobileBottomNavbar } from "@/components/mobile-bottom-navbar";
import { Navbar } from "@/components/navbar";

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <ChildrenContainer>{children}</ChildrenContainer>
      <MobileBottomNavbar className="max-w-[100rem]" />
    </div>
  );
};

export default PageLayout;
