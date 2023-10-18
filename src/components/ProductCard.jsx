import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCart } from "../contexts/CartContext";

export default function ProductCard({ product }) {
  const { handleClickAddToCart } = useCart();
  return (
    <div className="plant_product_card pb-2 rounded-[25px] w-auto h-[402px] mt-2">
      <div className="plant_product_img_box ">
        <img
          src={
            product.Product_image[0]?.image_url ||
            "https://i0.wp.com/mikeyarce.com/wp-content/uploads/2021/09/woocommerce-placeholder.png?ssl=1"
          }
          alt="product_img"
        />
      </div>
      <div className="plant_product_card_details px-4 pt-3">
        <p className=" font-semibold text-lg">{product.name}</p>
        <div className="flex justify-between items-center">
          <p>฿{product.price}</p>
          <button>
            <FontAwesomeIcon
              icon={faCartShopping}
              className="plant_add_to_cart_btn"
              onClick={() => handleClickAddToCart(product)}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
