import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./main.css";
import App from "./App.jsx";

import { Login } from "./assets/pages/Login/Login.jsx";
import { Signup } from "./assets/pages/Signup/Signup.jsx";
import { Dashboard } from "./assets/pages/Dashboard/Dashboard.jsx";
import { Meals } from "./assets/pages/Meals/Meals.jsx";
import { Foods } from "./assets/pages/Foods/Foods.jsx";
import { Workouts } from "./assets/pages/Workouts/Workouts.jsx";
import { Progress } from "./assets/pages/Progress/Progress.jsx";
import { Profile } from "./assets/pages/Profile/Profile.jsx";
import { Settings } from "./assets/pages/Settings/Settings.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },

  {
    path: "/signup",
    element: <Signup />,
  },

  {
    path: "/:username",
    element: <App />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
        handle: {
          title: "Dashboard",
        },
      },

      {
        path: "meals",
        element: <Meals />,
        handle: {
          title: "Meals",
        },
      },

      {
        path: "foods",
        element: <Foods />,
        handle: {
          title: "Foods",
        },
      },

      {
        path: "workouts",
        element: <Workouts />,
        handle: {
          title: "Workouts",
        },
      },

      {
        path: "progress",
        element: <Progress />,
        handle: {
          title: "Progress",
        },
      },

      {
        path: "profile",
        element: <Profile />,
        handle: {
          title: "Profile",
        },
      },

      {
        path: "settings",
        element: <Settings />,
        handle: {
          title: "Settings",
        },
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
