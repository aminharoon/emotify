import React from "react";
import FaceExpression from "./features/Expression/components/FaceExpression.jsx";
import { RouterProvider } from "react-router";
import { router } from "./app.routes.jsx";
const App = () => {
  return (
    <div className="bg-black  h-screen w-full text-white">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
