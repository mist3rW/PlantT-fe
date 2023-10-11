import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ProductCard({ product }) {
  const { title, price, img } = product;
  return (
    <div className="plant_product_card pb-2 rounded-[25px] w-[285px] h-[402px] mt-2">
      <div className="plant_product_img_box ">
        <img src={img} alt="product_img" />
      </div>
      <div className="plant_product_card_details px-4 pt-3">
        <p className=" font-semibold text-lg">{title}</p>
        <div className="flex justify-between items-center">
          <p>฿{price}</p>
          <button>
            <FontAwesomeIcon
              icon={faCartShopping}
              className="plant_add_to_cart_btn"
              // style={{
              //   color: "#ffffff",
              //   backgroundColor: "#3E834E",
              //   ,
              // }}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
