import React from "react";

import { RouterProvider } from "react-router";
import { router } from "./app.routes.jsx";
import { AuthProvider } from "./features/auth/auth.context.jsx";
import { SongContextProvider } from "./features/home/song.context.jsx";
const App = () => {
  return (
    <div className="bg-black  h-screen w-full text-white">
      <AuthProvider>
        <SongContextProvider>
          <RouterProvider router={router} />
        </SongContextProvider>
      </AuthProvider>
    </div>
  );
};

export default App;
