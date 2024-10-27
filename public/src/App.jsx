import { RouterProvider } from "react-router-dom";
import router from "./routers";

export default function App() {
  return (
    <>
      <div>
        {/* kita attach ke react */}
        <RouterProvider router={router} />
      </div>
    </>
  );
}
