import { useCart } from "../contexts/CartContext";
import React from "react";
import CartItems from "../components/CartItems";
import SubmitBtn from "../components/SubmitBtn";
import { Link } from "react-router-dom";

export default function CartPage() {
  const { cart, price } = useCart();
  const shippingFees = 50;
  console.log(cart);
  return (
    <>
      {cart.length === 0 ? (
        <>
          <div className=" flex  items-center flex-col gap-4">
            <p>ขณะนี้ ไม่มีสินค้าในรถเข็น</p>

            <Link to="/">
              <button
                type="button"
                className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                เลือกชมสินค้า
                <svg
                  className="w-3.5 h-3.5 ml-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </button>
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className="grid grid-cols-10 space-x-4">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg col-span-7">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      <span className="sr-only">Image</span>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      สินค้า
                    </th>
                    <th scope="col" className="px-6 py-3">
                      จำนวน
                    </th>
                    <th scope="col" className="px-6 py-3">
                      ราคา
                    </th>
                    <th scope="col" className="px-6 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((product) => (
                    <React.Fragment key={product.id}>
                      <CartItems
                        productId={product.productId}
                        qty={product.qty}
                        name={product.product.name}
                        price={product.product.price}
                        img={product.product.Product_image[0]?.image_url}
                      />
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="w-full col-span-3">
              <div className=" p-4 text-xs text-gray-700 border border-gray-200 rounded-md dark:bg-gray-700 dark:text-gray-400 space-y-4">
                <p className="text-lg">รถเข็นของคุณ</p>
                <hr />
                <div className="flex justify-between">
                  <p>รวม</p>
                  <span>฿{price} </span>
                </div>
                <div className="flex justify-between">
                  <p>ค่าจัดส่ง</p>
                  <span>฿{shippingFees} </span>
                </div>
                <hr />
                <div className="flex justify-between">
                  <p className="text-semibold">รวมทั้งหมด</p>
                  <span>฿{shippingFees + price} </span>
                </div>
                <Link to="/checkout">
                  <SubmitBtn className="mt-4"> ยืนยัน</SubmitBtn>
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
