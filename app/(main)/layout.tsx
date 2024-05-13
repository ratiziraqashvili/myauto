import { ChildrenContainer } from "@/components/children-container";
import { Container } from "@/components/container";
import { MobileBottomNavbar } from "@/components/mobile-bottom-navbar";
import { Navbar } from "@/components/navbar";

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container>
      <Navbar />
      <ChildrenContainer>
        {children}
      </ChildrenContainer>
      <MobileBottomNavbar />
    </Container>
  );
};

export default PageLayout;
