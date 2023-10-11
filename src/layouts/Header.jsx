import {
  faCartShopping,
  faUser,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PrimaryMenu from "./PrimaryMenu";
import { useCart } from "../contexts/CartContext";

export default function Header() {
  const { cart } = useCart();
  return (
    <>
      <div className="flex justify-evenly py-4">
        <div>
          <img src="../../public/PlantT-logo.png" alt="Logo" />
        </div>
        <div className=" list-none flex flex-row gap-4">
          <PrimaryMenu />
        </div>
        <div className="flex gap-4 pt-text">
          <span>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </span>
          <span>
            <FontAwesomeIcon icon={faCartShopping}></FontAwesomeIcon>
            <span className="plant_cart_counter">{cart.length ?? 0}</span>
          </span>
          <span>
            <FontAwesomeIcon icon={faUser} />
          </span>
        </div>
      </div>
    </>
  );
}
