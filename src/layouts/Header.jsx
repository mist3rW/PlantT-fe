import {
  faCartShopping,
  faUser,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PrimaryMenu from "./PrimaryMenu";
import { useCart } from "../contexts/CartContext";
import { Link } from "react-router-dom";
import useDropDown from "../hooks/use-dropdown";
import { useAuth } from "../hooks/use-auth.js";

export default function Header() {
  const { dropDownEl, isOpen, setIsOpen } = useDropDown();
  const { cart } = useCart();
  const { authUser } = useAuth();

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
          <div ref={dropDownEl} className="relative">
            <span onClick={() => setIsOpen(!isOpen)}>
              <FontAwesomeIcon icon={faUser} />
              {isOpen && (
                <>
                  <ul className="bg-white absolute right-0 translate-y-1 border rounded-lg p-2 shadow w-36 ">
                    {authUser ? <p>Welcome {authUser.firstName}</p> : null}
                    <li className="hover:bg-gray-200 rounded-lg p-2 text-sm font-semibold cursor-pointer">
                      Dashboard
                    </li>
                    <li className="hover:bg-gray-200 rounded-lg p-2 text-sm font-semibold cursor-pointer">
                      Logout
                    </li>
                  </ul>
                </>
              )}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
