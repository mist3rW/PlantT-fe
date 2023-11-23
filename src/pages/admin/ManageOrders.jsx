import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import { Link } from "react-router-dom";

export default function ManageOrders() {
  const [order, setOrder] = useState([]);
  console.log(order);
  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/order/all-orders"
      );
      await setOrder(response.data);
    } catch (error) {
      console.log("Could not get order data: ", error);
    }
  };
  useEffect(() => {
    fetchAllOrders();
  }, []);

  const sortedOrders = [...order];
  sortedOrders.sort((a, b) => b.order_number - a.order_number);

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                หมายเลขคำสั่งซื้อ
              </th>
              <th scope="col" className="px-6 py-3">
                ชื่อ
              </th>
              <th scope="col" className="px-6 py-3">
                มูลค่า
              </th>
              <th scope="col" className="px-6 py-3">
                วันที่สั่งซื้อ
              </th>
              <th scope="col" className="px-6 py-3">
                สถานะ
              </th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {sortedOrders.map((data) => (
              <React.Fragment key={data.id}>
                <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {data.order_number}
                  </th>
                  <td className="px-6 py-4">
                    {data.shipping_address.firstName}{" "}
                    {data.shipping_address.lastName}
                  </td>
                  <td className="px-6 py-4">
                    ฿{Number(data.total_amount).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    {new Date(data.createdAt).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "2-digit",
                    })}
                  </td>
                  <td className={`px-6 py-4`}>
                    <p
                      className={`  ${
                        data.order_status === "PENDING" &&
                        "bg-yellow-500 text-white px-4 py-1 w-fit rounded-md"
                      } ${
                        data.order_status === "PROCESSING" &&
                        "bg-blue-500 text-white px-4 py-1 w-fit rounded-md"
                      }
                      ${
                        data.order_status === "COMPLETED" &&
                        "bg-green-500 text-white px-4 py-1 w-fit rounded-md"
                      }
                      ${
                        data.order_status === "CANCELLED" &&
                        "bg-gray-500 text-white px-4 py-1 w-fit rounded-md"
                      }`}
                    >
                      {data.order_status}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <Link to={`/admeow/order/${data.id}`}>
                      <p
                        href="#"
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        แก้ไข
                      </p>
                    </Link>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
