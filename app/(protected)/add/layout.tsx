import { Container } from "@/components/container";
import { MobileBottomNavbar } from "@/components/mobile-bottom-navbar";
import { Navbar } from "@/components/navbar";

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container>
      <Navbar />
      <div className="bg-[#f2f3f6] h-full pt-[4.5rem]">{children}</div>
      <MobileBottomNavbar />
    </Container>
  );
};

export default PageLayout;
