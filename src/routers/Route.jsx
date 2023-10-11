import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Archive from "../pages/Archive";
import Contact from "../pages/Contact";
import Layout from "../layouts/Layout";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";
import ThankyouPage from "../pages/ThankyouPage";
import AdminDashboard from "../pages/AdminDashboard";

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
      { path: "cart", element: <CartPage /> },
      { path: "checkout", element: <CheckoutPage /> },
      { path: "thankyou", element: <ThankyouPage /> },
      { path: "admeow", element: <AdminDashboard /> },
    ],
  },
]);

export default function Route() {
  return <RouterProvider router={router} />;
}
