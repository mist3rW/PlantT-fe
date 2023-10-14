import { useState } from "react";
import Modal from "../components/Modal";
import PopRegisterLogin from "./PopRegisterLogin";

export default function RegisterBtn() {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button
        className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
        onClick={() => setIsOpen(true)}
      >
        สมัครสมาชิก
      </button>
      <Modal
        title=""
        open={isOpen}
        onClose={() => setIsOpen(false)}
        maxWidth={64}
      >
        <PopRegisterLogin closeModal={closeModal} />
      </Modal>
    </>
  );
}
