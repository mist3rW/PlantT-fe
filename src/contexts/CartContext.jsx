import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [price, setPrice] = useState(0);

  const handleClickAddToCart = (product) => {
    setCart((currentCart) => [...currentCart, product]);
  };

  const handleClickRemoveCartItems = (id) => {
    const arr = cart.filter((product) => product.id !== id);
    setCart(arr);
  };

  const handlePlusQty = (id) => {
    setCart((currentCart) => {
      return currentCart.map((product) => {
        if (product.id === id) {
          return { ...product, qty: (product.qty || 1) + 1 };
        }
        return product;
      });
    });
  };

  const handleMinusQty = (id) => {
    setCart((currentCart) => {
      return currentCart.map((product) => {
        if (product.id === id) {
          const newQty = (product.qty || 1) - 1;
          return { ...product, qty: newQty > 0 ? newQty : 1 };
        }
        return product;
      });
    });
  };

  const handleQtyChange = (productId, newQty) => {
    const updatedCartItemQty = cart.map((product) => {
      if (product.id === productId) {
        return { ...product, qty: newQty };
      }
      return product;
    });

    setCart(updatedCartItemQty);
  };

  useEffect(() => {
    const totalPrice = cart.reduce((total, product) => {
      return total + (product.price || 0) * (product.qty || 1);
    }, 0);
    setPrice(totalPrice);
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        handleClickAddToCart,
        handleClickRemoveCartItems,
        handlePlusQty,
        handleMinusQty,
        price,
        handleQtyChange,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
