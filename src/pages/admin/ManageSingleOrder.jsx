import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import { toast } from "react-toastify";

export default function ManageSingleOrder() {
  const [isLoading, setIsLoading] = useState(false);
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [newStatus, setNewStatus] = useState("PENDING");

  console.log(order);

  useEffect(() => {
    const fetchSingleOrders = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:3001/order/${orderId}`
        );
        setOrder(response.data);
      } catch (error) {
        console.log("Could not get order data: ", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSingleOrders();
  }, []);

  if (order === null) {
    return <div>No order data available.</div>;
  }

  const handleStatusChange = (e) => {
    setNewStatus(e.target.value);
  };

  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/order/update-order-status`, {
        orderId,
        newStatus,
      });
      const response = await axios.get(
        `http://localhost:3001/order/${orderId}`
      );
      setOrder(response.data);
    } catch (error) {
      console.error("Could not update order status", error);
      toast.error("You are not an admin");
    }
  };

  return (
    <div>
      {isLoading && <Loading />}
      <div className="flex justify-between w-full">
        <p>Order Number: {order.order_number}</p>
        <p>ช่องทางการชำระเงิน: {order.payment_method.name}</p>
        <p>
          Order Date:
          {new Date(order.order_date).toLocaleDateString("th-TH", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>
      <div className="grid grid-cols-3 space-x-4 mt-2">
        <div className="border border-gray-200 p-4 shadow rounded-md ">
          <p className="text-xl">ที่อยู่ในการจัดส่ง</p>
          <p>
            ชื่อผู้รับ: {order.shipping_address.firstName}
            {order.shipping_address.lastName}
          </p>
          <p>โทรศัพท์: {order.shipping_address.phone}</p>
          <p>
            ที่อยู่: {order.shipping_address.street_address} ตำบล:&nbsp;
            {order.shipping_address.sub_district} อำเภอ:&nbsp;
            {order.shipping_address.district} จังหวัด:&nbsp;
            {order.shipping_address.province} {order.shipping_address.zip}
          </p>
        </div>
        <div className="border border-gray-200 p-4 shadow rounded-md space-y-4">
          <p>สถานะรายการ</p>
          <span
            className={`px-2 ${
              order.order_status === "PENDING" &&
              "bg-yellow-500 text-white px-4 py-1 w-fit rounded-md"
            } ${
              order.order_status === "PROCESSING" &&
              "bg-blue-500 text-white px-4 py-1 w-fit rounded-md"
            }
  ${
    order.order_status === "COMPLETED" &&
    "bg-green-500 text-white px-4 py-1 w-fit rounded-md"
  }
                      ${
                        order.order_status === "CANCELLED" &&
                        "bg-gray-500 text-white px-4 py-1 w-fit rounded-md"
                      }`}
          >
            {order.order_status}
          </span>
          <div>
            <label
              htmlFor="countries_disabled"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              สถานะรายการ
            </label>
            <div>
              <select
                id=""
                value={newStatus}
                onChange={handleStatusChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="PENDING">PENDING</option>
                <option value="PROCESSING">PROCESSING</option>
                <option value="COMPLETED">COMPLETED</option>
                <option value="CANCELLED">CANCELLED</option>
              </select>
              <button
                className="p-2 bg-blue-500 text-white rounded-md mt-3"
                onClick={handleUpdateStatus}
              >
                อัพเดทสถานะ
              </button>
            </div>
          </div>
        </div>
        <div className="border border-gray-200 p-4 shadow rounded-md w-fit ">
          <img
            className="w-auto h-[200px]"
            src={order.Confirm_payment[0]?.slip_img_url}
            alt=""
          />
        </div>
      </div>

      <div className="mt-3">
        <div className="relative overflow-x-auto">
          <p className="text-xs text-gray-400 text-center">
            Order ID: {orderId}
          </p>
          <hr className="m-2" />
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3 rounded-l-lg">
                  ชื่อสินค้า
                </th>
                <th scope="col" className="px-6 py-3">
                  จำนวน
                </th>
                <th scope="col" className="px-6 py-3 rounded-r-lg">
                  ราคา
                </th>
              </tr>
            </thead>
            <tbody>
              {order.Order_items.map((data) => (
                <React.Fragment key={data.id}>
                  <tr className="bg-white dark:bg-gray-800">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {data.product.name}
                    </th>
                    <td className="px-6 py-4">{data.qty}</td>
                    <td className="px-6 py-4">{data.price * data.qty}</td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
            <tfoot>
              <tr className="font-semibold text-gray-900 dark:text-white">
                <th scope="row" className="px-6 py-3 ">
                  ราคาสินค้า
                </th>
                <td className="px-6 py-3"></td>
                <td className="px-6 py-3">
                  {order.Order_items.reduce((total, product) => {
                    return total + product.price * product.qty;
                  }, 0)}
                </td>
              </tr>
              <tr className="font-semibold text-gray-900 dark:text-white">
                <th scope="row" className="px-6 py-3 ">
                  ค่าจัดส่ง
                </th>
                <td className="px-6 py-3"></td>
                <td className="px-6 py-3">
                  {order.shipping_methodId == 1 ? 50 : 0}
                </td>
              </tr>
              <tr className="font-semibold text-gray-900 dark:text-white">
                <th scope="row" className="px-6 py-3 text-base">
                  รวมทั้งหมด
                </th>
                <td className="px-6 py-3"></td>
                <td className="px-6 py-3">{order.total_amount}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
