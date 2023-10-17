import { useCart } from "../contexts/CartContext";
import React from "react";
import CartItems from "../components/CartItems";
import { useEffect, useState } from "react";

export default function CartPage() {
  const { cart, price } = useCart();

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
                <CartItems product={product} />
              </React.Fragment>
            ))}
          </tbody>
        </table>
        <span>Total Price of your cart</span>
        <span>฿ {price} </span>
      </div>
    </>
  );
}
