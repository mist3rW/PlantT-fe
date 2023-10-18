import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCart } from "../contexts/CartContext";

export default function CartItems({ productId, qty, name, price, img }) {
  const {
    handlePlusQty,
    handleMinusQty,
    handleQtyChange,
    handleClickRemoveCartItems,
  } = useCart();

  // const totalProductPrice = (product.price || 0) * (product.qty || 1);

  return (
    <>
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="w-32 p-4">
          <img
            src={
              img ||
              "https://i0.wp.com/mikeyarce.com/wp-content/uploads/2021/09/woocommerce-placeholder.png?ssl=1"
            }
            alt={name}
          />
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          {name}
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center space-x-3">
            <button
              className="inline-flex items-center justify-center p-1 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              type="button"
              onClick={() => handleMinusQty(productId)}
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
                onChange={(e) => handleQtyChange(productId, +e.target.value)}
                value={qty || 1}
              />
            </div>
            <button
              className="inline-flex items-center justify-center h-6 w-6 p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover-bg-gray-700 dark:hover-border-gray-600 dark:focus:ring-gray-700"
              type="button"
              onClick={() => handlePlusQty(productId)}
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
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          ฿{(price || 0) * (qty || 1)}
        </td>
        <td className="px-6 py-4">
          <span
            className=" cursor-pointer"
            onClick={() => handleClickRemoveCartItems(productId)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </span>
        </td>
      </tr>
    </>
  );
}
