import { StrictMode } from "react";
import Login from './assets/pages/Login/Login.jsx'
import Dashboard from './assets/pages/Dashboard/Dashboard.jsx'
import Meals from './assets/pages/Meals/Meals.jsx'
import Foods from './assets/pages/Foods/Foods.jsx'
import Workouts from './assets/pages/Workouts/Workouts.jsx'
import Progress from './assets/pages/Progress/Progress.jsx'
import Profile from './assets/pages/Dashboard/Dashboard.jsx'
import Settings from './assets/pages/Settings/Settings.jsx'
import App from "./App.jsx";
import { createRoot } from "react-dom/client";
import "./main.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  },

  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />
      },

      {
        path: "meals",
        element: <Meals />
      },

      {
        path: "foods",
        element: <Foods />
      },

      {
        path: "workouts",
        element: <Workouts />
      },

      {
        path: "progress",
        element: <Progress />
      },

      {
        path: "profile",
        element: <Profile />
      },

      {
        path: "settings",
        element: <Settings />
      }
    ]
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
