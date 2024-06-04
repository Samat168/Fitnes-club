import React from "react";
import App from "../App";
import HomePage from "../pages/HomePage";
import { Route, Routes } from "react-router-dom";
import NotFoundPage from "../pages/NotFoundPage";
import Login from "../components/Login/Login";
import Admin from "../components/Admin/Admin";
import AdminPage from "../pages/AdminPage";
import FormforPayPage from "../pages/FormforPayPage";
import EditMessage from "../components/EditMessage/EditMessage";

const MainRoutes = () => {
  const PUBLIC_ROUTES = [
    {
      link: "/",
      element: <HomePage />,
      id: 1,
    },
    {
      link: "*",
      element: <NotFoundPage />,
      id: 2,
    },
    {
      link: "/login",
      element: <Login />,
      id: 3,
    },
    {
      link: "/admin",
      element: <AdminPage />,
      id: 4,
    },
    {
      link: "/formforpay",
      element: <FormforPayPage />,
      id: 5,
    },
    {
      link: "/edit/:id",
      element: <EditMessage />,
      id: 6,
    },
  ];

  return (
    <Routes>
      {PUBLIC_ROUTES.map((item) => (
        <Route path={item.link} element={item.element} key={item.id} />
      ))}
    </Routes>
  );
};

export default MainRoutes;
