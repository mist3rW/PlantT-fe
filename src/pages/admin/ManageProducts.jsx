import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

export default function ManageProducts() {
  return (
    <>
      <div className="flex items-center justify-between">
        <div>hello products</div>
        <Link to="add-new-product">
          <button className="bg-red-500 p-4 text-white">เพิ่มสินค้า</button>
        </Link>
      </div>
      <Outlet />
    </>
  );
}
