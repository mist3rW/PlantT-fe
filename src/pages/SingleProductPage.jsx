import { useParams } from "react-router-dom";
import Counter from "../components/Counter";
import SubmitBtn from "../components/SubmitBtn";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../components/Loading";
import { useAuth } from "../hooks/use-auth";
import { useCart } from "../contexts/CartContext";
import { toast } from "react-toastify";

export default function SingleProductPage() {
  const { fetchCartItem } = useCart();
  const { authUser } = useAuth();
  const [qty, setQty] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState(null);

  const { productId } = useParams();

  const handleAddToCart = async () => {
    try {
      await axios.post("http://localhost:3001/cart/add", {
        productId,
        userId: authUser.id,
        qty: +qty,
      });
      console.log("product added to cart successfully!");
      setQty(1);
      fetchCartItem();
    } catch (error) {
      console.log("Error", error);
      toast.error("Please login before shopping");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchSingleProductData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/product/${productId}`
        );
        console.log(response.data.product);
        setProduct(response.data.product);
        setIsLoading(false);
      } catch (error) {
        console.error("Could not fetch product data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSingleProductData();
  }, [productId]);

  if (!product) {
    return <Loading />;
  }

  return (
    <div className="grid grid-cols-2 gap-8">
      {isLoading && <Loading />}
      <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
        <img src={product.Product_image[0]?.image_url} alt="" className="" />
      </div>
      <div className="space-y-4">
        <h1 className="font-semibold text-2xl">{product.name}</h1>
        <p>
          Brand: <span className="text-green-600">{product.brand}</span>
        </p>
        <div className="bg-[#FAFAFA] w-full p-4">
          <p className="text-[#878787] text-3xl font-medium">
            ฿{product.price}
          </p>
        </div>
        <div>
          <p>{product.desc}</p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center space-x-3">
            <button
              className="inline-flex items-center justify-center p-1 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              type="button"
              onClick={() => {
                if (qty > 1) {
                  setQty(qty - 1);
                }
              }}
            >
              <span className="sr-only"> Minus Qty Button</span>
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 2"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h16"
                />
              </svg>
            </button>
            <div>
              <input
                type="number"
                id="first_product"
                className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="1"
                onChange={(e) => setQty(e.target.value)}
                value={qty}
              />
            </div>
            <button
              className="inline-flex items-center justify-center h-6 w-6 p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover-bg-gray-700 dark:hover-border-gray-600 dark:focus:ring-gray-700"
              type="button"
              onClick={() => setQty(qty + 1)}
            >
              <span className="sr-only"> Plus Qty Button</span>
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 1v16M1 9h16"
                />
              </svg>
            </button>
          </div>
          <div className="w-fit">
            <p
              className={` px-2 ${
                product.stock === 0
                  ? "bg-red-500 text-white"
                  : "bg-green-500 text-white"
              }`}
            >
              {product.stock === 0
                ? "OUT OF STOCK"
                : `IN STOCK: ${product.stock}`}
            </p>
          </div>
        </div>

        <SubmitBtn className=" w-6/12" onClick={handleAddToCart}>
          เพิ่มไปยังรถเข็น
        </SubmitBtn>
        <p>
          รหัสสินค้า: <span>{product.SKU}</span>
        </p>
        <p>
          หมวดหมู่: <span>{product.Product_category[0].category.name}</span>
        </p>
      </div>
    </div>
  );
}
