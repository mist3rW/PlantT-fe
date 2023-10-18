import { useState, useEffect } from "react";
import axios from "axios";

export function useCartItem() {
  const [cartItem, setCartItem] = useState([]);
  useEffect(() => {}, []);

  const fetchCartItem = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/cart/${userId}`);
      setCartItem(response.data);
    } catch (error) {
      console.error("Error fetching cart items", error);
    }
  };

  return { addItemToCart };
}
