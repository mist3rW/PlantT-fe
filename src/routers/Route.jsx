import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Archive from "../pages/Archive";
import Contact from "../pages/Contact";
import Layout from "../layouts/Layout";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";
import ThankyouPage from "../pages/ThankyouPage";
import SingleProductPage from "../pages/SingleProductPage";
import AdminDashboard from "../pages/AdminDashboard";
import ManageProducts from "../pages/admin/ManageProducts";
import ManageUsers from "../pages/admin/ManageUsers";
import ManageOrders from "../pages/admin/ManageOrders";
import AddNewProduct from "../features/admin/Product/AddNewProduct";
import CategoryPage from "../pages/admin/CategoryPage";
import ManageSingleOrder from "../pages/admin/ManageSingleOrder";
import RedirectIfNotAdmin from "../features/RedirectIfNotAdmin";

const router = createBrowserRouter([
  {
    path: "/admeow/",
    element: (
      <RedirectIfNotAdmin>
        <AdminDashboard />
      </RedirectIfNotAdmin>
    ),
    children: [
      { path: "", element: <AdminDashboard /> },
      { path: "manage-orders", element: <ManageOrders /> },
      { path: "manage-users", element: <ManageUsers /> },
      {
        path: "manage-products/",
        element: <ManageProducts />,
        children: [
          { path: "add-new-product", element: <AddNewProduct /> },
          { path: "category", element: <CategoryPage /> },
        ],
      },
      { path: "order/:orderId", element: <ManageSingleOrder /> },
    ],
  },
  {
    path: "/",
    element: (
      //   <Authenticated>
      <Layout />
      //   </Authenticated>
    ),
    children: [
      { path: "", element: <HomePage /> },
      {
        path: "collection",
        element: <Archive />,
        children: [],
      },
      { path: "product/:productId", element: <SingleProductPage /> },
      { path: "contact", element: <Contact /> },
      { path: "cart", element: <CartPage /> },
      {
        path: "checkout",
        element: <CheckoutPage />,
        // children: [{ path: "thankyou", element: <ThankyouPage /> }],
      },
      { path: "checkout/thankyou/:orderId", element: <ThankyouPage /> },
    ],
  },
]);

export default function Route() {
  return <RouterProvider router={router} />;
}
