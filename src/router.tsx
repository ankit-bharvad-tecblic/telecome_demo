import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./layouts/Dashboard";
import NonAuth from "./layouts/NonAuth";
import Root from "./layouts/Root";
// import Categories from "./pages/Categories";
import Home from "./pages/Home";
import Login from "./pages/Login/Login";
import Users from "./pages/users/Users";
import Restaurants from "./pages/restaurants/Restaurants";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Dashboard />,
        children: [
          {
            path: "",
            element: <Home />,
          },
          {
            path: '/users',
            element: <Users />,
          },
          {
            path: '/restaurants',
            element: <Restaurants />,
          },
        ],
      },
    ],
  },
  {
    path: "/auth",
    element: <NonAuth />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);
