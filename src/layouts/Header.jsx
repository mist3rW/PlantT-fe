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
import { useState } from "react";
import Modal from "../components/Modal";
import PopRegisterLogin from "../features/PopRegisterLogin";
import SearchBar from "../features/SearchBar";
import SearchModal from "../components/SearchModal";

export default function Header() {
  const { dropDownEl, isOpen, setIsOpen } = useDropDown();
  const { cart } = useCart();
  const { logout, authUser } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          <div ref={dropDownEl} className="relative z-40">
            <span onClick={() => setIsOpen(!isOpen)}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
              {isOpen && (
                <>
                  <div className="absolute ">
                    <SearchBar />
                  </div>
                </>
              )}
            </span>
          </div>

          <Link to="/cart">
            <span>
              <FontAwesomeIcon icon={faCartShopping}></FontAwesomeIcon>
              <span className="plant_cart_counter">{cart.length ?? 0}</span>
            </span>
          </Link>
          <span>
            {!authUser ? (
              <>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-green-700 text-white rounded-md px-2 hover:bg-white border-1 hover:border-green-700 hover:text-black"
                >
                  เข้าสู่ระบบ
                </button>
                <Modal
                  title=""
                  open={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  maxWidth={64}
                >
                  <PopRegisterLogin
                    closeModal={() => {
                      setIsModalOpen(false);
                    }}
                  />
                </Modal>
              </>
            ) : (
              <>
                <div ref={dropDownEl} className="relative z-40">
                  <span onClick={() => setIsOpen(!isOpen)}>
                    <FontAwesomeIcon icon={faUser} />
                    {isOpen && (
                      <>
                        <ul className="bg-white absolute right-0 translate-y-1 border rounded-lg p-2 shadow w-36 ">
                          {authUser ? (
                            <p>Welcome {authUser.firstName}</p>
                          ) : null}
                          {authUser?.role === "ADMIN" && (
                            <Link to="admeow">
                              <li className="hover:bg-gray-200 rounded-lg p-2 text-sm font-semibold cursor-pointer">
                                Admin Dashboard
                              </li>
                            </Link>
                          )}
                          <li
                            className="hover:bg-gray-200 rounded-lg p-2 text-sm font-semibold cursor-pointer"
                            onClick={logout}
                          >
                            Logout
                          </li>
                        </ul>
                      </>
                    )}
                  </span>
                </div>
              </>
            )}
          </span>
        </div>
      </div>
    </>
  );
}
