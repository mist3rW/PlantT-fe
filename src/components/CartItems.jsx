import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CartItems({ product, handleClick }) {
  return (
    <div className="w-full border border-[B8B8B8] mb-2 shadow p-2">
      <div className="flex flex-row ">
        <div className="flex gap-4 items-center justify-between w-full px-4">
          <div className="w-2/12">
            <img
              src={
                product.Product_image[0]?.image_url ||
                "https://i0.wp.com/mikeyarce.com/wp-content/uploads/2021/09/woocommerce-placeholder.png?ssl=1"
              }
              alt=""
            />
          </div>
          <p>{product.name}</p>
          <div className="flex items-center">
            <button className="px-2  border border-[B8B8B8] rounded-sm">
              -
            </button>
            <button className="px-4  border border-[B8B8B8] rounded-sm">
              1
            </button>
            <button className="px-2  border border-[B8B8B8] rounded-sm">
              +
            </button>
          </div>
          <span>฿{product.price}</span>
          <span
            className=" cursor-pointer"
            onClick={() => handleClick(product.id)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </span>
        </div>
        <div className="flex gap-10"></div>
      </div>
    </div>
  );
}
