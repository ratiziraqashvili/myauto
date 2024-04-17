import { Container } from "@/components/container";
import { MobileBottomNavbar } from "@/components/mobile-bottom-navbar";
import { Navbar } from "@/components/navbar";

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container>
      <Navbar />
      {children}
      <MobileBottomNavbar />
    </Container>
  );
};

export default PageLayout;
