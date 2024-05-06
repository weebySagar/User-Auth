import React from "react";
import Header from "../components/Header";
import Routers from "../routes/Routers";

const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Routers />
      </main>
    </>
  );
};

export default Layout;
