import React from "react";
import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <div className="p-3 flex flex-col justify-center items-center">
      <Outlet />
    </div>
  );
};

export default RootLayout;
