import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import AddPage from "../views/AddPage";
import BaseLayout from "../views/BaseLayout";
import DetailPage from "../views/DetailPage";
import EditPage from "../views/EditPage";
import HomePage from "../views/HomePage";
import LoginPage from "../views/LoginPage";
import CategoryPage from "../views/CategoryPage";
import AddUserPage from "../views/AddUserPage";

import Toastify from "toastify-js";

const base_url = "https://h8-phase2-gc.vercel.app";

const router = createBrowserRouter([
  // login + protection pake loader
  {
    path: "/login",
    element: <LoginPage base_url={base_url} />,
    loader: () => {
      if (localStorage.access_token) {
        Toastify({
          text: "You are already logged in",
          duration: 3000,
          close: true,
          gravity: "bottom", // `top` or `bottom`
          position: "right", // `left`, `center` or `right`
          stopOnFocusef: true, // Prevents dismissing of toast on hover
          style: {
            background: "#FF0000",
          },
          onClick: function () {}, // Callback after click
        }).showToast();

        return redirect("/");
      }
      return null;
    },
  },

  {
    element: <BaseLayout />,
    loader: () => {
      if (!localStorage.access_token) {
        Toastify({
          text: "Please login first",
          duration: 3000,
          close: true,
          gravity: "bottom", // `top` or `bottom`
          position: "right", // `left`, `center` or `right`
          stopOnFocusef: true, // Prevents dismissing of toast on hover
          style: {
            background: "#FF0000",
          },
          onClick: function () {}, // Callback after click
        }).showToast();
        return redirect("/login");
      }
      return null;
    },
    children: [
      {
        path: "/",
        element: <HomePage base_url={base_url} />,
      },

      {
        path: "/add",
        element: <AddPage base_url={base_url} />,
      },

      {
        path: "/detail/:id",
        element: <DetailPage base_url={base_url} />,
      },
      {
        path: "/edit/:id",
        element: <EditPage base_url={base_url} />,
      },
      {
        path: "/categories",
        element: <CategoryPage base_url={base_url} />,
      },
      {
        path: "/addUser",
        element: <AddUserPage base_url={base_url} />,
      },
    ],
  },
]);

export default router;
