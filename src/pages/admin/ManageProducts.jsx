import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ManageProducts() {
  const [productList, setProductList] = useState([]);
  const fetchProductData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/product");
      setProductList(response.data);
    } catch (err) {
      console.error("Error fetching product data: ", err);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  const deleteTargetProduct = async (targetProductId) => {
    try {
      await axios.delete(`http://localhost:3001/product/${targetProductId}`);
      setProductList((prevProducts) =>
        prevProducts.filter((product) => product.id !== targetProductId)
      );
    } catch (err) {
      console.log("Error deleting product this product:", err);
    }
  };
  return (
    <>
      <div className="flex items-center justify-between">
        <div>hello products</div>
        <Link to="add-new-product">
          <button className="bg-red-500 p-4 text-white">เพิ่มสินค้า</button>
        </Link>
        <Link to="category">
          <button className="bg-blue-500 p-4 text-white">จัดการหมวดหมู่</button>
        </Link>
      </div>
      <Outlet />
      <>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  ชื่อ
                </th>
                <th scope="col" className="px-6 py-3">
                  รหัสสินค้า
                </th>
                <th scope="col" className="px-6 py-3">
                  ราคาสินค้า
                </th>
                <th scope="col" className="px-6 py-3">
                  คลัง
                </th>
                <th scope="col" className="px-6 py-3">
                  หมวดหมู่
                </th>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {productList.map((product) => (
                <React.Fragment key={product.id}>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <div className="flex flex-row w-56 items-center gap-4">
                        <img
                          src={
                            product.Product_image[0]?.image_url ||
                            "https://i0.wp.com/mikeyarce.com/wp-content/uploads/2021/09/woocommerce-placeholder.png?ssl=1"
                          }
                          alt="product image"
                          className="w-[56px] h-[56px] object-cover"
                        />
                        <p>{product.name}</p>
                      </div>
                    </th>

                    <td className="px-6 py-4">{product.SKU}</td>
                    <td className="px-6 py-4">{product.price}</td>
                    <td className="px-12 py-4">
                      <p
                        className={
                          product.stock === 0
                            ? "text-red-500"
                            : "text-green-600"
                        }
                      >
                        {product.stock === 0 ? "สินค้าหมด" : product.stock}
                      </p>
                    </td>
                    <td className="px-12 py-4">
                      {product.Product_category[0].category.name}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <a
                        href="#"
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        แก้ไข
                      </a>
                      <br />
                      <a
                        href="#"
                        className="font-medium text-red-600 dark:text-blue-500 hover:underline"
                        onClick={() => deleteTargetProduct(product.id)}
                      >
                        ลบ
                      </a>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </>
    </>
  );
}
