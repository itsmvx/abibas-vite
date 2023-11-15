import React from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";

import './App.css'
import {StoreCollage} from "./components/StoreComponents/StoreCollage.jsx";
import {LoginPage} from "./pages/LoginPage.jsx";
import {AdminPage} from "./pages/AdminPage.jsx";
import {NotFoundPage} from "./pages/NotFoundPage.jsx";
import {HomePage} from "./pages/HomePage.jsx";
import {StorePage} from "./pages/StorePage.jsx";
import {ErrorPage} from "./pages/ErrorPage.jsx"
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage/>,
    },
    {
      path: "/admin-abibas",
      element: <LoginPage/>,
    },
    {
      path: "/store",
      element: <StorePage/>,
      errorElement: <ErrorPage/>
    },
    {
      path: "/admin/dashboard",
      element: <AdminPage/>
    },
    {
      path: "*",
      element: <NotFoundPage/>
    }
  ]);

  return (
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
  )
}

export default App
