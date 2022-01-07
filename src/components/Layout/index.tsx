import React from "react";

import { LoadingSpinner } from "../loading/LoadingSpinner";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

export const Layout: React.FC = ({ children }) => (
  <div className="min-h-screen">
    <Navbar />
    <LoadingSpinner />
    <main className="h-full m-5">{children}</main>
    <Footer />
  </div>
);
