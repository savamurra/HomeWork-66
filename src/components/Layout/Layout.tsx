import React, { PropsWithChildren } from "react";
import Navbar from "../Navbar/Navbar.tsx";
import { Container } from "@mui/material";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <Container>{children}</Container>
    </>
  );
};

export default Layout;
