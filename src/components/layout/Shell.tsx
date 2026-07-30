"use client";
import { useState } from "react";
import Nav from "@/src/components/layout/Nav";
import Header from "@/src/components/layout/Header";

const Shell = ({ children }: { children: React.ReactNode }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen((prev) => !prev);
  };

  return (
    <>
      <Header onToggleNav={toggleNav} isOpen={isNavOpen} />
      <div
        data-sidebar={isNavOpen ? "true" : "false"}
        className="grid min-h-dvh grid-cols-1 lg:grid-cols-[12.5rem_minmax(0,1fr)]"
      >
        <Nav isOpen={isNavOpen} />
        <main className="lg:col-start-2 pt-header px-4 lg:px-8">
          {children}
        </main>
      </div>
    </>
  );
};

export default Shell;
