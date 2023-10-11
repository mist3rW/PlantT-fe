import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CartItems({ product, handleClick }) {
  return (
    <div className="w-full border border-[B8B8B8] mb-2 shadow p-2">
      <div className="flex flex-row items-center justify-between">
        <div className="flex gap-4 items-center justify-between">
          <div className="w-2/12">
            <img src={product.img} alt="" />
          </div>
          <p>{product.title}</p>
          <div>
            <button className="px-2  border border-[B8B8B8] rounded-sm">
              -
            </button>
            <button className="px-4   border border-[B8B8B8] rounded-sm">
              {product.amount}
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
