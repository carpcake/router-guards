import { RouterProvider } from "react-router";
import { AuthProvider } from "./auth";
import { router } from "./router";

export const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};
