import React from "react";
import { Nav, NavMobile } from "../components/interface/nav";
import { Header } from "../components/interface/header";
import * as subheader from "../components/interface/subheader";
import { useSubheaderStore } from "../components/interface/subheader/subheader.context";
import { Footer } from "../components/mobile/footer";
import SubheaderMB from "../components/mobile/home/subheader";
import { useWindowSize } from "@uidotdev/usehooks";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const {
    setMenuToggle: setSubheaderMenuToggle,
    isOutsideMenu: isOutsideSubheaderMenu,
  } = useSubheaderStore();

  const ws = useWindowSize();

  return (
    <div
      onClick={() => {
        if (isOutsideSubheaderMenu) setSubheaderMenuToggle(false);
      }}
    >
      <Nav />
      <NavMobile />
      <Header />
      <subheader.Desktop />
      <main>{children}</main>
      {ws.width < 400 && <SubheaderMB />}
      <Footer />
    </div>
  );
};

export default MainLayout;
