import {
  faCartShopping,
  faUser,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PrimaryMenu from "./PrimaryMenu";
import { useCart } from "../contexts/CartContext";
import { Link } from "react-router-dom";

export default function Header() {
  const { cart } = useCart();
  return (
    <>
      <div className="flex justify-evenly py-4">
        <div>
          <Link to="/">
            <img src="../../public/PlantT-logo.png" alt="Logo" />
          </Link>
        </div>
        <div className=" list-none flex flex-row gap-4">
          <PrimaryMenu />
        </div>
        <div className="flex gap-4 pt-text">
          <Link to="/thankyou">
            <span>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </span>
          </Link>
          <Link to="/cart">
            <span>
              <FontAwesomeIcon icon={faCartShopping}></FontAwesomeIcon>
              <span className="plant_cart_counter">{cart.length ?? 0}</span>
            </span>
          </Link>
          <Link to="/checkout">
            <span>
              <FontAwesomeIcon icon={faUser} />
            </span>
          </Link>
        </div>
      </div>
    </>
  );
}
