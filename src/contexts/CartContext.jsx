import React, { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const handleClickAddToCart = (product) => {
    console.log(product);
    setCart((currentCart) => [...currentCart, product]);
    console.log(cart);
  };

  const handleClickRemoveCartItems = (id) => {
    const arr = cart.filter((product) => product.id !== id);
    setCart(arr);
  };
  return (
    <CartContext.Provider
      value={{ cart, handleClickAddToCart, handleClickRemoveCartItems }}
    >
      {children}
    </CartContext.Provider>
  );
};
