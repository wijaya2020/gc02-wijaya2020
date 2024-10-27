import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "../views/HomePage";
import DetailProductPage from "../views/DetailProductPage";

const base_url = "https://h8-phase2-gc.vercel.app";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage base_url={base_url} />,
  },
  {
    path: "/products/:id",
    element: <DetailProductPage base_url={base_url} />,
  },
]);

export default router;
