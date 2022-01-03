import React from "react";

import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

export const Layout: React.FC = ({ children }) => (
  <div className="min-h-screen">
    <Navbar />
    <main className="h-full m-5">{children}</main>
    <Footer />
  </div>
);
