import React from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {ErrorPage} from "./pages/ErrorPage.jsx";
import {HomePage} from "./pages/HomePage.jsx";
import {StorePage} from "./pages/StorePage.jsx";
import './App.css'
import {StoreContentCollage} from "./components/StoreFragments/StoreContentCollage.jsx";
import {LoginPage} from "./pages/LoginPage.jsx";
import {AdminPage} from "./pages/AdminPage.jsx";

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
    },
    {
      path: "/admin/dashboard",
      element: <AdminPage/>
    },
    {
      path: "*",
      element: <ErrorPage/>
    }
  ]);

  return (
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
  )
}

export default App
