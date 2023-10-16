import { useState, useRef, useEffect } from "react";
import axios from "axios";

export default function useProduct() {
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
  return { productList, setProductList };
}
