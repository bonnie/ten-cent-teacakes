import React from "react";
import { tw } from "twind";

import { LoadingSpinner } from "../loading/LoadingSpinner";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

export const Layout: React.FC = ({ children }) => (
  <div className={tw(["h-screen", "w-screen", "grid", "grid-rows-8"])}>
    <div style={{ maxHeight: "12.5vh" }}>
      <Navbar />
    </div>
    <div className="row-span-7">
      <LoadingSpinner />
      <main className="h-full m-2">{children}</main>
      {/* TODO: fix this <Footer /> */}
    </div>
  </div>
);
