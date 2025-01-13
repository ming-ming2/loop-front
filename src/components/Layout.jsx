import React from "react";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 pt-[var(--header-height)]">
        {children}
      </main>
    </>
  );
};

export default Layout;
