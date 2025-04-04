import React from "react";
import { Footer } from "./Footer";
import { Outlet } from "react-router-dom";
import { NavigationBar } from "./NavigationBar";

export const AppLayout = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <NavigationBar />
      <main className="flex-grow-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
