import React from "react";
import { Outlet } from "react-router-dom";
import { Footer } from "../components/Footer";
import { NavigationBar } from "../components/NavigationBar";

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
