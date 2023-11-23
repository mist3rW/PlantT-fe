import InputField from "../components/InputField";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import SubmitBtn from "../components/SubmitBtn";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function ThankyouPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [bankData, setBankData] = useState(null);
  const [selectedBankAccountId, setSelectedBankAccountId] = useState(null);
  const [input, setInput] = useState({
    phone: "",
    bank_account: "",
    orderId: orderId,
  });
  console.log(bankData);
  const [imageFile, setImageFile] = useState(null);

  const handleChangeInput = (e) => {
    if (e.target.name === "bank_account") {
      const bankAccountId = parseInt(e.target.value, 10);
      setSelectedBankAccountId(bankAccountId);
    } else {
      setInput({ ...input, [e.target.name]: e.target.value });
    }
  };
  console.log(order);
  const handleChangeFile = (e) => {
    const selectedFile = e.target.files[0];
    setImageFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("slip_img_url", imageFile);
      formData.append(
        "formInfo",
        JSON.stringify({
          phone: input.phone,
          bank_accountId: selectedBankAccountId,
          orderId: orderId,
        })
      );
      const response = await axios.post(
        "http://localhost:3001/checkout/add-payment",
        formData
      );
      toast.success("Thank you for your payment confirmation");
      setTimeout(() => {
        setIsLoading(false);
        navigate("/");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchThankyouData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:3001/order/${orderId}`
        );
        setOrder(response.data);
        const bankResponse = await axios.get(
          "http://localhost:3001/checkout/bank"
        );
        setBankData(bankResponse.data);
      } catch (error) {
        console.log("Could not get order data: ", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchThankyouData();
  }, []);

  if (order === null) {
    return <Loading />;
  }
  if (bankData === null) {
    return <Loading />;
  }
  console.log(order);

  return (
    <div className="space-y-4">
      {isLoading && <Loading />}
      <div className="flex justify-center border border-green-700 border-dashed py-8">
        <p className="text-2xl text-[#3E834E]">
          ขอบคุณ คุณ {order.shipping_address.firstName}&nbsp;
          {order.shipping_address.lastName}&nbsp;
          เราได้รับคำสั่งซื้อของคุณเรียบร้อยแล้ว
        </p>
      </div>
      <div className="flex items-center justify-evenly">
        <div className="flex flex-col items-center ">
          <p className="text-gray-400">หมายเลขคำสั่งซื้อ</p>
          <p>{order.order_number}</p>
        </div>
        <div className="w-0.5 h-24 bg-gray-200"></div>
        <div className="flex flex-col items-center ">
          <p className="text-gray-400">วันที่</p>
          <p>
            {new Date(order.order_date).toLocaleDateString("th-TH", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
        <div className="w-0.5 h-24 bg-gray-200"></div>
        <div className="flex flex-col items-center ">
          <p className="text-gray-400">ราคารวม</p>
          <p>฿{order.total_amount}</p>
        </div>
        <div className="w-0.5 h-24 bg-gray-200"></div>
        <div className="flex flex-col items-center ">
          <p className="text-gray-400">ช่องทางการชำระเงิน</p>
          <p>
            {order.shipping_methodId == 1
              ? "โอนเงินเข้าบัญชีธนาคาร"
              : "เก็บเงินปลายทาง"}
          </p>
        </div>
      </div>
      <hr />
      {order.payment_methodId == 1 ? (
        <>
          <div>
            <div className="bg-[#FAFAFA] p-8 space-y-4">
              <p className="text-xl font-semibold">
                <span className="border-b-green-600 border-b-4">
                  ยืนยันการชำระเงิน
                </span>
              </p>
              <div className="space-y-4">
                <InputField
                  placeholder="เบอร์ติดต่อ"
                  name="phone"
                  value={input.phone}
                  onChange={handleChangeInput}
                />
                <p>บัญชีธนาคารที่โอน</p>
                {bankData.map((data) => (
                  <div
                    className=" border border-gray-200 p-4 rounded-md"
                    key={data.id}
                  >
                    <div className="flex items-center h-5 p-8">
                      <input
                        type="radio"
                        name="bank_account"
                        value={data.id}
                        className="w-4 h-4 text-blue-500 bg-gray-100 border-gray-300"
                        onChange={handleChangeInput}
                      />
                      <div className="ml-2 text-sm">
                        <label
                          htmlFor="helper-radio"
                          className="font-medium text-gray-900 "
                        >
                          {data.bank_name}
                        </label>
                        <p
                          id="helper-radio-text"
                          className="text-xs font-normal text-gray-500 "
                        >
                          {data.account_number} {data.account_name}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                <p>หลักฐานการโอน</p>

                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        PNG, JPG
                      </p>
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      onChange={handleChangeFile}
                    />
                  </label>
                </div>

                <SubmitBtn onClick={handleSubmit}>ยืนยัน</SubmitBtn>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col items-center justify-center text-2xl bg-[#fafafa] p-4 space-y-4">
            <p>
              คำสั่งซื้อของคุณจะถูกส่งแบบเก็บเงินปลายทาง ใช้ระยะเวลาประมาณ 2-3
              วัน ขอบคุณที่เลือกซื้อกับเรา PlantT
            </p>
            <Link to="/">
              <button className="bg-green-700 w-fit mx-auto text-white p-2 rounded-md">
                กลับสู่หน้าแรก
              </button>
            </Link>
          </div>
        </>
      )}
      <hr />
      <p className="text-xl font-semibold">ที่อยู่ในการจัดส่งสินค้า</p>
      <div>
        <p>
          ชื่อผู้รับสินค้า: {order.shipping_address.firstName}&nbsp;
          {order.shipping_address.lastName}&nbsp;
          <br />
          จัดส่งที่:&nbsp;
          {order.shipping_address.street_address} ตำบล:&nbsp;
          {order.shipping_address.sub_district} อำเภอ:&nbsp;
          {order.shipping_address.district} จังหวัด:&nbsp;
          {order.shipping_address.province} {order.shipping_address.zip}
        </p>
      </div>
      <p className="text-xl font-semibold">รายละเอียดการสั่งซื้อ</p>
      <div className="space-y-4">
        <div className="w-full border border-[B8B8B8] mb-2 shadow p-2">
          {order.Order_items.map((data) => (
            <React.Fragment key={data.id}>
              <div className="flex flex-row items-center justify-between h-12">
                <div className="flex gap-4 items-center justify-between">
                  <div className="flex gap-2">
                    {/* <div className="">
                        <img src="" alt="" className="w-auto h-12" />
                      </div> */}
                    <div className="flex flex-col">
                      <p>{data.product.name}</p>
                      <p>x {data.qty}</p>
                    </div>
                  </div>
                </div>
                <span>฿{data.product.price * data.qty}</span>
              </div>
              <hr />
            </React.Fragment>
          ))}

          <hr />
          <div className="flex justify-between h-8">
            <p>ราคาสินค้ารวม</p>
            <p>
              ฿
              {order.Order_items.reduce((total, product) => {
                return total + product.price * product.qty;
              }, 0)}
            </p>
          </div>
          <hr />
          <div className="flex justify-between h-8">
            <p>ค่าจัดส่ง</p>
            <p>฿{order.shipping_methodId == 1 ? 50 : 0}</p>
          </div>
          <hr />
          <div className="flex justify-between h-8">
            <p>รวมทั้งหมด</p>
            <p>฿{order.total_amount}</p>
          </div>
        </div>
        <hr />
      </div>
    </div>
  );
}
