import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppContextProvider } from "@context/Context";
import ProtectionRoutes from "@routes/ProtectionRoutes/ProtectionRoutes";
import Login from "@routes/Login";
import Signup from "@routes/Signup";
import Dashboard from "@routes/Dashboard/Home";
import Layout from "@layout/Layout";
import UserSettings from "@routes/Dashboard/UserSettings/UserSettings";
import AllTasks from "@routes/Dashboard/AllTasks/AllTasks";
import "@styles/tailwind.css";

const router = createBrowserRouter([
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <ProtectionRoutes />,
    children: [{
      path: "/dashboard",
      element: <Dashboard />,
    }]
  },
  {
    path: "/dashboard/settings",
    element: <ProtectionRoutes />,
    children: [{
      path: "/dashboard/settings",
      element: <UserSettings />
    }]
  },
  {
    path: "/dashboard/all",
    element: <ProtectionRoutes />,
    children: [{
      path: "/dashboard/all",
      element: <AllTasks />
    }]
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppContextProvider>
      <Layout>
        <RouterProvider router={router} />
      </Layout>
    </AppContextProvider>
  </React.StrictMode>
);
