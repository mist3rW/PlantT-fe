import InputField from "../components/InputField";
import SubmitBtn from "../components/SubmitBtn";
import { useCart } from "../contexts/CartContext";
import CartItems from "../components/CartItems";
import React from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CheckoutPage() {
  const {
    cart,
    price,
    handleClickRemoveCartItems,
    handleMinusQty,
    handlePlusQty,
    handleQtyChange,
  } = useCart();
  const shippingFees = 50;
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="col-span-2 md:col-span-1 md:w-70 space-y-4">
        <img src="../../public/plant_checkout_bg.jpg" alt="" />
        <div className="space-y-4">
          <p className="text-xl font-semibold">ข้อมูลในการจัดส่ง</p>
          <div className="grid grid-cols-2 gap-4">
            <InputField placeholder="อีเมล" className="col-span-full" />
            <InputField placeholder="เบอร์โทรศัพท์" className="col-span-full" />
            <InputField placeholder="ชื่อ" />
            <InputField placeholder="นามสกุล" />
            <InputField
              placeholder="บ้านเลขที่และที่อยู่ถนน"
              className="col-span-full"
            />
            <InputField placeholder="ตำบล/แขวง" />
            <InputField placeholder="อำเภอ/เขต" />
            <InputField placeholder="จังหวัด" />
            <InputField placeholder="รหัสไปรษณีย์" />
          </div>
        </div>
        <div className="space-y-4">
          <p className="text-xl font-semibold">วิธีการจัดส่งสินค้า</p>
          <div className="flex justify-between p-4 border border-gray-200 rounded-md">
            <p>EMS</p>
            <p>฿{shippingFees}</p>
          </div>
        </div>
        <div className="space-y-4">
          <p className="text-xl font-semibold">วิธีการชำระเงิน</p>

          <div className=" border border-gray-200 p-4 rounded-md">
            <div className="flex items-center h-5 p-8">
              <input
                id="helper-radio"
                type="radio"
                name="paymentMethod"
                value=""
                className="w-4 h-4 text-blue-500 bg-gray-100 border-gray-300    "
              />
              <div className="ml-2 text-sm ">
                <label
                  htmlFor="helper-radio"
                  className="font-medium text-gray-900 "
                >
                  โอนเข้าบัญชีธนาคาร
                </label>
                <p
                  id="helper-radio-text"
                  className="text-xs font-normal text-gray-500 "
                >
                  สามารถชำระค่าสินค้าโดยตรงด้วยการโอนเข้าบัญชีของเรา โปรดใช้เลข
                  Order Number ในการอ้างอิงกับการชำระเงิน
                  สินค้าของคุณจะไม่ถูกจัดส่งจนกว่าจะได้รับการยืนยันการชำระเงินในบัญชีของเรา
                </p>
              </div>
            </div>
          </div>
          <div className=" border border-gray-200 p-4 rounded-md">
            <div className="flex items-center h-5 p-8">
              <input
                id="helper-radio"
                type="radio"
                name="paymentMethod"
                value=""
                className="w-4 h-4 text-blue-500 bg-gray-100 border-gray-300    "
              />
              <div className="ml-2 text-sm">
                <label
                  htmlFor="helper-radio"
                  className="font-medium text-gray-900 "
                >
                  เก็บเงินปลายทาง
                </label>
                <p
                  id="helper-radio-text"
                  className="text-xs font-normal text-gray-500 "
                >
                  ชำระเงินเมื่อได้รับสินค้า
                </p>
              </div>
            </div>
          </div>

          <hr />
          <p className="text-xs font-normal text-gray-500">
            ข้อมูลส่วนบุคคลของคุณจะถูกใช้เพื่อดำเนินการสั่งซื้อของคุณ
            และเพื่อวัตถุประสงค์อื่นที่อธิบายไว้ในนโยบายของเรา
          </p>
          <hr />
          <SubmitBtn>ยืนยัน</SubmitBtn>
        </div>
      </div>
      <div className="col-span-2 md:col-span-1 md:w-30 bg-[#fafafa] p-4">
        <div className="space-y-4">
          <p className="text-xl font-semibold">สินค้าจากตะกร้า</p>
          <div>
            {cart.map((product) => (
              <React.Fragment id={product.id}>
                <div>
                  <div className="flex justify-between   shadow border border-gray-300 mb-2 ">
                    <div className="flex ">
                      <div className="w-[100px]">
                        <img
                          className=""
                          src={product.product.Product_image[0]?.image_url}
                          alt={product.product.name}
                        />
                      </div>
                      <div className="flex gap-2 flex-col p-2 text-xs ">
                        <p>{product.product.name}</p>
                        <div className="flex items-center space-x-3">
                          <button
                            className="inline-flex items-center justify-center p-1 text-sm font-medium h-4 w-4 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                            type="button"
                            onClick={() => handleMinusQty(product.productId)}
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
                              className="bg-gray-50 w-12 border border-gray-300 text-gray-900 text-[10px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="1"
                              onChange={(e) =>
                                handleQtyChange(
                                  product.productId,
                                  +e.target.value
                                )
                              }
                              value={product.qty || 1}
                            />
                          </div>
                          <button
                            className="inline-flex items-center justify-center h-4 w-4 p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover-bg-gray-700 dark:hover-border-gray-600 dark:focus:ring-gray-700"
                            type="button"
                            onClick={() => handlePlusQty(product.productId)}
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
                      </div>
                    </div>
                    <div className="p-2 flex flex-col items-center">
                      <p className="text-xs ">
                        ฿{(product.product.price || 0) * (product.qty || 1)}
                      </p>
                      <span
                        className=" cursor-pointer"
                        onClick={() =>
                          handleClickRemoveCartItems(product.productId)
                        }
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </span>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
          {/* <CartItems
                productId={product.productId}
                qty={product.qty}
                name={product.product.name}
                price={product.product.price}
                img={product.product.Product_image[0]?.image_url}
              /> */}
          <hr />
          <div className="flex justify-between">
            <p>ราคารวม</p>
            <p>฿{price}</p>
          </div>
          <div className="flex justify-between">
            <p>ค่าจัดส่ง</p>
            <p>฿{shippingFees}</p>
          </div>
          <hr />
          <div className="flex justify-between">
            <p className=" text-lg">รวมทั้งหมด</p>
            <p>฿{shippingFees + price}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
