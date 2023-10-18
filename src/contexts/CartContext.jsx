import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../hooks/use-auth";
import { useCartItem } from "../hooks/use-cart";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [price, setPrice] = useState(0);
  const { authUser } = useAuth();

  const fetchCartItem = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/cart/${authUser?.id}`
      );

      setCart(response.data);
    } catch (err) {
      console.error("Error fetching cart items", err);
    }
  };

  const handleClickAddToCart = async (product) => {
    try {
      const cartItemPayload = {
        productId: product.id,
        qty: product.qty || 1,
        userId: authUser.id,
        // product: {
        //   name: product.name,
        //   price: product.price,
        //   Product_imaeg: [
        //     {
        //       image_url: product.image_url,
        //     },
        //   ],
        // },
      };
      await axios.post("http://localhost:3001/cart/add", cartItemPayload);
      await fetchCartItem();
      console.log("Cart Item Added Successfully!");
    } catch (err) {
      console.error(err);
    }
  };

  const handleClickRemoveCartItems = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/cart/remove/${id}`);
    } catch (error) {
      console.log(error);
    }
    cart.filter((product) => product.productId !== id);

    await fetchCartItem();
  };
  const updateItemQty = async (id, newQty) => {
    try {
      await axios.put(`http://localhost:3001/cart/update/${id}/${newQty}`);
    } catch (error) {
      console.log(error);
    }
  };
  const handlePlusQty = async (id) => {
    try {
      const foundIndex = cart.findIndex((product) => product.productId == id);
      const newCart = [...cart];
      const newQty = (newCart[foundIndex].qty || 1) + 1;

      newCart[foundIndex] = {
        ...newCart[foundIndex],
        qty: newQty,
      };
      await updateItemQty(id, newQty);
      await fetchCartItem();
      console.log("update qty successfully!");
    } catch (err) {
      console.log(err);
    }
  };

  const handleMinusQty = async (id) => {
    try {
      const foundIndex = cart.findIndex((product) => product.productId == id);
      const newCart = [...cart];
      const newQty = (newCart[foundIndex].qty || 1) - 1;
      newCart[foundIndex] = {
        ...newCart[foundIndex],
        qty: newQty > 0 ? newQty : 1,
      };
      await updateItemQty(id, newQty);
      setCart(newCart);
      console.log("update qty successfully!");
    } catch (err) {
      console.log(err);
    }

    // setCart((currentCart) => {
    //   return currentCart.map((product) => {
    //     if (product.id === id) {
    //       const newQty = (product.qty || 1) - 1;
    //       return { ...product, qty: newQty > 0 ? newQty : 1 };
    //     }
    //     return product;
    //   });
    // });
  };

  const handleQtyChange = async (productId, newQty) => {
    try {
      const updatedCartItemQty = cart.map((product) => {
        if (product.productId === productId) {
          return { ...product, qty: newQty };
        }
        return product;
      });

      await updateItemQty(productId, newQty);
      setCart(updatedCartItemQty);
      console.log("update qty successfully!");
    } catch (err) {
      console.log(err);
    }

    // const updatedCartItemQty = cart.map((product) => {
    //   if (product.id === productId) {
    //     return { ...product, qty: newQty };
    //   }
    //   return product;
    // });

    // setCart(updatedCartItemQty);
  };

  const clearCart = () => {
    setCart([]);
  };

  useEffect(() => {
    if (authUser) {
      fetchCartItem();
    }
  }, [authUser]);

  useEffect(() => {
    const totalPrice = cart.reduce((total, product) => {
      return total + (product.product.price || 0) * (product.qty || 1);
    }, 0);
    setPrice(totalPrice);
  }, [cart]);
  return (
    <CartContext.Provider
      value={{
        cart,
        price,
        handleClickAddToCart,
        handleClickRemoveCartItems,
        handlePlusQty,
        handleMinusQty,
        price,
        handleQtyChange,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
