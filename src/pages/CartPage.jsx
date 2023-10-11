import { useCart } from "../contexts/CartContext";

import CartItems from "../components/CartItems";
import { useState } from "react";

export default function CartPage() {
  const { cart, handleClickRemoveCartItems } = useCart();
  const [price, setPrice] = useState();
  return (
    <div>
      {cart.map((product) => (
        <CartItems
          key={product.id}
          product={product}
          handleClick={handleClickRemoveCartItems}
        />
      ))}
      <span>Total Price of your cart</span>
      <span>฿ - {price} </span>
    </div>
  );
}
