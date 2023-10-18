import InputField from "../components/InputField";
import { useCart } from "../contexts/CartContext";
import React, { useEffect, useState } from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Loading from "../components/Loading";
import { useAuth } from "../hooks/use-auth";
import { Link, useNavigate } from "react-router-dom";

export default function CheckoutPage() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { authUser } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState([]);
  useEffect(() => {
    fetchPaymentData();
  }, []);

  const {
    cart,
    price,
    handleClickRemoveCartItems,
    handleMinusQty,
    handlePlusQty,
    handleQtyChange,
    clearCart,
  } = useCart();

  const fetchPaymentData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/checkout/payment"
      );
      setPaymentMethod(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [input, setInput] = useState({
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    street_address: "",
    sub_district: "",
    district: "",
    province: "",
    zip: "",
  });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const newOrderPayload = {
        email: input.email,
        phone: input.phone,
        firstName: input.firstName,
        lastName: input.lastName,
        street_address: input.street_address,
        sub_district: input.sub_district,
        district: input.district,
        province: input.province,
        zip: input.zip,
        payment_methodId: selectedPaymentMethod,
        shipping_methodId: 1,
        userId: authUser.id,
        total_amount: totalAmount,
        cart,
      };
      const createNewOrder = await axios.post(
        "http://localhost:3001/checkout/add-order",
        newOrderPayload
      );
      setInput({
        email: "",
        phone: "",
        firstName: "",
        lastName: "",
        street_address: "",
        sub_district: "",
        district: "",
        province: "",
        zip: "",
      });
      clearCart();
      setSelectedPaymentMethod([]);
      setIsLoading(false);
      navigate("/checkout/thankyou");
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  const shippingFees = 50;
  const totalAmount = shippingFees + price;

  return (
    <div className="grid grid-cols-2 gap-4">
      {isLoading && <Loading />}
      <div className="col-span-2 md:col-span-1 md:w-70 space-y-4">
        <img src="../../public/plant_checkout_bg.jpg" alt="" />
        <div className="space-y-4">
          <p className="text-xl font-semibold">ข้อมูลในการจัดส่ง</p>
          <div className="grid grid-cols-2 gap-4">
            <InputField
              placeholder="อีเมล"
              className="col-span-full"
              name="email"
              onChange={handleChange}
              value={input.email}
            />
            <InputField
              placeholder="เบอร์โทรศัพท์"
              className="col-span-full"
              name="phone"
              onChange={handleChange}
              value={input.phone}
            />
            <InputField
              placeholder="ชื่อ"
              name="firstName"
              onChange={handleChange}
              value={input.firstName}
            />
            <InputField
              placeholder="นามสกุล"
              name="lastName"
              onChange={handleChange}
              value={input.lastName}
            />
            <InputField
              placeholder="บ้านเลขที่และที่อยู่ถนน"
              className="col-span-full"
              name="street_address"
              onChange={handleChange}
              value={input.street_address}
            />
            <InputField
              placeholder="ตำบล/แขวง"
              name="sub_district"
              onChange={handleChange}
              value={input.sub_district}
            />
            <InputField
              placeholder="อำเภอ/เขต"
              name="district"
              value={input.district}
              onChange={handleChange}
            />
            <InputField
              placeholder="จังหวัด"
              name="province"
              value={input.province}
              onChange={handleChange}
            />
            <InputField
              placeholder="รหัสไปรษณีย์"
              name="zip"
              value={input.zip}
              onChange={handleChange}
            />
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
                value={paymentMethod[0]?.id}
                className="w-4 h-4 text-blue-500 bg-gray-100 border-gray-300"
                onClick={(e) => setSelectedPaymentMethod(e.target.value)}
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
                value={paymentMethod[1]?.id}
                className="w-4 h-4 text-blue-500 bg-gray-100 border-gray-300"
                onClick={(e) => setSelectedPaymentMethod(e.target.value)}
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
          <button
            className="bg-green-700 text-white w-full rounded-md text-xl font-medium py-2.5 "
            onClick={handlePlaceOrder}
          >
            ยืนยัน
          </button>
        </div>
      </div>
      <div className="col-span-2 md:col-span-1 md:w-30 bg-[#fafafa] p-4">
        <div className="space-y-4">
          <p className="text-xl font-semibold">สินค้าจากตะกร้า</p>
          <div>
            {cart.map((product) => (
              <React.Fragment key={product.productId}>
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
            <p>฿{totalAmount}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
