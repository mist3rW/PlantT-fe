import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Archive from "../pages/Archive";
import Contact from "../pages/Contact";
import Layout from "../layouts/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      //   <Authenticated>
      <Layout />
      //   </Authenticated>
    ),
    children: [
      { path: "", element: <HomePage /> },
      { path: "collection", element: <Archive /> },
      { path: "contact", element: <Contact /> },
    ],
  },
]);

export default function Route() {
  return <RouterProvider router={router} />;
}
